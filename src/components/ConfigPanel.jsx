import React, { useState, useEffect } from 'react';
import { getSheetConfig, saveSheetConfig } from '../utils/storage';
import { testSheetConnection, testDriveConnection } from '../utils/sheetService';

const ConfigPanel = ({ onClose, onSave }) => {
  const [config, setConfig] = useState({
    sheetUrl: '',
    sheetName: 'Dealer Survey Data',
    driveFolderId: ''
  });
  const [testing, setTesting] = useState(false);
  const [testingDrive, setTestingDrive] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [driveTestResult, setDriveTestResult] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const savedConfig = getSheetConfig();
    if (savedConfig) {
      // Merge with defaults to ensure all fields exist
      setConfig({
        sheetUrl: savedConfig.sheetUrl || '',
        sheetName: savedConfig.sheetName || 'Dealer Survey Data',
        driveFolderId: savedConfig.driveFolderId || ''
      });
    }
  }, []);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await testSheetConnection(config.sheetUrl);
      setTestResult({
        success: true,
        message: 'Connection successful! Your Google Sheet is ready to receive data.'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message || 'Connection failed. Please check your URL and try again.'
      });
    } finally {
      setTesting(false);
    }
  };

  const extractFolderId = (input) => {
    // If it's a full URL, extract the folder ID
    const urlPattern = /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;
    const match = input.match(urlPattern);
    if (match) {
      return match[1];
    }
    // Remove any query parameters if pasted with ?usp=...
    return input.split('?')[0].trim();
  };

  const handleDriveFolderChange = (e) => {
    const input = e.target.value;
    const folderId = extractFolderId(input);
    setConfig({ ...config, driveFolderId: folderId });
  };

  const handleTestDrive = async () => {
    setTestingDrive(true);
    setDriveTestResult(null);
    
    try {
      const result = await testDriveConnection(config.sheetUrl, config.driveFolderId);
      setDriveTestResult({
        success: true,
        message: `Drive connected! Folder: "${result.folderName}"`
      });
    } catch (error) {
      let errorMsg = error.message || 'Drive connection failed. Please check your Folder ID.';
      if (errorMsg.includes('Invalid response')) {
        errorMsg = 'Drive test requires updated Apps Script. Please re-deploy the Google Apps Script first.';
      }
      setDriveTestResult({
        success: false,
        message: errorMsg
      });
    } finally {
      setTestingDrive(false);
    }
  };

  const handleSave = () => {
    if (!config.sheetUrl.trim()) {
      setTestResult({
        success: false,
        message: 'Please enter a Google Sheets Web App URL'
      });
      return;
    }

    if (!config.driveFolderId.trim()) {
      setTestResult({
        success: false,
        message: 'Please enter a Google Drive Folder ID'
      });
      return;
    }

    saveSheetConfig(config);
    setTestResult({
      success: true,
      message: 'Configuration saved successfully!'
    });
    
    setTimeout(() => {
      onSave();
    }, 1500);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-genius-dark">Google Configuration</h2>
          <p className="text-sm text-genius-gray mt-1">Connect your Google Sheet and Drive to store survey data and files</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Instructions Toggle */}
      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="w-full mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-genius-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-genius-blue">
            {showInstructions ? 'Hide Setup Instructions' : 'Show Setup Instructions'}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-genius-blue transition-transform ${showInstructions ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-genius-dark">Setup Instructions</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-genius-blue text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Create a Google Sheet</h4>
                <p className="text-sm text-genius-gray">
                  Open Google Sheets and create a new spreadsheet. Name it something like "Dealer Survey Responses"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-genius-blue text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Open Apps Script</h4>
                <p className="text-sm text-genius-gray mb-2">
                  In your Google Sheet, go to <strong>Extensions → Apps Script</strong>
                </p>
                <p className="text-sm text-genius-gray">
                  Delete any existing code and paste the script provided in the documentation.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-genius-blue text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Deploy as Web App</h4>
                <ul className="text-sm text-genius-gray space-y-1 list-disc list-inside">
                  <li>Click <strong>Deploy → New deployment</strong></li>
                  <li>Select type: <strong>Web app</strong></li>
                  <li>Execute as: <strong>Me</strong></li>
                  <li>Who has access: <strong>Anyone</strong></li>
                  <li>Click <strong>Deploy</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-genius-blue text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Copy the Web App URL</h4>
                <p className="text-sm text-genius-gray">
                  After deployment, copy the <strong>Web App URL</strong> and paste it below. 
                  It should look like: <code className="text-xs bg-gray-200 px-2 py-1 rounded">https://script.google.com/macros/s/...</code>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex gap-2">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-yellow-800">
                <strong>Important:</strong> You'll need to authorize the script the first time it runs. 
                Google will show a warning - this is normal. Click "Advanced" then "Go to [Project Name] (unsafe)" to proceed.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-genius-dark mb-2">
            Google Sheets Web App URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
            value={config.sheetUrl}
            onChange={(e) => setConfig({ ...config, sheetUrl: e.target.value })}
          />
          <p className="text-xs text-genius-gray mt-1">
            This is the URL you get after deploying your Google Apps Script as a web app
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-genius-dark mb-2">
            Sheet Name (Optional)
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Dealer Survey Data"
            value={config.sheetName}
            onChange={(e) => setConfig({ ...config, sheetName: e.target.value })}
          />
          <p className="text-xs text-genius-gray mt-1">
            The name of the sheet tab where data will be stored (default: "Dealer Survey Data")
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-genius-dark mb-2">
            Google Drive Folder ID <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input-field flex-1"
              placeholder="Folder ID or full Google Drive folder URL"
              value={config.driveFolderId}
              onChange={handleDriveFolderChange}
            />
            <button
              onClick={handleTestDrive}
              disabled={testingDrive || !config.driveFolderId.trim() || !config.sheetUrl.trim()}
              className="btn-secondary whitespace-nowrap"
            >
              {testingDrive ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Testing...
                </span>
              ) : (
                'Test Drive'
              )}
            </button>
          </div>
          {driveTestResult && (
            <div className={`mt-2 p-2 rounded text-sm ${driveTestResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {driveTestResult.success ? '✓' : '✗'} {driveTestResult.message}
            </div>
          )}
          <div className="text-xs text-genius-gray mt-2 space-y-1">
            <p>Paste the full folder URL or just the Folder ID - we'll extract it automatically</p>
            <details className="mt-2">
              <summary className="cursor-pointer font-semibold text-genius-blue hover:underline">How to get Folder ID?</summary>
              <ol className="list-decimal list-inside mt-2 space-y-1 pl-2">
                <li>Open Google Drive and create a new folder (e.g., "Dealer Survey Files")</li>
                <li>Open that folder</li>
                <li>Copy the URL from the browser address bar</li>
                <li>Paste the entire URL here (or just the ID part)</li>
              </ol>
            </details>
          </div>
        </div>
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`mt-4 p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex gap-2">
            {testResult.success ? (
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium whitespace-pre-line ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {testResult.message}
              </p>
              {!testResult.success && testResult.message.includes('405') && (
                <div className="mt-3 pt-3 border-t border-red-300">
                  <p className="text-xs text-red-700 font-semibold mb-1">📖 Need help?</p>
                  <p className="text-xs text-red-600">
                    Check the detailed troubleshooting guide in <code className="bg-red-100 px-1 py-0.5 rounded">GOOGLE_SHEETS_TROUBLESHOOTING.md</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleTest}
          disabled={testing || !config.sheetUrl.trim()}
          className="btn-secondary"
        >
          {testing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Testing...
            </span>
          ) : (
            'Test Connection'
          )}
        </button>
        <button
          onClick={handleSave}
          disabled={!config.sheetUrl.trim() || !config.driveFolderId.trim()}
          className="btn-primary"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;
