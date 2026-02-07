// City Master List (Q1A)
// As per PDF: Pune=1, Ahmedabad=2, Bangalore=3, Lucknow=4, Nashik/Kolhapur/Nagpur=5
export const CITIES = [
  { code: 1, name: 'Pune' },
  { code: 2, name: 'Ahmedabad' },
  { code: 3, name: 'Bangalore' },
  { code: 4, name: 'Lucknow' },
  { code: 5, name: 'Nashik/Kolhapur/Nagpur' }
];

// OEM Codes (Q1B)
// As per PDF: Tata Motors HCV=1, Tata Motors PV=2, M&M LCV=3, Maruti Commercial=4,5, Maruti PV=6, TVS 2W=7
export const OEM_CODES = [
  { code: 1, name: 'Tata Motors (HCV)' },
  { code: 2, name: 'Tata Motors (Passenger Vehicle)' },
  { code: 3, name: 'Mahindra & Mahindra (LCV)' },
  { code: 4, name: 'Maruti Suzuki India Limited (Commercial)' },
  { code: 5, name: 'Maruti Suzuki India Limited (Commercial)' },
  { code: 6, name: 'Maruti Suzuki India Limited (PV)' },
  { code: 7, name: 'TVS (2W)' }
];

// Model/Variant Codes (Q1C) - As per PDF table
// Single list of all models with their response codes
export const MODEL_CODES = [
  { code: 1, name: 'Tata Signa 1923.K' },
  { code: 2, name: 'Mahindra Supro Profittruck Maxi' },
  { code: 3, name: 'Maruti Suzuki Super Carry' },
  { code: 4, name: 'Tata Curvv Accomplished + A' },
  { code: 5, name: 'Maruti Dzire ZXi – Commercial' },
  { code: 6, name: 'Maruti Dzire ZXi – Passenger Vehicle' },
  { code: 7, name: 'TVS Ntorq 150 TFT' },
];

// Comfort Features (Q6) - Complete list of 37 features from PDF
export const COMFORT_FEATURES = [
  { id: 1, name: 'Drive mode select (Eco, Normal, Sport)' },
  { id: 2, name: 'USB charger (C-type / A-Type)' },
  { id: 3, name: 'Power outlet' },
  { id: 4, name: 'Idle stop & go (ISG) / Integrated Start & Stop (ISS)' },
  { id: 5, name: 'Bottle Holder' },
  { id: 6, name: 'Driver Side Footrest' },
  { id: 7, name: 'Emergency & Breakdown Assist' },
  { id: 8, name: 'Cruise control' },
  { id: 9, name: 'Tilt / Telescopic adjustable steering' },
  { id: 10, name: 'Heat resistant seats to prevent driver engine heat' },
  { id: 11, name: 'Electric parking brake with auto hold' },
  { id: 12, name: 'Smartphone wireless charger' },
  { id: 13, name: 'Keyless entry' },
  { id: 14, name: 'Electrically Adjustable/Autofold ORVM' },
  { id: 15, name: 'Push Button Start / Stop' },
  { id: 16, name: 'Remote engine start' },
  { id: 17, name: 'Electric tailgate release' },
  { id: 18, name: 'Rain sensing wiper' },
  { id: 19, name: 'Gear Shift Advisor' },
  { id: 20, name: 'Gear Position Indicator' },
  { id: 21, name: 'Smart E- Shifter (for AMT)' },
  { id: 22, name: 'Rear Seat with Reclining Option' },
  { id: 23, name: 'Quick Gear Shifter' },
  { id: 24, name: 'Guide Me Home\' Headlamps' },
  { id: 25, name: 'Electrochromatic IRVM / Anti Glare IRVM' },
  { id: 26, name: 'Traction Control System' },
  { id: 27, name: 'Paddle shifters' },
  { id: 28, name: 'Rear centre armrest with cup holders' },
  { id: 29, name: 'Integrated Engine Kill Switch' },
  { id: 30, name: 'Air conditioning with electric temperature control' },
  { id: 31, name: 'Glovebox cooling' },
  { id: 32, name: 'Air Purifier' },
  { id: 33, name: 'Electric Sunroof' },
  { id: 34, name: 'Voice Assisted Sunroof' },
  { id: 35, name: 'Ventilated Seats' },
  { id: 36, name: 'Front console armrest with storage' },
  { id: 37, name: 'Rear Defogger' }
];

// Safety Features (Q7) - Complete list of 26 features from PDF
export const SAFETY_FEATURES = [
  { id: 1, name: 'Hill-assist' },
  { id: 2, name: 'Reverse Camera/Sensor for Park Assist' },
  { id: 3, name: 'First aid kit' },
  { id: 4, name: 'Immobilizer' },
  { id: 5, name: 'Anti-roll Bar' },
  { id: 6, name: 'Tyre pressure monitoring system (TPMS) highline' },
  { id: 7, name: 'Disc Brakes' },
  { id: 8, name: 'ADAS' },
  { id: 9, name: 'ABS (Dual-channel in case of 2W)' },
  { id: 10, name: 'Airbag' },
  { id: 11, name: 'Electronic Brakeforce Distribution (EBD)' },
  { id: 12, name: 'Electronic stability control (ESC)' },
  { id: 13, name: 'Seat belt pretensioners' },
  { id: 14, name: 'Height adjustable front seat belts' },
  { id: 15, name: '3 Point retractable seat belts (all seats)' },
  { id: 16, name: 'Seatbelt reminder' },
  { id: 17, name: 'Headlamp Levelling' },
  { id: 18, name: 'Automatic headlamps' },
  { id: 19, name: 'Anti-theft mechanism' },
  { id: 20, name: 'Emergency Brake Warning' },
  { id: 21, name: 'Brake Level Adjuster' },
  { id: 22, name: 'All in one Lock' },
  { id: 23, name: 'Crash & Fall Alert' },
  { id: 24, name: 'Speed Sensing Auto Door Lock' },
  { id: 25, name: 'ISOFIX' },
  { id: 26, name: 'Child Safety Lock' }
];

// ADAS Features (Q7f) - Level 1 and Level 2
export const ADAS_FEATURES_LEVEL1 = [
  { id: 1, name: 'Adaptive Cruise Control', code: 'ADAS_ACC' },
  { id: 2, name: 'Lane Departure Warning', code: 'ADAS_LDW' },
  { id: 3, name: 'Lane Keep Assist', code: 'ADAS_LKA' },
  { id: 4, name: 'Automatic Emergency Braking (AEB)', code: 'ADAS_AEB' }
];

export const ADAS_FEATURES_LEVEL2 = [
  { id: 1, name: 'Lane Centering Assist', code: 'ADAS_LCA' },
  { id: 2, name: 'Traffic Jam Assist', code: 'ADAS_Traffic_Jam' },
  { id: 3, name: 'Highway Assist (Semi-Autonomous Driving)', code: 'ADAS_Highway_Assist' },
  { id: 4, name: 'Blind Spot Detection', code: 'ADAS_Blind_Spot' },
  { id: 5, name: '360 Degree Camera', code: 'ADAS_360_Cam' },
  { id: 6, name: 'Rear Cross Traffic Assist', code: 'ADAS_Rear_Cross_Traffic' }
];

// Exterior Features (Q8d) - Section D: 15 features from PDF page 6
export const EXTERIOR_FEATURES = [
  { id: 1, name: 'LED Headlamps' },
  { id: 2, name: 'LED tail lamps' },
  { id: 3, name: 'LED DRL' },
  { id: 4, name: 'Front Body Graphics' },
  { id: 5, name: 'Rear Body Graphics' },
  { id: 6, name: 'Alloy Wheels' },
  { id: 7, name: 'Front / Rear Skid Plate' },
  { id: 8, name: 'Fog Lamps' },
  { id: 9, name: 'Front Wiper (multi-speed)' },
  { id: 10, name: 'Rope Hooks' },
  { id: 11, name: 'Cornering Lamp' },
  { id: 12, name: 'Dual tone roof' },
  { id: 13, name: 'Full Wheel Covers' },
  { id: 14, name: 'Shark Fin Antenna' },
  { id: 15, name: 'Rear Spoiler' }
];

// Interior Features (Q9e) - Section E: 21 features from PDF pages 7-8
export const INTERIOR_FEATURES = [
  { id: 1, name: 'Front Dome Lamp' },
  { id: 2, name: 'Sliding Driver Seat' },
  { id: 3, name: 'Sun Visor' },
  { id: 4, name: 'Floor Carpet' },
  { id: 5, name: 'Leather Upholstery' },
  { id: 6, name: 'Adj Front Headrest' },
  { id: 7, name: 'Power Windows' },
  { id: 8, name: 'Adj Rear Headrest' },
  { id: 9, name: 'Manual Height Driver Seat' },
  { id: 10, name: 'Leather Steering' },
  { id: 11, name: 'Dual Tone Interior' },
  { id: 12, name: 'Centre Room Lamp' },
  { id: 13, name: 'Luggage Room Lamp' },
  { id: 14, name: 'Footwell Illumination' },
  { id: 15, name: '60:40 Split Seat' },
  { id: 16, name: 'Driver Side Pocket' },
  { id: 17, name: 'Ambient Temperature Display' },
  { id: 18, name: 'Sliding Back Window' },
  { id: 19, name: 'Metal Inside Handles' },
  { id: 20, name: 'Leather Door Armrest' },
  { id: 21, name: 'Leather Gear Knob' }
];

// ICL (Instrument Cluster) Features (Q9f) - Section E continuation
export const ICL_FEATURES = [
  { id: 1, name: 'Speedometer', code: 'ICL_Speedo' },
  { id: 2, name: 'Tachometer', code: 'ICL_Tacho' },
  { id: 3, name: 'Fuel Gauge', code: 'ICL_Fuel' },
  { id: 4, name: 'Temperature Gauge', code: 'ICL_Temp' },
  { id: 5, name: 'Odometer', code: 'ICL_Odo' },
  { id: 6, name: 'Trip Meter', code: 'ICL_Trip' },
  { id: 7, name: 'Warning Lights (Eg.: Engine, ABS, Airbag)', code: 'ICL_Warning_Lights' },
  { id: 8, name: 'Digital Display (Eg.: Navigation, Settings)', code: 'ICL_Digital_Display' },
  { id: 9, name: 'Customizable Layouts', code: 'ICL_Custom_Layout' }
];

// Infotainment Features (Q10e) - Section F: 6 features from PDF page 9
export const INFOTAINMENT_FEATURES = [
  { id: 1, name: 'Digital TFT Cluster' },
  { id: 2, name: 'Steering Music & Call Control' },
  { id: 3, name: 'Touch Screen Infotainment System' },
  { id: 4, name: 'Speaker System' },
  { id: 5, name: 'Front & Rear Speakers' },
  { id: 6, name: 'Tweeters' }
];

// Connectivity Features (Q11e) - Section G: 13 features from PDF page 10
export const CONNECTIVITY_FEATURES = [
  { id: 1, name: 'Bluetooth Connectivity' },
  { id: 2, name: 'USB Connectivity' },
  { id: 3, name: 'Call & SMS Alerts' },
  { id: 4, name: 'Turn by Turn Navigation' },
  { id: 5, name: 'Android Auto' },
  { id: 6, name: 'Apple CarPlay' },
  { id: 7, name: 'Voice Recognition' },
  { id: 8, name: 'Steering Audio & Bluetooth Controls' },
  { id: 9, name: 'OTA Updates' },
  { id: 10, name: 'Onboard Voice Assistant' },
  { id: 11, name: 'Smart Watch Integration' },
  { id: 12, name: 'WiFi Connectivity' },
  { id: 13, name: 'Vehicle Live Tracking' }
];

// Performance Features (Q12e) - Section H: 6 features from PDF page 11
export const PERFORMANCE_FEATURES = [
  { id: 1, name: 'Hydraulic Clutch' },
  { id: 2, name: 'Turbocharger' },
  { id: 3, name: 'Power Take-Off' },
  { id: 4, name: 'HV Battery Warranty' },
  { id: 5, name: 'K-Series DualJet Engine' },
  { id: 6, name: 'TVS iGO Assist' }
];

// Availability Options
export const AVAILABILITY_OPTIONS = [
  { value: 'yes_base', label: 'Yes - Available in Base Variant' },
  { value: 'yes_mid', label: 'Yes - Available in Mid Variants' },
  { value: 'yes_top', label: 'Yes - Available in Top Variants' },
  { value: 'no', label: 'Not Available' },
  { value: 'dont_know', label: "Don't Know" }
];

// Demand Options
export const DEMAND_OPTIONS = [
  { value: 'very_high', label: 'Very High' },
  { value: 'high', label: 'High' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'low', label: 'Low' },
  { value: 'very_low', label: 'Very Low' }
];

// Importance Options
export const IMPORTANCE_OPTIONS = [
  { value: '5', label: 'Extremely Important' },
  { value: '4', label: 'Very Important' },
  { value: '3', label: 'Moderately Important' },
  { value: '2', label: 'Slightly Important' },
  { value: '1', label: 'Not Important at All' }
];

// Price Impact Options
export const PRICE_IMPACT_OPTIONS = [
  { value: 'yes_high', label: 'Yes - High Impact' },
  { value: 'yes_moderate', label: 'Yes - Moderate Impact' },
  { value: 'yes_low', label: 'Yes - Low Impact' },
  { value: 'no', label: 'No Impact' },
  { value: 'dont_know', label: "Don't Know" }
];
