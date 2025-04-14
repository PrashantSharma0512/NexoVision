import React, { useState } from 'react';
import api from '../api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setMessage('Login successful');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select className="input" name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="bg-green-600 text-white w-full py-2 rounded mt-4">Login</button>
        {message && <p className="mt-2 text-sm text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
