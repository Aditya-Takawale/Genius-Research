// Test data generator for the Dealer Survey Form
// This script generates complete test data for all form fields

export function generateTestFormData() {
  const testData = {};

  // ============ SECTION A: Administrative ============
  testData.Q1A_City = '1'; // Pune
  testData.Q1B_OEM = '2'; // Tata Motors (Passenger Vehicle)
  testData.Q1C_Model = '4'; // Tata Curvv
  testData.S1_1_DealerName = 'Test Dealer Pvt Ltd';
  testData.S1_2_DealerAddress = '123 Test Street, Test Area';
  testData.S1_3_DistrictName = 'Pune';
  testData.S1_4_StateName = 'Maharashtra';
  testData.S1_5_RespondentName = 'Test Respondent';
  testData.S1_6_RespondentContact = '9876543210';
  testData.Q1C_Gender = '1'; // Male
  testData.Q2_Experience = '5'; // 5 years
  testData.Q3_Designation = 'Senior Sales Manager'; // Text field
  testData.Q4_VehicleModelsDealt = '3'; // 3 models
  testData.Q5_FeatureKnowledgeLevel = '4'; // Very Good

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

  // ============ SECTION I: Q13 & Q14 - Open-ended Feedback ============
  testData.Q13_Missing_1 = 'Heated Steering Wheel';
  testData.Q13_Missing_2 = 'Heads-up Display';
  testData.Q13_Missing_3 = 'Massage Seats';
  testData.Q13_Missing_4 = '';
  testData.Q13_Missing_5 = '';
  testData.Q13_Missing_6 = '';
  testData.Q13_Missing_7 = '';
  testData.Q13_Missing_8 = '';
  testData.Q13_Missing_9 = '';
  testData.Q13_Missing_10 = '';

  testData.Q14_Other_1 = 'Gesture Control';
  testData.Q14_Other_2 = 'Night Vision Camera';
  testData.Q14_Other_3 = '';
  testData.Q14_Other_4 = '';
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
  testData.S1_1_DealerName = 'ABC Motors Pvt Ltd';
  testData.S1_2_DealerAddress = '456 Main Road, Kothrud';
  testData.S1_3_DistrictName = 'Pune';
  testData.S1_4_StateName = 'Maharashtra';
  testData.S1_5_RespondentName = 'Rajesh Kumar';
  testData.S1_6_RespondentContact = '9876543210';
  testData.Q1C_Gender = '1';
  testData.Q2_Experience = '8';
  testData.Q3_Designation = '1';
  testData.Q4_VehicleModelsDealt = '5';
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

  // ============ SECTION I: Q13 & Q14 - Open-ended Feedback ============
  testData.Q13_Missing_1 = 'Heated Steering Wheel';
  testData.Q13_Missing_2 = 'Heads-up Display';
  testData.Q13_Missing_3 = 'Massage Seats';
  testData.Q13_Missing_4 = 'Adaptive Suspension';
  testData.Q13_Missing_5 = '';
  testData.Q13_Missing_6 = '';
  testData.Q13_Missing_7 = '';
  testData.Q13_Missing_8 = '';
  testData.Q13_Missing_9 = '';
  testData.Q13_Missing_10 = '';

  testData.Q14_Other_1 = 'Gesture Control';
  testData.Q14_Other_2 = 'Night Vision Camera';
  testData.Q14_Other_3 = 'Self Parking System';
  testData.Q14_Other_4 = '';
  testData.Q14_Other_5 = '';
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
