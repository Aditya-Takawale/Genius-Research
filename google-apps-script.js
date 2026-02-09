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
    // Hardcoded Google Drive folder ID for file uploads
    var driveFolderId = '1oOTNZb6mR5q9ByT1ptlqD7_8VtqR7YDH';
    
    var surveyData = requestData.data;
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createProperHeaders(sheet);
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
    'Q4_VehicleModelsDealt', 'Q5_FeatureKnowledgeLevel'
  ];
  
  // Add all feature columns with exact names from the form
  headers = headers.concat(generateFeatureHeaders());
  
  // Add File Upload URLs at the end
  headers.push('filledForms_URLs');
  headers.push('brochures_URLs');
  
  sheet.appendRow(headers);
  
  // Format header
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0066CC');
  headerRange.setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
}

// Generate all feature column headers with new naming convention: Q[Section][Question].[ID] [Feature Name] [Question Type]
function generateFeatureHeaders() {
  var headers = [];
  
  // Q6 - Comfort Features (37 features × 5 = 185 columns)
  var comfortFeatures = [
    'Drive mode (Eco, Normal, Sport)', 'USB charger (C-type / A-Type)', 'Power outlet',
    'Idle stop & go (ISG) / Integrated Start & Stop (ISS)', 'Bottle Holder', 'Driver Side Footrest',
    'Emergency & Breakdown Assist', 'Cruise control', 'Tilt / Telescopic adjustable steering',
    'Heat resistant seats to prevent driver engine heat', 'Electric parking brake with auto hold',
    'Smartphone wireless charger', 'Keyless entry', 'Electrically Adjustable/Autofold ORVM',
    'Push Button Start / Stop', 'Remote engine start', 'Electric tailgate release', 'Rain sensing wiper',
    'Gear Shift Advisor', 'Gear Position Indicator', 'Smart E- Shifter (for AMT)',
    'Rear Seat with Reclining Option', 'Quick Gear Shifter', 'Guide Me Home\' Headlamps',
    'Electrochromatic IRVM / Anti Glare IRVM', 'Traction Control System', 'Paddle shifters',
    'Rear centre armrest with cup holders', 'Integrated Engine Kill Switch',
    'Air conditioning with electric temperature control', 'Glovebox cooling', 'Air Purifier',
    'Electric Sunroof', 'Voice Assisted Sunroof', 'Ventilated Seats', 'Front console armrest with storage',
    'Rear Defogger'
  ];
  
  // Generate Q6 columns for each feature
  comfortFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q6a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q6b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q6c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q6d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q6e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q7 - Safety Features (26 features × 5 = 130 columns)
  var safetyFeatures = [
    'Hill-assist', 'Reverse Camera/Sensor for Park Assist', 'First aid kit', 'Immobilizer',
    'Anti-roll Bar', 'Tyre pressure monitoring system (TPMS) highline', 'Disc Brakes', 'ADAS',
    'ABS (Dual-channel in case of 2W)', 'Airbag', 'Electronic Brakeforce Distribution (EBD)',
    'Electronic stability control (ESC)', 'Seat belt pretensioners', 'Height adjustable front seat belts',
    '3 Point retractable seat belts (all seats)', 'Seatbelt reminder', 'Headlamp Levelling',
    'Automatic headlamps', 'Anti-theft mechanism', 'Emergency Brake Warning', 'Brake Level Adjuster',
    'All in one Lock', 'Crash & Fall Alert', 'Speed Sensing Auto Door Lock', 'ISOFIX', 'Child Safety Lock'
  ];
  
  // Generate Q7 columns for each safety feature
  safetyFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q7a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q7b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q7c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q7d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q7e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q7f - ADAS Features Level 1 & 2 (10 features × 1 = 10 columns)
  var adasFeatures = [
    'Adaptive Cruise Control', 'Lane Departure Warning', 'Lane Keep Assist', 'Automatic Emergency Braking (AEB)',
    'Lane Centering Assist', 'Traffic Jam Assist', 'Highway Assist (Semi-Autonomous Driving)',
    'Blind Spot Detection', '360 Degree Camera', 'Rear Cross Traffic Assist'
  ];
  
  // Generate Q7f columns for ADAS features (simple Yes/No only)
  adasFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q7f.' + featureNum + ' ' + feature);
  });
  
  // Q8 - Exterior Features (15 features × 5 = 75 columns)
  var exteriorFeatures = [
    'LED Headlamps', 'LED tail lamps', 'LED DRL', 'Front Body Graphics', 'Rear Body Graphics',
    'Alloy Wheels', 'Front / Rear Skid Plate', 'Fog Lamps', 'Front Wiper (multi-speed)',
    'Rope Hooks', 'Cornering Lamp', 'Dual tone roof', 'Full Wheel Covers', 'Shark Fin Antenna', 'Rear Spoiler'
  ];
  
  // Generate Q8 columns for each exterior feature
  exteriorFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q8a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q8b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q8c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q8d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q8e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q9 - Interior Features (21 features × 5 = 105 columns)
  var interiorFeatures = [
    'Front Dome Lamp', 'Sliding Driver Seat', 'Sun Visor', 'Floor Carpet', 'Leather Upholstery',
    'Adj Front Headrest', 'Power Windows', 'Adj Rear Headrest', 'Manual Height Driver Seat',
    'Leather Steering', 'Dual Tone Interior', 'Centre Room Lamp', 'Luggage Room Lamp',
    'Footwell Illumination', '60:40 Split Seat', 'Driver Side Pocket', 'Ambient Temperature Display',
    'Sliding Back Window', 'Metal Inside Handles', 'Leather Door Armrest', 'Leather Gear Knob'
  ];
  
  // Generate Q9 columns for each interior feature
  interiorFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q9a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q9b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q9c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q9d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q9e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q9f - ICL Features (9 features × 1 = 9 columns)
  var iclFeatures = [
    'Speedometer', 'Tachometer', 'Fuel Gauge', 'Temperature Gauge', 'Odometer', 'Trip Meter',
    'Warning Lights (Eg.: Engine, ABS, Airbag)', 'Digital Display (Eg.: Navigation, Settings)', 'Customizable Layouts'
  ];
  
  // Generate Q9f columns for ICL features (simple Yes/No only)
  iclFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q9f.' + featureNum + ' ' + feature);
  });
  
  // Q10 - Infotainment Features (6 features × 5 = 30 columns)
  var infotainmentFeatures = [
    'Digital TFT Cluster', 'Steering Music & Call Control', 'Touch Screen Infotainment System',
    'Speaker System', 'Front & Rear Speakers', 'Tweeters'
  ];
  
  // Generate Q10 columns for each infotainment feature
  infotainmentFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q10a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q10b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q10c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q10d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q10e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q11 - Connectivity Features (13 features × 5 = 65 columns)
  var connectivityFeatures = [
    'Bluetooth Connectivity', 'USB Connectivity', 'Call & SMS Alerts', 'Turn by Turn Navigation',
    'Android Auto', 'Apple CarPlay', 'Voice Recognition', 'Steering Audio & Bluetooth Controls',
    'OTA Updates', 'Onboard Voice Assistant', 'Smart Watch Integration', 'WiFi Connectivity', 'Vehicle Live Tracking'
  ];
  
  // Generate Q11 columns for each connectivity feature
  connectivityFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q11a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q11b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q11c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q11d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q11e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q12 - Performance Features (6 features × 5 = 30 columns)
  var performanceFeatures = [
    'Hydraulic Clutch', 'Turbocharger', 'Power Take-Off', 'HV Battery Warranty',
    'K-Series DualJet Engine', 'TVS iGO Assist'
  ];
  
  // Generate Q12 columns for each performance feature
  performanceFeatures.forEach(function(feature, index) {
    var featureNum = index + 1;
    headers.push('Q12a.' + featureNum + ' ' + feature + ' OEM (Factory Fitted / Dealer Fitted)');
    headers.push('Q12b.' + featureNum + ' ' + feature + ' MOST PREFERRED');
    headers.push('Q12c.' + featureNum + ' ' + feature + ' IMPORTANT');
    headers.push('Q12d.' + featureNum + ' ' + feature + ' AVAILABLE AFTERMARKET');
    headers.push('Q12e.' + featureNum + ' ' + feature + ' After Market Price');
  });
  
  // Q13 - Missing Features (20 text fields)
  for (var i = 1; i <= 20; i++) {
    headers.push('Q13.' + i + ' Missing Features');
  }
  
  // Q14 - Other Desired Features (10 text fields)
  for (var i = 1; i <= 10; i++) {
    headers.push('Q14.' + i + ' Other Desired Features');
  }
  
  return headers;
}

function buildProperRow(data, timestamp, sheet) {
  function get(key) {
    var val = data[key];
    if (val === null || val === undefined) return '';
    // Don't store the actual file data arrays (filledForms, brochures) - only store URLs
    if (key === 'filledForms' || key === 'brochures') return '';
    if (Array.isArray(val)) return val.join(', ');
    if (typeof val === 'object') return JSON.stringify(val);
    
    // Store raw numerical values directly (no visual conversion)
    // Form coding: Yes=1, No=2, Most Important=1, Good to Have=2, Not Important=3
    return val;
  }
  
  // Build row based on existing headers in the sheet
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