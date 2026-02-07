import React from 'react';

const TerminationScreen = () => {
  return (
    <div className="card max-w-2xl mx-auto text-center">
      <div className="py-12">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-genius-dark mb-4">
          Survey Terminated
        </h2>
        
        <p className="text-lg text-genius-gray mb-8">
          Thank you for your time. Unfortunately, you don't meet the criteria for this survey.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-genius-gray">
            <strong>Note for Researcher:</strong> This response has been terminated as per screening criteria (Q5). 
            Please start a new survey with a different respondent.
          </p>
        </div>
        
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Start New Survey
        </button>
      </div>
    </div>
  );
};

export default TerminationScreen;
