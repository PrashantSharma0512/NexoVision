import React, { useState } from 'react';
import api from '../api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="input" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="input" name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input className="input" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input className="input" name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <select className="input" name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="bg-blue-600 text-white w-full py-2 rounded mt-4">Register</button>
        {message && <p className="mt-2 text-sm text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
