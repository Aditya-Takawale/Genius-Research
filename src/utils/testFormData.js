// Test data generator for the Dealer Survey Form
// This script generates complete test data for all form fields

export function generateTestFormData() {
  const testData = {};

  // ============ SECTION A: Administrative ============
  testData.Q1A_City = '1'; // Pune
  testData.Q1B_OEM = '2'; // Tata Motors (Passenger Vehicle)
  testData.Q1C_Model = '4'; // Tata Curvv
  testData.S1_1_DealerName = 'Velocity Auto Sales Pvt Ltd';
  testData.S1_2_DealerAddress = '789 MG Road, Kothrud';
  testData.S1_3_DistrictName = 'Pune';
  testData.S1_4_StateName = 'Maharashtra';
  testData.S1_5_RespondentName = 'Priya Sharma';
  testData.S1_6_RespondentContact = '9123456789';
  testData.Q1C_Gender = '2'; // Female
  testData.Q2_Experience = '7'; // 7 years
  testData.Q3_Designation = 'Sales Team Lead'; // Text field
  testData.Q4_VehicleModelsDealt = '5'; // 5 models
  testData.Q5_FeatureKnowledgeLevel = '5'; // Excellent

  // ============ SECTION B: Q6 - Comfort Features (37 features) ============
  for (let i = 1; i <= 37; i++) {
    testData[`Q6a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2'; // 70% Yes
    testData[`Q6c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1); // 1, 2, or 3
    testData[`Q6d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2'; // 50% Yes
    if (testData[`Q6d_Aftermarket_${i}`] === '1') {
      testData[`Q6e_Price_${i}`] = String(Math.floor(Math.random() * 10000) + 1000); // Random price
    }
  }
  // Q6b - Most Preferred (checkbox array)
  testData.Q6b_MostPreferred = ['1', '5', '8', '13', '15', '30'];

  // ============ SECTION C: Q7 - Safety Features (26 features) ============
  for (let i = 1; i <= 26; i++) {
    testData[`Q7a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q7c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q7d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q7d_Aftermarket_${i}`] === '1') {
      testData[`Q7e_Price_${i}`] = String(Math.floor(Math.random() * 8000) + 500);
    }
  }
  testData.Q7b_MostPreferred = ['2', '8', '9', '10', '16'];

  // Q7f - ADAS Features Level 1 (4 features using codes)
  testData.ADAS_ACC = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_LDW = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_LKA = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_AEB = Math.random() > 0.5 ? '1' : '2';

  // Q7f - ADAS Features Level 2 (6 features using codes)
  testData.ADAS_LCA = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_Traffic_Jam = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_Highway_Assist = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_Blind_Spot = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_360_Cam = Math.random() > 0.5 ? '1' : '2';
  testData.ADAS_Rear_Cross_Traffic = Math.random() > 0.5 ? '1' : '2';

  // ============ SECTION D: Q8 - Exterior Features (15 features) ============
  for (let i = 1; i <= 15; i++) {
    testData[`Q8a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q8c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q8d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q8d_Aftermarket_${i}`] === '1') {
      testData[`Q8e_Price_${i}`] = String(Math.floor(Math.random() * 15000) + 2000);
    }
  }
  testData.Q8b_MostPreferred = ['1', '2', '3', '6', '8'];

  // ============ SECTION E: Q9 - Interior Features (21 features) ============
  for (let i = 1; i <= 21; i++) {
    testData[`Q9a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q9c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q9d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q9d_Aftermarket_${i}`] === '1') {
      testData[`Q9e_Price_${i}`] = String(Math.floor(Math.random() * 5000) + 500);
    }
  }
  testData.Q9b_MostPreferred = ['1', '5', '7', '10', '15'];

  // Q9f - ICL Features (9 features using codes)
  testData.ICL_Speedo = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Tacho = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Fuel = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Temp = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Odo = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Trip = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Warning_Lights = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Digital_Display = Math.random() > 0.3 ? '1' : '2';
  testData.ICL_Custom_Layout = Math.random() > 0.5 ? '1' : '2';

  // ============ SECTION F: Q10 - Infotainment Features (6 features) ============
  for (let i = 1; i <= 6; i++) {
    testData[`Q10a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q10c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q10d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q10d_Aftermarket_${i}`] === '1') {
      testData[`Q10e_Price_${i}`] = String(Math.floor(Math.random() * 20000) + 3000);
    }
  }
  testData.Q10b_MostPreferred = ['1', '3', '4'];

  // ============ SECTION G: Q11 - Connectivity Features (13 features) ============
  for (let i = 1; i <= 13; i++) {
    testData[`Q11a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q11c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q11d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q11d_Aftermarket_${i}`] === '1') {
      testData[`Q11e_Price_${i}`] = String(Math.floor(Math.random() * 8000) + 1000);
    }
  }
  testData.Q11b_MostPreferred = ['1', '2', '5', '6', '7'];

  // ============ SECTION H: Q12 - Performance Features (6 features) ============
  for (let i = 1; i <= 6; i++) {
    testData[`Q12a_Available_${i}`] = Math.random() > 0.3 ? '1' : '2';
    testData[`Q12c_Importance_${i}`] = String(Math.floor(Math.random() * 3) + 1);
    testData[`Q12d_Aftermarket_${i}`] = Math.random() > 0.5 ? '1' : '2';
    if (testData[`Q12d_Aftermarket_${i}`] === '1') {
      testData[`Q12e_Price_${i}`] = String(Math.floor(Math.random() * 25000) + 5000);
    }
  }
  testData.Q12b_MostPreferred = ['1', '2', '4'];

  // ============ SECTION I: Q13a, Q13b & Q14 - Open-ended Feedback ============
  // Q13a - Missing Features (10 fields from Step 9)
  testData.Q13a_Missing_1 = 'Wireless Android Auto & Apple CarPlay';
  testData.Q13a_Missing_2 = 'Panoramic Sunroof';
  testData.Q13a_Missing_3 = 'Powered Driver Seat with Memory';
  testData.Q13a_Missing_4 = '360 Degree Camera System';
  testData.Q13a_Missing_5 = 'Digital Key Technology';
  testData.Q13a_Missing_6 = '';
  testData.Q13a_Missing_7 = '';
  testData.Q13a_Missing_8 = '';
  testData.Q13a_Missing_9 = '';
  testData.Q13a_Missing_10 = '';

  // Q13b - Preferred Features (10 fields from Step 9)
  testData.Q13b_Preferred_1 = 'Premium JBL Sound System';
  testData.Q13b_Preferred_2 = '12.3 inch Touchscreen Display';
  testData.Q13b_Preferred_3 = 'Wireless Charging Pad';
  testData.Q13b_Preferred_4 = 'Ventilated Front Seats';
  testData.Q13b_Preferred_5 = 'Auto-Dimming IRVM';
  testData.Q13b_Preferred_6 = 'Ambient Lighting (Multi-Color)';
  testData.Q13b_Preferred_7 = '';
  testData.Q13b_Preferred_8 = '';
  testData.Q13b_Preferred_9 = '';
  testData.Q13b_Preferred_10 = '';

  // Q14 - Other Desired Features (10 fields from Step 9)
  testData.Q14_Other_1 = 'Over-the-Air (OTA) Software Updates';
  testData.Q14_Other_2 = 'Gesture Control for Infotainment';
  testData.Q14_Other_3 = 'Head-Up Display (HUD)';
  testData.Q14_Other_4 = 'Air Purifier with AQI Display';
  testData.Q14_Other_5 = '';
  testData.Q14_Other_6 = '';
  testData.Q14_Other_7 = '';
  testData.Q14_Other_8 = '';
  testData.Q14_Other_9 = '';
  testData.Q14_Other_10 = '';

  return testData;
}

// Generate deterministic test data (same values every time)
export function generateDeterministicTestData() {
  const testData = {};

  // ============ SECTION A: Administrative ============
  testData.Q1A_City = '1';
  testData.Q1B_OEM = '2';
  testData.Q1C_Model = '4';
  testData.S1_1_DealerName = 'Elite Motors & Services Ltd';
  testData.S1_2_DealerAddress = '321 Baner Road, Aundh';
  testData.S1_3_DistrictName = 'Pune';
  testData.S1_4_StateName = 'Maharashtra';
  testData.S1_5_RespondentName = 'Neha Deshmukh';
  testData.S1_6_RespondentContact = '9191919191';
  testData.Q1C_Gender = '2';
  testData.Q2_Experience = '12';
  testData.Q3_Designation = '1';
  testData.Q4_VehicleModelsDealt = '8';
  testData.Q5_FeatureKnowledgeLevel = '5';

  // ============ SECTION B: Q6 - Comfort Features (37 features) ============
  for (let i = 1; i <= 37; i++) {
    testData[`Q6a_Available_${i}`] = i % 3 === 0 ? '2' : '1'; // Every 3rd is No
    testData[`Q6c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q6d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q6d_Aftermarket_${i}`] === '1') {
      testData[`Q6e_Price_${i}`] = String(1000 + i * 100);
    }
  }
  testData.Q6b_MostPreferred = ['1', '5', '8', '13', '15', '30'];

  // ============ SECTION C: Q7 - Safety Features (26 features) ============
  for (let i = 1; i <= 26; i++) {
    testData[`Q7a_Available_${i}`] = i <= 20 ? '1' : '2';
    testData[`Q7c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q7d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q7d_Aftermarket_${i}`] === '1') {
      testData[`Q7e_Price_${i}`] = String(500 + i * 200);
    }
  }
  testData.Q7b_MostPreferred = ['2', '8', '9', '10', '16'];

  // Q7f - ADAS Features
  testData.ADAS_ACC = '1';
  testData.ADAS_LDW = '1';
  testData.ADAS_LKA = '2';
  testData.ADAS_AEB = '1';
  testData.ADAS_LCA = '2';
  testData.ADAS_Traffic_Jam = '1';
  testData.ADAS_Highway_Assist = '1';
  testData.ADAS_Blind_Spot = '1';
  testData.ADAS_360_Cam = '1';
  testData.ADAS_Rear_Cross_Traffic = '2';

  // ============ SECTION D: Q8 - Exterior Features (15 features) ============
  for (let i = 1; i <= 15; i++) {
    testData[`Q8a_Available_${i}`] = i <= 12 ? '1' : '2';
    testData[`Q8c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q8d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q8d_Aftermarket_${i}`] === '1') {
      testData[`Q8e_Price_${i}`] = String(2000 + i * 500);
    }
  }
  testData.Q8b_MostPreferred = ['1', '2', '3', '6', '8'];

  // ============ SECTION E: Q9 - Interior Features (21 features) ============
  for (let i = 1; i <= 21; i++) {
    testData[`Q9a_Available_${i}`] = i <= 18 ? '1' : '2';
    testData[`Q9c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q9d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q9d_Aftermarket_${i}`] === '1') {
      testData[`Q9e_Price_${i}`] = String(500 + i * 150);
    }
  }
  testData.Q9b_MostPreferred = ['1', '5', '7', '10', '15'];

  // Q9f - ICL Features
  testData.ICL_Speedo = '1';
  testData.ICL_Tacho = '1';
  testData.ICL_Fuel = '1';
  testData.ICL_Temp = '1';
  testData.ICL_Odo = '1';
  testData.ICL_Trip = '1';
  testData.ICL_Warning_Lights = '1';
  testData.ICL_Digital_Display = '1';
  testData.ICL_Custom_Layout = '2';

  // ============ SECTION F: Q10 - Infotainment Features (6 features) ============
  for (let i = 1; i <= 6; i++) {
    testData[`Q10a_Available_${i}`] = '1';
    testData[`Q10c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q10d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q10d_Aftermarket_${i}`] === '1') {
      testData[`Q10e_Price_${i}`] = String(3000 + i * 1000);
    }
  }
  testData.Q10b_MostPreferred = ['1', '3', '4'];

  // ============ SECTION G: Q11 - Connectivity Features (13 features) ============
  for (let i = 1; i <= 13; i++) {
    testData[`Q11a_Available_${i}`] = i <= 10 ? '1' : '2';
    testData[`Q11c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q11d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q11d_Aftermarket_${i}`] === '1') {
      testData[`Q11e_Price_${i}`] = String(1000 + i * 300);
    }
  }
  testData.Q11b_MostPreferred = ['1', '2', '5', '6', '7'];

  // ============ SECTION H: Q12 - Performance Features (6 features) ============
  for (let i = 1; i <= 6; i++) {
    testData[`Q12a_Available_${i}`] = i <= 4 ? '1' : '2';
    testData[`Q12c_Importance_${i}`] = String((i % 3) + 1);
    testData[`Q12d_Aftermarket_${i}`] = i % 2 === 0 ? '1' : '2';
    if (testData[`Q12d_Aftermarket_${i}`] === '1') {
      testData[`Q12e_Price_${i}`] = String(5000 + i * 2000);
    }
  }
  testData.Q12b_MostPreferred = ['1', '2', '4'];

  // ============ SECTION I: Q13a, Q13b & Q14 - Open-ended Feedback ============
  // Q13a - Missing Features (10 fields from Step 9)
  testData.Q13a_Missing_1 = 'Electrically Adjustable Steering Column';
  testData.Q13a_Missing_2 = 'Cooled Glovebox';
  testData.Q13a_Missing_3 = 'Rear Sunshade';
  testData.Q13a_Missing_4 = 'Foot Sensor for Boot Opening';
  testData.Q13a_Missing_5 = 'Blind Spot Monitoring';
  testData.Q13a_Missing_6 = 'Lane Change Assist';
  testData.Q13a_Missing_7 = '';
  testData.Q13a_Missing_8 = '';
  testData.Q13a_Missing_9 = '';
  testData.Q13a_Missing_10 = '';

  // Q13b - Preferred Features (10 fields from Step 9)
  testData.Q13b_Preferred_1 = 'Improved Fuel Economy Display';
  testData.Q13b_Preferred_2 = '10.25 inch Digital Instrument Cluster';
  testData.Q13b_Preferred_3 = 'Rear AC Vents with Separate Controls';
  testData.Q13b_Preferred_4 = 'Leather-Wrapped Gear Knob';
  testData.Q13b_Preferred_5 = 'Auto-Hold Function in Brakes';
  testData.Q13b_Preferred_6 = 'Rain Sensing Wipers';
  testData.Q13b_Preferred_7 = 'Dual-Zone Climate Control';
  testData.Q13b_Preferred_8 = '';
  testData.Q13b_Preferred_9 = '';
  testData.Q13b_Preferred_10 = '';

  // Q14 - Other Desired Features (10 fields from Step 9)
  testData.Q14_Other_1 = 'Better Ground Clearance (200mm+)';
  testData.Q14_Other_2 = 'Larger Boot Space (400L+)';
  testData.Q14_Other_3 = 'More Color Options';
  testData.Q14_Other_4 = 'Better After-Sales Service';
  testData.Q14_Other_5 = 'Faster Charging for EV Variants';
  testData.Q14_Other_6 = '';
  testData.Q14_Other_7 = '';
  testData.Q14_Other_8 = '';
  testData.Q14_Other_9 = '';
  testData.Q14_Other_10 = '';

  return testData;
}

// Export a function to apply test data to react-hook-form
export function applyTestDataToForm(setValue, testData) {
  Object.entries(testData).forEach(([key, value]) => {
    setValue(key, value);
  });
}
