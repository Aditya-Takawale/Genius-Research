/**
 * GOOGLE APPS SCRIPT FOR DEALER SURVEY
 * 
 * INSTRUCTIONS FOR CLIENT:
 * 1. Copy this ENTIRE script
 * 2. In your Google Sheet, go to Extensions → Apps Script
 * 3. Delete existing code and paste this
 * 4. Save the project
 * 5. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 6. Copy the Web App URL and paste it in the survey settings
 * 
 * DO NOT MODIFY unless you know what you're doing!
 */

// Main function to handle incoming POST requests
function doPost(e) {
  try {
    // Parse incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Handle different actions
    if (data.action === 'test') {
      // Test connection
      return ContentService.createTextOutput(
        JSON.stringify({ result: 'success', message: 'Connection successful!' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'testDrive') {
      // Test Drive folder connection
      var result = testDriveFolder(data.folderId);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'submit') {
      // Submit survey data
      var result = submitSurveyData(data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'uploadFiles') {
      // Handle file uploads to Google Drive
      var result = uploadFilesToDrive(data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Unknown action
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', message: 'Unknown action' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Error handling
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing purposes)
function doGet(e) {
  return ContentService.createTextOutput(
    'Dealer Survey API is running. Use POST requests to submit data.'
  );
}

// Function to submit survey data to Google Sheets
function submitSurveyData(requestData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = requestData.sheetName || 'Dealer Survey Data';
    var sheet = ss.getSheetByName(sheetName);
    var driveFolderId = requestData.driveFolderId || '';
    
    var surveyData = requestData.data;
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createProperHeaders(sheet);
      
      // Add dynamic columns from first submission
      var allKeys = Object.keys(surveyData).sort();
      var sectionAKeys = ['serialNumber', 'Q1A_City', 'Q1B_OEM', 'Q1C_Model', 'S1_1_DealerName', 'S1_2_DealerAddress', 
                          'S1_3_DistrictName', 'S1_4_StateName', 'S1_5_RespondentName', 'S1_6_RespondentContact',
                          'Q1C_Gender', 'Q2_Experience', 'Q3_Designation', 'Q4_ModelExperience', 'Q5_KnowledgeLevel',
                          'filledForms_URLs', 'brochures_URLs', 'filledForms', 'brochures',
                          'submittedAt', 'submittedDate', 'submittedTime'];
      
      var headerRow = 18; // Current header count (including Serial Number and file URLs)
      allKeys.forEach(function(key) {
        if (sectionAKeys.indexOf(key) === -1) {
          headerRow++;
          sheet.getRange(1, headerRow).setValue(key);
          sheet.getRange(1, headerRow).setFontWeight('bold');
          sheet.getRange(1, headerRow).setBackground('#0066CC');
          sheet.getRange(1, headerRow).setFontColor('#FFFFFF');
        }
      });
    } else {
      // Add any new columns if they don't exist
      var lastCol = sheet.getLastColumn();
      var existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      var allKeys = Object.keys(surveyData).sort();
      
      allKeys.forEach(function(key) {
        if (existingHeaders.indexOf(key) === -1) {
          lastCol++;
          sheet.getRange(1, lastCol).setValue(key);
          sheet.getRange(1, lastCol).setFontWeight('bold');
          sheet.getRange(1, lastCol).setBackground('#0066CC');
          sheet.getRange(1, lastCol).setFontColor('#FFFFFF');
        }
      });
    }
    
    // Generate sequential serial number
    var lastRow = sheet.getLastRow();
    var serialNumber = lastRow; // Row 1 is header, so row 2 = serial 1, etc.
    surveyData.serialNumber = serialNumber;
    
    // Handle file uploads if present
    var fileUrls = {
      filledForms: '',
      brochures: ''
    };
    
    if (surveyData.filledForms || surveyData.brochures) {
      var uploadResult = uploadSurveyFiles(surveyData, serialNumber.toString(), driveFolderId);
      
      if (uploadResult.success) {
        fileUrls = uploadResult.urls;
        // Add file URLs to survey data
        surveyData.filledForms_URLs = fileUrls.filledForms;
        surveyData.brochures_URLs = fileUrls.brochures;
      }
    }
    
    var rowData = buildProperRow(surveyData, requestData.timestamp, sheet);
    sheet.appendRow(rowData);
    
    return {
      result: 'success',
      message: 'Survey submitted successfully',
      row: sheet.getLastRow(),
      fileUrls: fileUrls
    };
    
  } catch (error) {
    return {
      result: 'error',
      message: 'Error: ' + error.toString()
    };
  }
}

function createProperHeaders(sheet) {
  var headers = [
    'Serial Number',
    'Timestamp',
    // SECTION A: Administrative - exactly as collected
    'Q1A_City', 'Q1B_OEM', 'Q1C_Model',
    'S1_1_DealerName', 'S1_2_DealerAddress', 'S1_3_DistrictName', 'S1_4_StateName',
    'S1_5_RespondentName', 'S1_6_RespondentContact',
    'Q1C_Gender', 'Q2_Experience', 'Q3_Designation',
    'Q4_ModelExperience', 'Q5_KnowledgeLevel',
    // File Upload URLs
    'filledForms_URLs', 'brochures_URLs'
  ];
  
  // Add all remaining columns dynamically on first submission
  // This captures everything: B_*, C_*, D_*, E_*, F_*, G_*, H_*, ADAS_*, ICL_*, Q13_*, Q14_*
  
  sheet.appendRow(headers);
  
  // Format header
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0066CC');
  headerRange.setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
}

function buildProperRow(data, timestamp, sheet) {
  function get(key) {
    var val = data[key];
    if (val === null || val === undefined) return '';
    // Don't store the actual file data arrays (filledForms, brochures) - only store URLs
    if (key === 'filledForms' || key === 'brochures') return '';
    if (Array.isArray(val)) return val.join(', ');
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
  }
  
  // If sheet is provided, build row based on existing headers
  if (sheet) {
    var lastCol = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var row = [];
    
    headers.forEach(function(header) {
      if (header === 'Serial Number') {
        row.push(get('serialNumber'));
      } else if (header === 'Timestamp') {
        row.push(timestamp || new Date().toISOString());
      } else {
        row.push(get(header));
      }
    });
    
    return row;
  }
  
  // Fallback: build row in default order
  var row = [
    get('serialNumber'),
    timestamp || new Date().toISOString(),
    // Section A in exact order
    get('Q1A_City'), get('Q1B_OEM'), get('Q1C_Model'),
    get('S1_1_DealerName'), get('S1_2_DealerAddress'), get('S1_3_DistrictName'), get('S1_4_StateName'),
    get('S1_5_RespondentName'), get('S1_6_RespondentContact'),
    get('Q1C_Gender'), get('Q2_Experience'), get('Q3_Designation'),
    get('Q4_ModelExperience'), get('Q5_KnowledgeLevel')
  ];
  
  // Add all other fields dynamically in alphabetical order
  var allKeys = Object.keys(data).sort();
  var sectionAKeys = ['serialNumber', 'Q1A_City', 'Q1B_OEM', 'Q1C_Model', 'S1_1_DealerName', 'S1_2_DealerAddress', 
                      'S1_3_DistrictName', 'S1_4_StateName', 'S1_5_RespondentName', 'S1_6_RespondentContact',
                      'filledForms_URLs', 'brochures_URLs', 'filledForms', 'brochures',
                      'Q1C_Gender', 'Q2_Experience', 'Q3_Designation', 'Q4_ModelExperience', 'Q5_KnowledgeLevel',
                      'submittedAt', 'submittedDate', 'submittedTime'];
  
  allKeys.forEach(function(key) {
    if (sectionAKeys.indexOf(key) === -1) {
      row.push(get(key));
    }
  });
  
  return row;
}

// Function to upload files to Google Drive
function uploadSurveyFiles(surveyData, serialNumber, driveFolderId) {
  try {
    var mainFolder;
    
    // Use provided folder ID or create a new folder
    if (driveFolderId && driveFolderId.trim() !== '') {
      try {
        mainFolder = DriveApp.getFolderById(driveFolderId);
      } catch (e) {
        throw new Error('Invalid Drive Folder ID: ' + e.message);
      }
    } else {
      // Fallback: create folder in root drive
      var mainFolderName = 'Dealer Survey Files';
      mainFolder = getOrCreateFolder(mainFolderName);
    }
    
    // Create a subfolder for this specific survey using serial number
    var surveyFolderName = 'Survey_' + serialNumber + '_' + new Date().toISOString().split('T')[0];
    var surveyFolder = getOrCreateFolder(surveyFolderName, mainFolder);
    
    var urls = {
      filledForms: '',
      brochures: ''
    };
    
    // Upload filled forms (images)
    if (surveyData.filledForms && Array.isArray(surveyData.filledForms) && surveyData.filledForms.length > 0) {
      var formsFolder = getOrCreateFolder('Filled_Forms', surveyFolder);
      var formUrls = [];
      
      surveyData.filledForms.forEach(function(file, index) {
        try {
          var fileBlob = convertBase64ToBlob(file.data, file.type);
          var fileName = file.name || ('filled_form_' + (index + 1) + getFileExtension(file.type));
          var driveFile = formsFolder.createFile(fileBlob.setName(fileName));
          driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          formUrls.push(driveFile.getUrl());
        } catch (err) {
          Logger.log('Error uploading form file: ' + err);
        }
      });
      
      urls.filledForms = formUrls.join('\\n');
    }
    
    // Upload brochures (PDFs)
    if (surveyData.brochures && Array.isArray(surveyData.brochures) && surveyData.brochures.length > 0) {
      var brochuresFolder = getOrCreateFolder('Brochures', surveyFolder);
      var brochureUrls = [];
      
      surveyData.brochures.forEach(function(file, index) {
        try {
          var fileBlob = convertBase64ToBlob(file.data, file.type);
          var fileName = file.name || ('brochure_' + (index + 1) + '.pdf');
          var driveFile = brochuresFolder.createFile(fileBlob.setName(fileName));
          driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          brochureUrls.push(driveFile.getUrl());
        } catch (err) {
          Logger.log('Error uploading brochure file: ' + err);
        }
      });
      
      urls.brochures = brochureUrls.join('\\n');
    }
    
    return {
      success: true,
      urls: urls,
      folderUrl: surveyFolder.getUrl()
    };
    
  } catch (error) {
    Logger.log('Error in uploadSurveyFiles: ' + error);
    return {
      success: false,
      error: error.toString(),
      urls: { filledForms: '', brochures: '' }
    };
  }
}

// Helper function to get or create a folder
function getOrCreateFolder(folderName, parentFolder) {
  var parent = parentFolder || DriveApp;
  var folders = parent.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    if (parentFolder) {
      return parentFolder.createFolder(folderName);
    } else {
      return DriveApp.createFolder(folderName);
    }
  }
}

// Helper function to convert base64 to blob
function convertBase64ToBlob(base64Data, mimeType) {
  // Remove data URI prefix if present
  var base64 = base64Data.split(',')[1] || base64Data;
  
  // Decode base64
  var decoded = Utilities.base64Decode(base64);
  
  // Create blob
  return Utilities.newBlob(decoded, mimeType);
}

// Helper function to get file extension from mime type
function getFileExtension(mimeType) {
  var extensions = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/heic': '.heic',
    'image/heif': '.heif',
    'image/bmp': '.bmp',
    'image/tiff': '.tiff',
    'application/pdf': '.pdf'
  };
  
  return extensions[mimeType] || '';
}

// Function to test Drive folder connection
function testDriveFolder(folderId) {
  try {
    if (!folderId || folderId.trim() === '') {
      return {
        result: 'error',
        error: 'Folder ID is required'
      };
    }
    
    var folder = DriveApp.getFolderById(folderId);
    var folderName = folder.getName();
    
    return {
      result: 'success',
      folderName: folderName,
      message: 'Connected to folder: ' + folderName
    };
    
  } catch (error) {
    return {
      result: 'error',
      error: 'Invalid Folder ID or no access. Error: ' + error.toString()
    };
  }
}