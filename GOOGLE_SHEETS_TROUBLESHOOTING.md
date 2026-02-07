# 🔧 Google Sheets Connection - Troubleshooting Guide

## ❌ Error: "Request failed with status code 405"

This error means **"Method Not Allowed"** - your Google Apps Script is either:
- Not deployed as a Web App
- Using the wrong URL
- Deployed with incorrect settings

---

## ✅ COMPLETE FIX - Step by Step

### Step 1: Open Your Google Sheet
1. Go to your Google Sheet for the survey
2. Click **Extensions → Apps Script**

### Step 2: Copy and Paste the Script
1. **DELETE** all existing code in the Apps Script editor
2. Open `google-apps-script.js` from this project
3. **Copy the ENTIRE script** (all 200 lines)
4. **Paste** it into the Apps Script editor
5. Click **💾 Save** (or Ctrl+S)
6. Name the project: `Dealer Survey API`

### Step 3: Deploy as Web App (CRITICAL!)
1. Click **🚀 Deploy** button (top right)
2. Select **New deployment**
3. Click the ⚙️ gear icon next to "Select type"
4. Choose **Web app**

### Step 4: Configure Deployment Settings
**IMPORTANT - These settings must be EXACT:**

```
Description: Dealer Survey API v1
Execute as: ME (your email@gmail.com)
Who has access: ANYONE
```

**⚠️ Common Mistakes:**
- ❌ "Execute as: User accessing the web app" → WRONG!
- ✅ "Execute as: Me" → CORRECT!
- ❌ "Who has access: Only myself" → WRONG!
- ✅ "Who has access: Anyone" → CORRECT!

### Step 5: Authorize the Script
1. Click **Deploy**
2. You'll see "Authorization required"
3. Click **Authorize access**
4. Choose your Google account
5. Click **Advanced** (if you see a warning)
6. Click **Go to Dealer Survey API (unsafe)**
7. Click **Allow**

### Step 6: Copy the Web App URL
1. After deployment, you'll see a **Web app URL**
2. It looks like this:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxx/exec
   ```
3. **COPY THIS ENTIRE URL** (ends with `/exec`)

### Step 7: Paste URL in Survey App
1. Open the survey app (localhost:3000)
2. Click the ⚙️ Settings icon (top right)
3. Paste the Web App URL
4. Click **Test Connection**
5. You should see ✅ "Connection successful!"

---

## 🚨 Common Issues & Fixes

### Issue 1: Still getting 405 error
**Problem:** You copied the wrong URL
**Fix:** 
- ❌ Don't use: `https://script.google.com/home/projects/.../edit`
- ✅ Use: `https://script.google.com/macros/s/.../exec`
- The correct URL ends with `/exec`

### Issue 2: "Authorization required"
**Fix:** Go back to Step 5 and complete authorization

### Issue 3: "The script has an error"
**Fix:** 
1. Make sure you copied the ENTIRE script (all 200 lines)
2. Check for any copy-paste errors
3. The script should start with:
   ```javascript
   function doPost(e) {
   ```

### Issue 4: "Connection timeout"
**Fix:**
1. Check your internet connection
2. Make sure the Apps Script is saved and deployed
3. Try deploying a new version:
   - Click **Deploy → Manage deployments**
   - Click **✏️ Edit** on the existing deployment
   - Click **Deploy** again

---

## 📋 Quick Checklist

Before testing connection, verify:
- [ ] Script is pasted completely (all 200 lines)
- [ ] Script is saved (💾 icon)
- [ ] Deployed as **Web app**
- [ ] Execute as: **Me**
- [ ] Who has access: **Anyone**
- [ ] Authorization completed
- [ ] URL ends with `/exec`
- [ ] URL pasted in survey settings

---

## 🎯 Testing the Connection

### In the Survey App:
1. Open Configuration (⚙️ icon)
2. Paste your Web App URL
3. Click **Test Connection**

### Expected Success Response:
```
✅ Connection successful! Your Google Sheet is ready to receive data.
```

### If You See an Error:
- **405 error** → Wrong URL or not deployed correctly
- **401 error** → Authorization issue
- **403 error** → Access permissions issue
- **Timeout** → Internet connection or script not running

---

## 🔍 How to Find the Correct URL

### From Apps Script Editor:
1. Click **Deploy → Manage deployments**
2. Look for "Active deployments"
3. Copy the **Web app** URL (not "Test deployments")

### URL Format:
```
Correct:   https://script.google.com/macros/s/AKfycbxxxxx/exec
Wrong:     https://script.google.com/home/projects/xxxxx/edit
Wrong:     https://script.google.com/d/xxxxx/edit
```

---

## 📞 Still Need Help?

### Verify Your Apps Script:
1. Go to Apps Script editor
2. Run **doGet** function manually:
   - Select `doGet` from dropdown
   - Click **Run** (▶️)
   - Check "Execution log" for errors

### Test the URL Directly:
1. Open your Web App URL in a new browser tab
2. You should see: "Dealer Survey API is running. Use POST requests to submit data."
3. If you see an error page → deployment issue

---

## ✨ Success!

Once you see **"Connection successful!"** in green, you're all set! 

Your survey data will now be automatically saved to Google Sheets.

---

**Last Updated:** February 7, 2026
**For:** Genius Research - Dealer Survey Application
