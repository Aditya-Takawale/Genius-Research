import React from 'react';

const SuccessScreen = ({ onNewSurvey }) => {
  return (
    <div className="card max-w-2xl mx-auto text-center">
      <div className="py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-genius-dark mb-4">
          Survey Completed Successfully!
        </h2>
        
        <p className="text-lg text-genius-gray mb-8">
          Thank you for completing the Dealer Survey. Your responses have been recorded.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-genius-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-genius-dark mb-2">What happens next?</h3>
              <ul className="text-sm text-genius-gray space-y-1">
                <li>✓ Your data has been saved to Google Sheets</li>
                <li>✓ Uploaded files have been saved to Google Drive</li>
                <li>✓ You can start a new survey with another dealer</li>
                <li>✓ All offline responses will sync automatically when online</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onNewSurvey}
            className="btn-primary"
          >
            Start New Survey
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
