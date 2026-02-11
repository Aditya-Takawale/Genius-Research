import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressBar from './ProgressBar';
import Step1_DealerProfile from './steps/Step1_DealerProfile';
import Step2_Comfort from './steps/Step2_Comfort';
import Step3_Safety from './steps/Step3_Safety';
import Step4_Exterior from './steps/Step4_Exterior';
import Step5_Interior from './steps/Step5_Interior';
import Step6_Infotainment from './steps/Step6_Infotainment';
import Step7_Connectivity from './steps/Step7_Connectivity';
import Step8_Performance from './steps/Step8_Performance';
import Step9_Feedback from './steps/Step9_Feedback';
import TerminationScreen from './TerminationScreen';
import SuccessScreen from './SuccessScreen';
import { saveSurveyDraft, getSurveyDraft, clearSurveyDraft, saveCurrentStep, getCurrentStep } from '../utils/storage';
import { submitToGoogleSheets, queueOfflineSubmission } from '../utils/sheetService';
import { generateDeterministicTestData, applyTestDataToForm } from '../utils/testFormData';

const SurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {}
  });

  const totalSteps = 9;

  // Load draft on mount
  useEffect(() => {
    const draft = getSurveyDraft();
    const savedStep = getCurrentStep();
    
    if (draft && draft.data) {
      setShowDraftModal(true);
    }
  }, []);

  const loadDraft = () => {
    const draft = getSurveyDraft();
    const savedStep = getCurrentStep();
    
    if (draft && draft.data) {
      Object.keys(draft.data).forEach(key => {
        setValue(key, draft.data[key]);
      });
      setCurrentStep(savedStep);
    }
    setShowDraftModal(false);
  };

  const startFresh = () => {
    clearSurveyDraft();
    setShowDraftModal(false);
  };

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const formData = watch();
      if (Object.keys(formData).length > 0) {
        saveSurveyDraft(formData);
        saveCurrentStep(currentStep);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [watch, currentStep]);

  // Handle termination logic from Step 1
  const handleTermination = () => {
    setIsTerminated(true);
  };

  // Navigate to next step
  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      saveSurveyDraft(watch());
      saveCurrentStep(currentStep + 1);
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Prevent accidental submission when navigating to final step
      if (currentStep === totalSteps - 2) {
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 1000);
      }
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    saveCurrentStep(currentStep - 1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hidden test data fill (Ctrl+Shift+F) - for testing only
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Shift+F to fill test data
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        const testData = generateDeterministicTestData();
        applyTestDataToForm(setValue, testData);
        alert('✅ Test data filled!\n\nNavigate through all steps and submit to test.\n\nShortcut: Ctrl+Shift+F');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setValue]);

  // Hidden test data fill (Ctrl+Shift+T)
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Shift+T to fill test data
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const testData = generateDeterministicTestData();
        applyTestDataToForm(setValue, testData);
        alert('✅ Test data filled! Press Ctrl+Shift+T to use this feature.\n\nNavigate through all steps and submit to test.');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setValue]);

  // Prevent accidental form submission on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault();
      return false;
    }
  };

  // Submit form
  const onSubmit = async (data) => {
    // Only allow submission on the final step
    if (currentStep !== totalSteps - 1) {
      console.warn('Form submission attempted on non-final step');
      return;
    }

    setIsSubmitting(true);

    try {
      // Add metadata (serial number will be auto-generated by Google Apps Script)
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        submittedDate: new Date().toLocaleDateString('en-IN'),
        submittedTime: new Date().toLocaleTimeString('en-IN')
      };

      // DEBUG: Log submission data
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Total fields being submitted:', Object.keys(submissionData).length);
      console.log('Q4 value:', submissionData.Q4_VehicleModelsDealt);
      console.log('Q5 value:', submissionData.Q5_FeatureKnowledgeLevel);
      
      // Check different field types
      console.log('\n--- Field Type Analysis ---');
      console.log('Q6 fields (total):', Object.keys(submissionData).filter(k => k.startsWith('Q6')).length);
      console.log('Q6a_Available:', Object.keys(submissionData).filter(k => k.startsWith('Q6a_Available')).length);
      console.log('Q6b_MostPreferred:', Object.keys(submissionData).filter(k => k.startsWith('Q6b_MostPreferred')).length);
      console.log('Q6c_Importance:', Object.keys(submissionData).filter(k => k.startsWith('Q6c_Importance')).length);
      
      console.log('\n--- Q13a, Q13b, Q14 Fields Check ---');
      console.log('Q13a_Missing fields:', Object.keys(submissionData).filter(k => k.startsWith('Q13a_Missing')));
      console.log('Q13b_Preferred fields:', Object.keys(submissionData).filter(k => k.startsWith('Q13b_Preferred')));
      console.log('Q14_Other fields:', Object.keys(submissionData).filter(k => k.startsWith('Q14_Other')));
      
      console.log('\n--- Special Fields Check ---');
      console.log('ADAS fields:', Object.keys(submissionData).filter(k => k.startsWith('ADAS_')));
      console.log('ICL fields:', Object.keys(submissionData).filter(k => k.startsWith('ICL_')));
      
      console.log('\nFull data:', submissionData);

      try {
        await submitToGoogleSheets(submissionData);
        clearSurveyDraft();
        setIsCompleted(true);
      } catch (error) {
        // Save to offline queue if submission fails - DO NOT clear draft or mark as completed
        queueOfflineSubmission(submissionData);
        
        // Show error with options
        const userChoice = window.confirm(
          'No internet connection detected.\n\n' +
          '✓ Your response has been saved locally\n' +
          '✓ It will auto-submit when connection is restored\n\n' +
          'Click OK to stay on this form and review your answers,\n' +
          'or Cancel to start a new survey.'
        );
        
        if (!userChoice) {
          // User wants to start fresh
          clearSurveyDraft();
          setCurrentStep(0);
          window.location.reload();
        }
        // If OK, form stays open - draft remains saved
        return;
      }
    } catch (error) {
      alert(error.message || 'Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    const stepProps = {
      register,
      errors,
      watch,
      setValue
    };

    switch (currentStep) {
      case 0:
        return <Step1_DealerProfile {...stepProps} onTerminate={handleTermination} />;
      case 1:
        return <Step2_Comfort {...stepProps} />;
      case 2:
        return <Step3_Safety {...stepProps} />;
      case 3:
        return <Step4_Exterior {...stepProps} />;
      case 4:
        return <Step5_Interior {...stepProps} />;
      case 5:
        return <Step6_Infotainment {...stepProps} />;
      case 6:
        return <Step7_Connectivity {...stepProps} />;
      case 7:
        return <Step8_Performance {...stepProps} />;
      case 8:
        return <Step9_Feedback {...stepProps} />;
      default:
        return null;
    }
  };

  // Show termination screen
  if (isTerminated) {
    return <TerminationScreen />;
  }

  // Show success screen
  if (isCompleted) {
    return <SuccessScreen onNewSurvey={() => {
      // Clear all form data properly
      reset({});
      clearSurveyDraft();
      setCurrentStep(0);
      setIsCompleted(false);
    }} />;
  }

  return (
    <>
      {/* Draft Recovery Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-genius-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-genius-dark">Draft Found</h3>
                <p className="text-sm text-genius-gray">Continue where you left off?</p>
              </div>
            </div>
            <p className="text-sm text-genius-gray mb-6">
              We found a saved draft of your survey. Would you like to continue from where you left off or start a new survey?
            </p>
            <div className="flex gap-3">
              <button
                onClick={startFresh}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Start Fresh
              </button>
              <button
                onClick={loadDraft}
                className="flex-1 btn-primary"
              >
                Continue Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Survey Form */}
      <div className="card max-w-5xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-6">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                <span className="flex items-center gap-2">
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </form>

        {/* Auto-save Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-genius-gray">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Your progress is automatically saved every 30 seconds
        </div>
      </div>
    </>
  );
};

export default SurveyForm;
