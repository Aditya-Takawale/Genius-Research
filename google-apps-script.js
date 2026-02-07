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
    
    if (data.action === 'submit') {
      // Submit survey data
      var result = submitSurveyData(data);
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
    
    var surveyData = requestData.data;
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createProperHeaders(sheet);
      
      // Add dynamic columns from first submission
      var allKeys = Object.keys(surveyData).sort();
      var sectionAKeys = ['Q1A_City', 'Q1B_OEM', 'Q1C_Model', 'S1_1_DealerName', 'S1_2_DealerAddress', 
                          'S1_3_DistrictName', 'S1_4_StateName', 'S1_5_RespondentName', 'S1_6_RespondentContact',
                          'Q1C_Gender', 'Q2_Experience', 'Q3_Designation', 'Q4_ModelExperience', 'Q5_KnowledgeLevel',
                          'submittedAt', 'submittedDate', 'submittedTime'];
      
      var headerRow = 15; // Current header count
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
    
    var rowData = buildProperRow(surveyData, requestData.timestamp, sheet);
    sheet.appendRow(rowData);
    
    return {
      result: 'success',
      message: 'Survey submitted successfully',
      row: sheet.getLastRow()
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
    'Timestamp',
    // SECTION A: Administrative - exactly as collected
    'Q1A_City', 'Q1B_OEM', 'Q1C_Model',
    'S1_1_DealerName', 'S1_2_DealerAddress', 'S1_3_DistrictName', 'S1_4_StateName',
    'S1_5_RespondentName', 'S1_6_RespondentContact',
    'Q1C_Gender', 'Q2_Experience', 'Q3_Designation',
    'Q4_ModelExperience', 'Q5_KnowledgeLevel'
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
      if (header === 'Timestamp') {
        row.push(timestamp || new Date().toISOString());
      } else {
        row.push(get(header));
      }
    });
    
    return row;
  }
  
  // Fallback: build row in default order
  var row = [
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
  var sectionAKeys = ['Q1A_City', 'Q1B_OEM', 'Q1C_Model', 'S1_1_DealerName', 'S1_2_DealerAddress', 
                      'S1_3_DistrictName', 'S1_4_StateName', 'S1_5_RespondentName', 'S1_6_RespondentContact',
                      'Q1C_Gender', 'Q2_Experience', 'Q3_Designation', 'Q4_ModelExperience', 'Q5_KnowledgeLevel',
                      'submittedAt', 'submittedDate', 'submittedTime'];
  
  allKeys.forEach(function(key) {
    if (sectionAKeys.indexOf(key) === -1) {
      row.push(get(key));
    }
  });
  
  return row;
}