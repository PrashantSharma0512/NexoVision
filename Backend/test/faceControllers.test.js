const { registerFace, recognizeFace } = require('../controllers/faceControllers'); // adjust path
const axios = require('axios');
const httpMocks = require('node-mocks-http');

// Mock ENV
process.env.FACEPP_API_KEY = 'fake_api_key';
process.env.FACEPP_API_SECRET = 'fake_api_secret';
process.env.FACEPP_OUTER_ID = 'test_outer_id';

// Mocks
jest.mock('axios');
const mockCreate = jest.fn();
const mockFindOne = jest.fn();

// Fake Mongoose Model
const fakeUser = { _id: '12345', name: 'Alice', rollno: 'A001', faceToken: 'face_token_abc' };
const fakeAttendance = { rollno: 'A001', date: new Date(), status: 'present' };

const mockModel = () => ({
    create: mockCreate,
    findOne: mockFindOne,
});

const nosql = {
    model: jest.fn((name) => {
        switch (name) {
            case 'FaceSchema': return mockModel();
            case 'attendence': return mockModel();
            case 'register': return mockModel();
            default: return {};
        }
    }),
};

// Inject mocked `nosql` into controller functions
jest.mock('mongoose', () => ({})); // prevent actual mongoose usage
global.nosql = nosql;


describe('registerFace', () => {
    it('should register a face successfully', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                name: 'Alice',
                rollno: 'A001',
                imageBase64: 'base64string',
            },
        });
        const res = httpMocks.createResponse();

        // Mock Face++ detect response
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    faces: [{ face_token: 'face_token_abc' }],
                },
            })
        );

        // Mock MongoDB Create
        mockCreate.mockResolvedValue(fakeUser);

        // Mock Face++ add to FaceSet
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ data: { face_added: 1 } })
        );

        await registerFace(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: 'Face registered successfully',
            userId: '12345',
        });
    });

    it('should return 400 if no face detected', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                name: 'Bob',
                rollno: 'A002',
                imageBase64: 'bad_base64',
            },
        });
        const res = httpMocks.createResponse();

        axios.post.mockResolvedValueOnce({ data: { faces: [] } });

        await registerFace(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: 'No face detected' });
    });
});


describe('recognizeFace', () => {
    it('should recognize face and mark attendance', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { imageBase64: 'base64string' },
        });
        const res = httpMocks.createResponse();

        // Mock face search with high confidence
        axios.post.mockResolvedValueOnce({
            data: {
                results: [{ face_token: 'face_token_abc', confidence: 90 }],
            },
        });

        mockFindOne.mockImplementationOnce(() => fakeUser); // For FaceSchema
        mockFindOne.mockImplementationOnce(() => null); // For Attendance (not marked yet)

        mockCreate.mockResolvedValue(fakeAttendance);

        await recognizeFace(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: 'Attendance marked successfully',
            name: 'Alice',
        });
    });

    it('should return 401 if face not recognized confidently', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { imageBase64: 'low_confidence_base64' },
        });
        const res = httpMocks.createResponse();

        axios.post.mockResolvedValueOnce({
            data: { results: [{ face_token: 'abc', confidence: 40 }] },
        });

        await recognizeFace(req, res);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'Face not recognized' });
    });
});
