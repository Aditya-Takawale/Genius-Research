# Dealer Survey Application

A professional, mobile-responsive market research survey platform built with React.js for Genius Research.

## Features

✅ **Multi-Step Form Wizard** - 9-step survey with progress tracking
✅ **Offline Support** - LocalStorage auto-save every 30 seconds
✅ **Google Sheets Integration** - Direct data submission to your spreadsheet
✅ **Mobile Responsive** - Works perfectly on tablets and smartphones
✅ **Easy Configuration** - Simple UI for non-technical users to connect Google Sheets
✅ **Termination Logic** - Automatic screening based on Q5 response
✅ **Complex Feature Grids** - Comprehensive evaluation tables for all features
✅ **Field Validation** - Ensures data quality with built-in validation
✅ **Professional Design** - Clean, white-label interface with Tailwind CSS

## Quick Start

### For Developers

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

### For End Users (Non-Technical)

Please see [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup instructions.

## Project Structure

```
dealer-survey-app/
├── src/
│   ├── components/
│   │   ├── ConfigPanel.jsx          # Google Sheets configuration
│   │   ├── ProgressBar.jsx          # Multi-step progress indicator
│   │   ├── SurveyForm.jsx           # Main form orchestrator
│   │   ├── FeatureGrid.jsx          # Reusable feature table
│   │   ├── TerminationScreen.jsx    # Termination flow
│   │   ├── SuccessScreen.jsx        # Completion screen
│   │   └── steps/
│   │       ├── Step1_DealerProfile.jsx
│   │       ├── Step2_Comfort.jsx
│   │       ├── Step3_Safety.jsx
│   │       ├── Step4_Exterior.jsx
│   │       ├── Step5_Interior.jsx
│   │       ├── Step6_Infotainment.jsx
│   │       ├── Step7_Connectivity.jsx
│   │       ├── Step8_Performance.jsx
│   │       └── Step9_Feedback.jsx
│   ├── utils/
│   │   ├── constants.js             # Survey data constants
│   │   ├── storage.js               # LocalStorage utilities
│   │   └── sheetService.js          # Google Sheets API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── google-apps-script.js            # Copy this to Google Apps Script
├── SETUP_GUIDE.md                   # User-friendly setup guide
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Tech Stack

- **Frontend:** React.js 18
- **Form Management:** React Hook Form
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Backend:** Google Apps Script (Serverless)
- **Data Storage:** Google Sheets

## Configuration

### Step 1: Google Sheets Setup

1. Create a Google Sheet
2. Go to **Extensions → Apps Script**
3. Copy code from `google-apps-script.js`
4. Deploy as Web App
5. Copy the Web App URL

### Step 2: Application Configuration

1. Open the application
2. Click the Settings icon (⚙️)
3. Paste your Web App URL
4. Test connection
5. Save configuration

## Survey Structure

### Step 1: Dealer Profile (S1.1 - Q5)
- Dealer and dealership information
- City, contact, OEM, model selection
- Experience and confidence screening
- **Termination logic** if Q5 ≠ "Yes"

### Steps 2-8: Feature Evaluation
Each section evaluates features across 5 dimensions:
- **(a) Availability** - Which variants have this feature
- **(b) Customer Demand** - How often customers ask for it
- **(c) Importance** - How important to buyers (1-5 scale)
- **(d) Price Impact** - Does it affect pricing
- **(e) Premium** - Approximate price premium in ₹

**Feature Categories:**
- Q6: Comfort (12 features)
- Q7: Safety (14 features)
- Q8: Exterior (10 features)
- Q9: Interior (10 features)
- Q10: Infotainment (10 features)
- Q11: Connectivity (10 features)
- Q12: Performance (10 features)

### Step 9: Open-Ended Feedback
- Q13: Top 3 most requested features
- Q14: Missing features / complaints
- Additional comments (optional)

## Data Mapping

All form inputs map to specific column headers in Google Sheets:
- Profile: `S1_1_DealerName`, `Q1A_City`, etc.
- Features: `Q6_C1_Availability`, `Q6_C1_Demand`, etc.
- Feedback: `Q13_TopFeatures`, `Q14_MissingFeatures`

## Offline Functionality

The application automatically:
- Saves draft every 30 seconds to LocalStorage
- Recovers unsaved data on page reload
- Queues submissions when offline
- Syncs automatically when connection returns

## Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2026 Genius Research. All rights reserved.

## Support

For technical support or questions:
- Review the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Check the troubleshooting section
- Contact your development team

---

**Built with ❤️ for Genius Research**
Version 1.0 | February 2026
