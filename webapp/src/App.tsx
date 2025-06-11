import React from 'react';
import { Database, Server, Users } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Database className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">CData MCP Web App</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simplified web interface for managing and querying data sources through the Model Context Protocol
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Data Sources</h3>
            <p className="text-gray-600 text-center">
              Connect and manage your data sources with simplified configuration
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
              <Database className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Schema Browser</h3>
            <p className="text-gray-600 text-center">
              Browse tables, columns, and metadata stored in Supabase
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Query Interface</h3>
            <p className="text-gray-600 text-center">
              Execute queries and explore your data with an intuitive interface
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-6">
              This application will provide a simplified web interface for managing database schemas and queries, 
              replacing the complex JDBC driver setup with a streamlined Supabase-powered solution.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                🚀 Ready to connect to Supabase and start building your data management interface!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;