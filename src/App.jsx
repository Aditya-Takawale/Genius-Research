import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';

function App() {
  // System is pre-configured with hardcoded values

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-genius-dark">Genius Research</h1>
              <p className="text-sm text-genius-gray">Dealer Survey Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SurveyForm />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-genius-gray">
            © 2026 Genius Research. All rights reserved. | Market Research Survey Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
