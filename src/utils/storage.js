// LocalStorage keys
const STORAGE_KEYS = {
  SHEET_CONFIG: 'dealer_survey_sheet_config',
  SURVEY_DATA: 'dealer_survey_draft',
  CURRENT_STEP: 'dealer_survey_step'
};

// Save Google Sheets configuration
export const saveSheetConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SHEET_CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving sheet config:', error);
    return false;
  }
};

// Get Google Sheets configuration
export const getSheetConfig = () => {
  try {
    const config = localStorage.getItem(STORAGE_KEYS.SHEET_CONFIG);
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('Error loading sheet config:', error);
    return null;
  }
};

// Save survey draft data
export const saveSurveyDraft = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SURVEY_DATA, JSON.stringify({
      data,
      timestamp: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    console.error('Error saving survey draft:', error);
    return false;
  }
};

// Get survey draft data
export const getSurveyDraft = () => {
  try {
    const draft = localStorage.getItem(STORAGE_KEYS.SURVEY_DATA);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error loading survey draft:', error);
    return null;
  }
};

// Clear survey draft
export const clearSurveyDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SURVEY_DATA);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP);
    return true;
  } catch (error) {
    console.error('Error clearing survey draft:', error);
    return false;
  }
};

// Save current step
export const saveCurrentStep = (step) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, step.toString());
    return true;
  } catch (error) {
    console.error('Error saving current step:', error);
    return false;
  }
};

// Get current step
export const getCurrentStep = () => {
  try {
    const step = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Error loading current step:', error);
    return 0;
  }
};
