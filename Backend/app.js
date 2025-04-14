const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const multer = require('multer');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB is Connected Successfully`))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure code
  });

  require('./model/model')(mongoose);
  global.nosql = mongoose
  app.use((req, res, next) => {
    req.nosql =  global.nosql; // Attach models object to req
    next();
  });


  // require('./model/model')(mongoose);
  // app.use((req, res, next) => {
  //   req.nosql = mongoose; // Attach models object to req
  //   global.nosql = req.nosql;
  //   next();
  // });
  

// Import routes
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const teacherRouter = require('./routes/teacher');
const admin = require('./routes/admin');
const auth = require('./routes/auth')
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

const attendanceRoutes = require('./routes/attendence');
app.use('/api/attendance', attendanceRoutes);
// Setup routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', admin);
app.use('/',auth)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
