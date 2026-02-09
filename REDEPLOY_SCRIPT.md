# 🔧 Update Google Apps Script - CRITICAL FIX

## ⚠️ WHY YOU NEED TO DO THIS
The Google Apps Script mapping was fixed to correctly save all form data (ADAS, ICL, and feedback fields). You must update and redeploy it.

## 📋 STEP-BY-STEP INSTRUCTIONS

### Step 1: Open Your Google Sheet
1. Go to your Google Sheet where survey data is stored
2. Click **Extensions** → **Apps Script**

### Step 2: Update the Code
1. In the Apps Script editor, **DELETE ALL existing code**
2. Open the file `google-apps-script.js` from this project
3. **Copy the ENTIRE contents** (all 655 lines)
4. **Paste it** into the Apps Script editor
5. Click **Save** (💾 icon or Ctrl+S)

### Step 3: Redeploy the Web App
1. Click **Deploy** → **Manage deployments**
2. Click the **Edit** icon (✏️) next to your existing deployment
3. Under "Version", click **New version**
4. Add description: "Fixed ADAS/ICL/Feedback mapping"
5. Click **Deploy**
6. Click **Done**

### Step 4: Test the Connection
1. Go back to your survey form
2. Click the **⚙️ Config** button
3. Click **Test Sheet Connection** - should see ✅ Success
4. Click **Test Drive Connection** - should see ✅ Success

### Step 5: Test with Data
1. Click **"Fill Test Data"** button on the first step
2. Navigate through all steps (Next, Next, Next...)
3. On the last step, click **Submit Survey**
4. Check your Google Sheet - ALL columns should now have data

## ✅ VERIFICATION
After redeployment, check that your sheet has:
- ✅ Admin data (Q1A_City, Q1B_OEM, etc.)
- ✅ Feature data (Q6a_Available_1, Q6c_Importance_1, etc.)
- ✅ **ADAS data (ADAS_ACC, ADAS_LDW, etc.)** ← This was the bug!
- ✅ **ICL data (ICL_Speedo, ICL_Tacho, etc.)** ← This was the bug!
- ✅ **Feedback data (Q13_Missing_1, Q14_Other_1, etc.)** ← This was the bug!

## 🚨 CRITICAL NOTES
- **You MUST redeploy** for changes to take effect
- Old deployments will NOT automatically update
- The web app URL remains the same (no need to update the form)
- Previous submissions before this fix may have incomplete data

## 📞 IF YOU STILL SEE ISSUES
1. Clear browser cache and reload the form
2. Try filling and submitting test data again
3. Check browser console for errors (F12 → Console tab)
4. Verify the deployment timestamp is today
