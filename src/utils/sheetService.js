// Test connection to Google Sheets
export const testSheetConnection = async (url) => {
  if (!url || !url.trim()) {
    throw new Error('Please provide a valid URL');
  }

  // Validate URL format
  if (!url.includes('/macros/s/') || !url.endsWith('/exec')) {
    throw new Error('❌ Invalid URL format. The URL should end with "/exec" and contain "/macros/s/". Make sure you deployed the script as a Web App and copied the Web App URL (not the script editor URL).');
  }

  try {
    // Use fetch with text/plain to avoid CORS preflight
    const response = await fetch(url, {
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
      throw new Error('❌ Connection failed. Please check:\n1. Your internet connection\n2. The Apps Script is deployed correctly\n3. "Who has access" is set to "Anyone"');
    }
    throw new Error(error.message || 'Failed to connect to Google Sheets');
  }
};

// Submit survey data to Google Sheets
export const submitToGoogleSheets = async (url, sheetName, data) => {
  if (!url || !url.trim()) {
    throw new Error('Google Sheets is not configured');
  }

  try {
    // Use fetch with text/plain to avoid CORS preflight
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'submit',
        sheetName: sheetName || 'Dealer Survey Data',
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
