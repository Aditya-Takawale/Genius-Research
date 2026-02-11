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
    
    if (data.action === 'recreateHeaders') {
      // Force recreate sheet headers
      var result = recreateSheetHeaders(data.sheetName);
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
    
    // DEBUG: Log received data keys
    Logger.log('=== RECEIVED DATA KEYS ===');
    Logger.log('Total keys received: ' + Object.keys(surveyData).length);
    Logger.log('First 50 keys: ' + Object.keys(surveyData).slice(0, 50).join(', '));
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createProperHeaders(sheet);
    } else {
      // DEBUG: Check if headers are correct
      var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      Logger.log('=== EXISTING HEADERS CHECK ===');
      Logger.log('Sheet has ' + existingHeaders.length + ' columns');
      Logger.log('Expected ~670 columns for complete survey');
      Logger.log('Header sample (cols 10-15): ' + existingHeaders.slice(10, 15).join(' | '));
      
      // Check if we need to recreate headers (if header count is wrong)
      var expectedMinColumns = 650; // Approximate minimum expected
      if (existingHeaders.length < expectedMinColumns) {
        Logger.log('WARNING: Header count too low! Recreating headers...');
        sheet.clear();
        createProperHeaders(sheet);
      }
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

// Function to recreate sheet headers (fixes old/incomplete headers)
function recreateSheetHeaders(sheetName) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sheetName = sheetName || 'Dealer Survey Data';
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        result: 'error',
        message: 'Sheet "' + sheetName + '" does not exist'
      };
    }
    
    // Get existing data (excluding header row)
    var lastRow = sheet.getLastRow();
    var existingData = [];
    if (lastRow > 1) {
      existingData = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    }
    
    // Clear sheet and recreate headers
    sheet.clear();
    createProperHeaders(sheet);
    
    // Note: Restoring data would require complex mapping. Better to delete old data.
    return {
      result: 'success',
      message: 'Headers recreated successfully! ' + (existingData.length > 0 ? 'WARNING: Old data was cleared. Please resubmit surveys.' : ''),
      newColumnCount: sheet.getLastColumn()
    };
    
  } catch (error) {
    return {
      result: 'error',
      message: 'Error recreating headers: ' + error.toString()
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
  
  // Q13 - Features Customers Check (10 text fields from Step 8)
  for (var i = 1; i <= 10; i++) {
    headers.push('Q13.' + i + ' Features Customers Check');
  }
  
  // Q13a - Missing Features (10 text fields from Step 9)
  for (var i = 1; i <= 10; i++) {
    headers.push('Q13a.' + i + ' Missing Features');
  }
  
  // Q13b - Preferred Features (10 text fields from Step 9)
  for (var i = 1; i <= 10; i++) {
    headers.push('Q13b.' + i + ' Preferred Features');
  }
  
  // Q14 - Other Desired Features (10 text fields)
  for (var i = 1; i <= 10; i++) {
    headers.push('Q14.' + i + ' Other Desired Features');
  }
  
  return headers;
}

// Map header name to form field name
function getFormFieldName(header) {
  // Administrative fields - direct mapping
  var directFields = {
    'Q1A_City': 'Q1A_City',
    'Q1B_OEM': 'Q1B_OEM',
    'Q1C_Model': 'Q1C_Model',
    'S1_1_DealerName': 'S1_1_DealerName',
    'S1_2_DealerAddress': 'S1_2_DealerAddress',
    'S1_3_DistrictName': 'S1_3_DistrictName',
    'S1_4_StateName': 'S1_4_StateName',
    'S1_5_RespondentName': 'S1_5_RespondentName',
    'S1_6_RespondentContact': 'S1_6_RespondentContact',
    'Q1C_Gender': 'Q1C_Gender',
    'Q2_Experience': 'Q2_Experience',
    'Q3_Designation': 'Q3_Designation',
    'Q4_VehicleModelsDealt': 'Q4_VehicleModelsDealt',
    'Q5_FeatureKnowledgeLevel': 'Q5_FeatureKnowledgeLevel',
    'filledForms_URLs': 'filledForms_URLs',
    'brochures_URLs': 'brochures_URLs'
  };
  
  if (directFields[header]) {
    return directFields[header];
  }
  
  // Feature columns: Parse header pattern like "Q6a.1 Drive mode... OEM..."
  // Patterns:
  // Q6a.1 ... OEM -> Q6a_Available_1
  // Q6b.1 ... MOST PREFERRED -> Q6b_MostPreferred (checkbox array)
  // Q6c.1 ... IMPORTANT -> Q6c_Importance_1
  // Q6d.1 ... AVAILABLE AFTERMARKET -> Q6d_Aftermarket_1
  // Q6e.1 ... After Market Price -> Q6e_Price_1
  // Q7f.1 Adaptive Cruise Control -> ADAS_ACC (uses feature.code)
  // Q9f.1 Speedometer -> ICL_Speedo (uses feature.code)
  // Q13.1 Missing Features -> Q13_Missing_1
  // Q14.1 Other Desired Features -> Q14_Other_1
  
  // Match patterns like Q6a.1, Q7b.12, Q10c.3, etc.
  var match = header.match(/^(Q\d+[a-f]?)\.(\d+)/);
  if (match) {
    var questionCode = match[1]; // e.g., Q6a, Q7f, Q10c
    var featureNum = match[2];   // e.g., 1, 12, 3
    
    // Determine field type based on letter suffix
    var letterMatch = questionCode.match(/Q(\d+)([a-f])?/);
    if (letterMatch) {
      var sectionNum = letterMatch[1];
      var letterSuffix = letterMatch[2] || '';
      
      // Handle special sections (Q13, Q13a, Q13b, Q14 - text fields)
      if (sectionNum === '13') {
        // Q13 (no suffix) = Features Customers Check
        if (letterSuffix === '') {
          return 'Q13_Checked_' + featureNum;
        }
        // Q13a = Missing Features
        if (letterSuffix === 'a') {
          return 'Q13a_Missing_' + featureNum;
        }
        // Q13b = Preferred Features
        if (letterSuffix === 'b') {
          return 'Q13b_Preferred_' + featureNum;
        }
        return null;
      }
      if (sectionNum === '14') {
        return 'Q14_Other_' + featureNum;
      }
      
      // Handle Q7f (ADAS) - map feature number to actual form field code
      if (questionCode === 'Q7f') {
        var adasCodes = [
          'ADAS_ACC', 'ADAS_LDW', 'ADAS_LKA', 'ADAS_AEB',  // Level 1 (1-4)
          'ADAS_LCA', 'ADAS_Traffic_Jam', 'ADAS_Highway_Assist', 'ADAS_Blind_Spot', 'ADAS_360_Cam', 'ADAS_Rear_Cross_Traffic'  // Level 2 (5-10)
        ];
        var adasIndex = parseInt(featureNum) - 1;
        if (adasIndex >= 0 && adasIndex < adasCodes.length) {
          return adasCodes[adasIndex];
        }
        return null;
      }
      
      // Handle Q9f (ICL) - map feature number to actual form field code
      if (questionCode === 'Q9f') {
        var iclCodes = [
          'ICL_Speedo', 'ICL_Tacho', 'ICL_Fuel', 'ICL_Temp', 'ICL_Odo',
          'ICL_Trip', 'ICL_Warning_Lights', 'ICL_Digital_Display', 'ICL_Custom_Layout'
        ];
        var iclIndex = parseInt(featureNum) - 1;
        if (iclIndex >= 0 && iclIndex < iclCodes.length) {
          return iclCodes[iclIndex];
        }
        return null;
      }
      
      // Standard feature columns (a, b, c, d, e)
      switch (letterSuffix) {
        case 'a':
          return 'Q' + sectionNum + 'a_Available_' + featureNum;
        case 'b':
          // b columns are checkboxes - return special marker
          return 'CHECKBOX_Q' + sectionNum + 'b_MostPreferred_' + featureNum;
        case 'c':
          return 'Q' + sectionNum + 'c_Importance_' + featureNum;
        case 'd':
          return 'Q' + sectionNum + 'd_Aftermarket_' + featureNum;
        case 'e':
          return 'Q' + sectionNum + 'e_Price_' + featureNum;
        default:
          return null;
      }
    }
  }
  
  return null;
}

function buildProperRow(data, timestamp, sheet) {
  function get(key) {
    var val = data[key];
    if (val === null || val === undefined) return '';
    if (key === 'filledForms' || key === 'brochures') return '';
    if (Array.isArray(val)) return val.join(', ');
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
  }
  
  // Check if a feature number is in a checkbox array
  function isInCheckboxArray(arrayName, featureNum) {
    var arr = data[arrayName];
    if (!arr) return '2'; // Not checked = 2 (No)
    if (typeof arr === 'string') {
      // Single value
      return arr === featureNum.toString() ? '1' : '2';
    }
    if (Array.isArray(arr)) {
      return arr.includes(featureNum.toString()) || arr.includes(featureNum) ? '1' : '2';
    }
    return '2';
  }
  
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var row = [];
  
  // DEBUG: Count non-empty values
  var nonEmptyCount = 0;
  var sampleMappings = [];
  
  headers.forEach(function(header, index) {
    if (header === 'Serial Number') {
      row.push(get('serialNumber'));
    } else if (header === 'Timestamp') {
      row.push(timestamp || new Date().toISOString());
    } else {
      var formField = getFormFieldName(header);
      
      if (formField) {
        // Check if it's a checkbox field
        if (formField.startsWith('CHECKBOX_')) {
          // Parse: CHECKBOX_Q6b_MostPreferred_1
          var parts = formField.replace('CHECKBOX_', '').split('_');
          var sectionMatch = parts[0].match(/Q(\d+)b/);
          if (sectionMatch) {
            var sectionNum = sectionMatch[1];
            var featureNum = parts[2];
            var arrayName = 'Q' + sectionNum + 'b_MostPreferred';
            var checkboxValue = isInCheckboxArray(arrayName, featureNum);
            row.push(checkboxValue);
            if (checkboxValue === '1') nonEmptyCount++;
          } else {
            row.push('');
          }
        } else {
          var value = get(formField);
          row.push(value);
          if (value !== '') nonEmptyCount++;
          
          // Sample first 20 mappings for debugging
          if (sampleMappings.length < 20 && index >= 10 && index <= 30) {
            sampleMappings.push(header.substring(0, 30) + ' -> ' + formField + ' = ' + value);
          }
        }
      } else {
        row.push('');
      }
    }
  });
  
  // DEBUG: Log results
  Logger.log('=== ROW BUILDING RESULTS ===');
  Logger.log('Total columns: ' + row.length);
  Logger.log('Non-empty values: ' + nonEmptyCount);
  Logger.log('Sample mappings: ' + sampleMappings.join(' | '));
  
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