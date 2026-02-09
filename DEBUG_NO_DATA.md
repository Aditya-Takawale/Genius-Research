# 🔍 Debug Guide - No Data After Q5

## Step 1: Update Google Apps Script with Debug Logging

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. **Copy the ENTIRE contents** of `google-apps-script.js` from this project
4. **Paste and replace** all code in the Apps Script editor
5. Click **Save** (💾)

## Step 2: Redeploy (CRITICAL!)

1. Click **Deploy → Manage deployments**
2. Click **Edit** icon (✏️)
3. Select **New version**
4. Description: "Debug logging added"
5. Click **Deploy**
6. Click **Done**

## Step 3: Test with Debug Data

1. Open your survey form in the browser
2. Press **F12** to open Developer Tools
3. Click the **Console** tab
4. Click **"Fill Test Data"** button on Step 1
5. Navigate through all steps (Next → Next → Next...)
6. On the final step, click **Submit Survey**

## Step 4: Check Browser Console

In the browser console (F12), you should see:
```
=== SUBMITTING SURVEY DATA ===
Total fields: [some number like 300+]
Admin fields: [should be around 16]
Feature fields: [should be around 250+]
Sample feature fields: ["Q6a_Available_1", "Q6a_Available_2", ...]
Full data: {huge object with all fields}
```

**❌ If "Feature fields: 0"** - The form is NOT collecting the data. This is a frontend issue.
**✅ If "Feature fields: 250+"** - The form IS collecting the data. Check next step.

## Step 5: Check Google Apps Script Logs

1. Go back to Apps Script editor
2. Click **Executions** icon (⏱️) on the left sidebar
3. Find the most recent execution
4. Click on it to see logs

You should see:
```
=== RECEIVED DATA KEYS ===
Total keys: [number]
Sample keys: Q1A_City, Q1B_OEM, S1_1_DealerName, Q6a_Available_1, ...

=== HEADER MAPPINGS (first 20) ===
Header: "Serial Number" → Field: "serialNumber" → Value: "1"
Header: "Q6a.1 Drive mode..." → Field: "Q6a_Available_1" → Value: "1"
Header: "Q6b.1 Drive mode..." → Field: "CHECKBOX_Q6b_MostPreferred_1" → Value: "2"
...
```

## 🔎 What to Look For

### If Browser Console Shows Feature Fields = 0:
**Problem:** React form not registering fields
**Solution:** Check if `register()` is being called in Step2-Step9 components

### If Apps Script Logs Show "Total keys: 16" (only admin):
**Problem:** Data not being sent to Google Sheets
**Solution:** Check `submitToGoogleSheets()` function in sheetService.js

### If Apps Script Logs Show All Keys BUT Values Are Empty:
**Problem:** Header-to-field mapping is incorrect
**Solution:** Check the `getFormFieldName()` function in google-apps-script.js

### If Header Mappings Show Field: "null":
**Problem:** Header format doesn't match expected pattern
**Solution:** Check header generation in `generateFeatureHeaders()`

## 📸 Screenshot What You See

After completing the test, screenshot:
1. Browser console output (the "SUBMITTING SURVEY DATA" section)
2. Apps Script logs (the "RECEIVED DATA KEYS" section)
3. The actual Google Sheet (row with data)

This will help identify exactly where the data is being lost.
