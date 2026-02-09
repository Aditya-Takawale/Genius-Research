// Hardcoded Google Apps Script URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDXZ37yzurU9Vh-hK1khk0CfpEt0liiZF8vdxibwtXJaK2Uidu50fV9s_-2THDw4EO/exec';

// Test connection to Google Sheets
export const testSheetConnection = async () => {
  try {
    // Use fetch with text/plain to avoid CORS preflight
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'test' })
    });

    const data = await response.json();

    if (data && data.result === 'success') {
      return true;
    } else {
      throw new Error(data.error || 'Invalid response from Google Sheets');
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('❌ Connection failed. Please check your internet connection.');
    }
    throw new Error(error.message || 'Failed to connect to Google Sheets');
  }
};

// Test Google Drive folder connection (using hardcoded folder ID)
export const testDriveConnection = async () => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'testDrive', folderId: '1oOTNZb6mR5q9ByT1ptlqD7_8VtqR7YDH' })
    });

    const data = await response.json();

    if (data && data.result === 'success') {
      return {
        success: true,
        folderName: data.folderName,
        message: data.message
      };
    } else {
      throw new Error(data.error || 'Invalid response from Google Drive');
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('❌ Connection failed. Please check your internet connection.');
    }
    throw new Error(error.message || 'Failed to connect to Google Drive');
  }
};

// Submit survey data to Google Sheets
export const submitToGoogleSheets = async (data, sheetName = 'Dealer Survey Data') => {
  try {
    // Use fetch with text/plain to avoid CORS preflight
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'submit',
        sheetName: sheetName,
        data: data,
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();

    if (result && result.result === 'success') {
      return {
        success: true,
        rowNumber: result.row,
        message: 'Survey submitted successfully!'
      };
    } else {
      throw new Error(result.error || 'Failed to submit data');
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error - please check your connection');
    }
    throw new Error(error.message || 'Failed to submit survey data');
  }
};

// Queue offline submissions
export const queueOfflineSubmission = (data) => {
  try {
    const queue = JSON.parse(localStorage.getItem('offline_queue') || '[]');
    queue.push({
      data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('offline_queue', JSON.stringify(queue));
    return true;
  } catch (error) {
    console.error('Error queueing offline submission:', error);
    return false;
  }
};

// Process offline queue
export const processOfflineQueue = async (url, sheetName) => {
  try {
    const queue = JSON.parse(localStorage.getItem('offline_queue') || '[]');
    
    if (queue.length === 0) return { success: true, count: 0 };

    let successCount = 0;
    const failedItems = [];

    for (const item of queue) {
      try {
        await submitToGoogleSheets(url, sheetName, item.data);
        successCount++;
      } catch (error) {
        failedItems.push(item);
      }
    }

    // Update queue with failed items
    localStorage.setItem('offline_queue', JSON.stringify(failedItems));

    return {
      success: true,
      count: successCount,
      remaining: failedItems.length
    };
  } catch (error) {
    console.error('Error processing offline queue:', error);
    return { success: false, error: error.message };
  }
};
