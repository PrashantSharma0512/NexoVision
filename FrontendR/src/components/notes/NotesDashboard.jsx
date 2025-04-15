import React, { useState } from 'react';
import FileUpload from './FileUpload';
import NotesList from './NotesList';
import { Tab } from '@headlessui/react';

const NotesDashboard = () => {
  const [newFile, setNewFile] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Study Materials Hub
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Upload, organize, and access all your course notes in one place
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <Tab.Group>
            <Tab.List className="flex border-b border-gray-200">
              <Tab
                className={({ selected }) =>
                  `px-6 py-4 text-sm font-medium focus:outline-none ${
                    selected
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                All Notes
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-6 py-4 text-sm font-medium focus:outline-none ${
                    selected
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                My Uploads
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-6 py-4 text-sm font-medium focus:outline-none ${
                    selected
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Favorites
              </Tab>
            </Tab.List>
          </Tab.Group>

          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Notes</h2>
              <FileUpload onUpload={setNewFile} />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Available Notes</h2>
              <NotesList newFile={newFile} filter={activeTab} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Request New Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesDashboard;