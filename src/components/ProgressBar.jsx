import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, estimatedTime = '30-40 minutes' }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  const steps = [
    { number: 1, label: 'Profile' },
    { number: 2, label: 'Comfort' },
    { number: 3, label: 'Safety' },
    { number: 4, label: 'Exterior' },
    { number: 5, label: 'Interior' },
    { number: 6, label: 'Infotainment' },
    { number: 7, label: 'Connectivity' },
    { number: 8, label: 'Performance' },
    { number: 9, label: 'Feedback' }
  ];

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-genius-blue to-blue-500 transition-all duration-500 ease-out"
          />
        </div>
        <div className="flex justify-between items-center text-xs text-genius-gray mb-2">
          <span className="font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Estimated: {estimatedTime}
          </span>
        </div>
      </div>

      {/* Step Indicators - Desktop Only */}
      <div className="hidden md:flex justify-between items-center mt-6">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center relative flex-1">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-0.5 ${
                  index < currentStep ? 'bg-genius-blue' : 'bg-gray-300'
                }`}
                style={{ zIndex: 0 }}
              />
            )}
            
            {/* Step Circle */}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                index < currentStep
                  ? 'bg-genius-blue text-white'
                  : index === currentStep
                  ? 'bg-genius-blue text-white ring-4 ring-blue-200'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            
            {/* Step Label */}
            <span
              className={`mt-2 text-xs font-medium ${
                index === currentStep ? 'text-genius-blue' : 'text-genius-gray'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step Indicator - Mobile */}
      <div className="md:hidden mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-genius-blue text-center">
          {steps[currentStep]?.label || 'Survey'} Section
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
