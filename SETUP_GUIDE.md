# Dealer Survey Application - Setup Guide for Client

## 📋 Overview
This is a professional market research survey platform built for Genius Research. It allows field researchers to collect dealer survey data that automatically syncs to your Google Sheets.

## 🚀 Quick Start (For Non-Technical Users)

### Step 1: Set Up Your Google Sheet

1. **Create a New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Blank" to create a new spreadsheet
   - Name it: "Dealer Survey Responses 2026"

2. **Set Up the Apps Script**
   - In your Google Sheet, click **Extensions → Apps Script**
   - Delete any existing code in the editor
   - Copy the **ENTIRE CODE** from the file `google-apps-script.js` (in this folder)
   - Paste it into the Apps Script editor
   - Click the **Save** icon (💾)

3. **Deploy as Web App**
   - Click **Deploy → New deployment**
   - Click the gear icon (⚙️) next to "Select type"
   - Choose **Web app**
   - Fill in the settings:
     - **Description**: "Dealer Survey API"
     - **Execute as**: **Me** (your email)
     - **Who has access**: **Anyone**
   - Click **Deploy**
   - **Authorize the script** (Google will ask for permissions - this is normal!)
     - Click "Review Permissions"
     - Choose your Google account
     - Click "Advanced" → "Go to [Project Name] (unsafe)"
     - Click "Allow"
   - **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 2: Configure the Survey Application

1. **Open the Survey Application**
   - Open `index.html` in your web browser
   - OR run `npm run dev` if you have Node.js installed

2. **Click the Settings (⚙️) Icon** in the top-right corner

3. **Paste Your Web App URL**
   - Paste the URL you copied from Step 1
   - The sheet name can be left as "Dealer Survey Data" (or customize it)

4. **Click "Test Connection"**
   - The system will verify the connection to your Google Sheet
   - You should see: "Connection successful!"

5. **Click "Save Configuration"**

### Step 3: Start Using the Survey

✅ You're all set! The survey is now ready to use.

- Researchers can fill out surveys offline
- Data syncs automatically when online
- All responses appear in your Google Sheet
- Progress is auto-saved every 30 seconds

---

## 📊 Understanding Your Data

### Google Sheet Structure

Your Google Sheet will have these columns:

**Dealer Profile:**
- S1.1_DealerName
- S1.2_DealershipName
- Q1A_City
- Q1B_Contact
- Q2_OEM
- Q3_Model
- Q4_Experience
- Q5_Confidence

**Feature Sections:**
Each feature (e.g., Automatic Climate Control) has 5 columns:
- Q6_C1_Availability (Comfort Feature 1)
- Q6_C1_Demand
- Q6_C1_Importance
- Q6_C1_PriceImpact
- Q6_C1_Premium

**Open-Ended:**
- Q13_TopFeatures
- Q14_MissingFeatures
- AdditionalComments

**Metadata:**
- submittedAt (timestamp)
- submittedDate
- submittedTime

---

## 🔧 Troubleshooting

### "Connection failed" error
- ✅ Make sure you copied the ENTIRE Apps Script code
- ✅ Verify the Web App is deployed with "Who has access: Anyone"
- ✅ Check that you authorized the script
- ✅ Try deploying a new version: Deploy → Manage deployments → New deployment

### Data not appearing in Google Sheet
- ✅ Check that the sheet name matches (default: "Dealer Survey Data")
- ✅ The sheet tab will be created automatically on first submission
- ✅ Open the Apps Script logs to see any errors: Apps Script → Executions

### "Cannot read property" errors
- ✅ Re-deploy the web app
- ✅ Clear your browser cache and cookies
- ✅ Make sure you're using the latest deployment URL

---

## 📱 Mobile Usage

This application is **fully mobile-responsive**:
- ✅ Works on tablets and smartphones
- ✅ Horizontal scrolling for feature tables
- ✅ Touch-friendly buttons and inputs
- ✅ Offline support with LocalStorage

---

## 🔒 Data Privacy & Security

- All data is stored in YOUR Google Sheet
- No third-party servers involved
- Google's security protects your data
- Only you have access to the spreadsheet

---

## 💡 Tips for Best Results

1. **Train Your Researchers:**
   - Show them how to use the progress bar
   - Explain the auto-save feature
   - Demonstrate offline capability

2. **Regular Backups:**
   - Download your Google Sheet as Excel weekly
   - Keep backups in case of accidental deletion

3. **Monitor Responses:**
   - Check the Google Sheet daily
   - Look for incomplete or unusual responses
   - Follow up with researchers if needed

4. **Offline Work:**
   - Researchers can work without internet
   - Data queues automatically
   - Syncs when connection returns

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide first
2. Review the troubleshooting section
3. Contact your technical support team

---

## ✨ Features Summary

✅ **Easy Configuration** - No coding required
✅ **Offline Support** - Works without internet
✅ **Auto-Save** - Never lose progress
✅ **Mobile-Friendly** - Use on any device
✅ **Real-Time Sync** - Data appears instantly in Google Sheets
✅ **Progress Tracking** - Visual progress bar
✅ **Validation** - Ensures data quality
✅ **Professional Design** - Clean, branded interface

---

**Built with ❤️ for Genius Research**
Version 1.0 | February 2026
