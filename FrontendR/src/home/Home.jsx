import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const features = [
    {
      title: 'Face Registration',
      description: 'Register your facial data for attendance tracking',
      icon: '👤',
      path: '/register-face',
      roles: ['student']
    },
    {
      title: 'Mark Attendance',
      description: 'Use face recognition to mark your attendance',
      icon: '📷',
      path: '/attendance',
      roles: ['student']
    },
    {
      title: 'Notes Management',
      description: 'Upload and access study materials',
      icon: '📚',
      path: '/notes',
      roles: ['student', 'teacher']
    },
    {
      title: 'Attendance Reports',
      description: 'View and analyze attendance data',
      icon: '📊',
      path: '/reports',
      roles: ['teacher', 'admin']
    },
    {
      title: 'User Management',
      description: 'Manage system users and permissions',
      icon: '👥',
      path: '/users',
      roles: ['admin']
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      icon: '⚙️',
      path: '/settings',
      roles: ['student', 'teacher', 'admin']
    }
  ];

  const filteredFeatures = features.filter(feature => 
    !feature.roles || feature.roles.includes(user?.role)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">FaceAttend</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Smart Attendance System
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Revolutionizing attendance tracking with facial recognition technology
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature, index) => (
            <div 
              key={index}
              onClick={() => navigate(feature.path)}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Access Service →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-600">98%</h3>
              <p className="mt-2 text-sm font-medium text-gray-500">Recognition Accuracy</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-600">24/7</h3>
              <p className="mt-2 text-sm font-medium text-gray-500">System Availability</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-purple-600">1000+</h3>
              <p className="mt-2 text-sm font-medium text-gray-500">Users Registered</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-yellow-600">99.9%</h3>
              <p className="mt-2 text-sm font-medium text-gray-500">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">FaceAttend</span>
              <p className="mt-2 text-sm text-gray-400">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;