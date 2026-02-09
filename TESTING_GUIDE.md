# 🧪 Testing Guide - Dealer Survey Form

## Hidden Test Feature

The form includes a **hidden keyboard shortcut** to fill all fields with test data. This allows you to test the complete form flow without manually entering 568+ fields.

### How to Use

1. **Open the survey form** on any device
2. **Press** `Ctrl + Shift + F` (Windows/Linux) or `Cmd + Shift + F` (Mac)
3. **See confirmation** - "✅ Test data filled!"
4. **Navigate** through all 9 steps using "Next" button
5. **Submit** the form on the final step
6. **Check Google Sheet** for the test data row

### What Gets Filled

The test data includes:
- ✅ Admin info (Dealer details, respondent info)
- ✅ All 37 Comfort features (Q6)
- ✅ All 26 Safety features (Q7)
- ✅ All 10 ADAS features (Q7f)
- ✅ All 15 Exterior features (Q8)
- ✅ All 21 Interior features (Q9)
- ✅ All 9 ICL features (Q9f)
- ✅ All 6 Infotainment features (Q10)
- ✅ All 13 Connectivity features (Q11)
- ✅ All 6 Performance features (Q12)
- ✅ Feedback fields (Q13, Q14)

### Testing Checklist

- [ ] **Connection Test**: Use Config panel to test Sheet & Drive connections
- [ ] **Fill Test Data**: Press Ctrl+Shift+F
- [ ] **Navigate**: Go through all 9 steps
- [ ] **Validation**: Try clicking "Next" without required fields (should block)
- [ ] **Submit**: Complete the form
- [ ] **Verify Sheet**: Check all columns have data
  - Serial Number
  - Timestamp
  - Admin fields (Q1-Q5)
  - **Feature data (Q6-Q12)** ← Most important!
  - ADAS codes (ADAS_ACC, etc.)
  - ICL codes (ICL_Speedo, etc.)
  - Feedback (Q13_Missing_1, Q14_Other_1, etc.)

## Why This Approach?

✅ **No visible button** - Regular users won't see test functionality  
✅ **Easy to use** - Simple keyboard shortcut for testers  
✅ **Production safe** - Doesn't affect regular form behavior  
✅ **Complete testing** - Tests all 568+ fields in seconds  

## Troubleshooting

### "No data in sheets after Q5"
1. Check browser console (F12) for errors
2. Verify Google Apps Script is updated and redeployed
3. Check Apps Script execution logs for mapping issues

### "Test data doesn't fill"
1. Make sure you're pressing Ctrl+Shift+F (not other combinations)
2. Try refreshing the page
3. Check browser console for JavaScript errors

### "Some fields are empty in sheet"
1. Open Apps Script Executions log
2. Look for the "RECEIVED DATA KEYS" log
3. Compare with "HEADER MAPPINGS" log
4. Field names must match exactly

## Production Deployment

**Before deploying to production:**

1. ✅ Test locally with Ctrl+Shift+T
2. ✅ Verify data appears correctly in Google Sheets
3. ✅ Update Google Apps Script (copy entire google-apps-script.js)
4. ✅ Redeploy Apps Script as new version
5. ✅ Build: `npm run build`
6. ✅ Deploy: `vercel --prod` or push to GitHub

**The test shortcut remains available in production for troubleshooting!**

---

💡 **Tip**: Press `Ctrl+Shift+F` to fill test data instantly. Keep this guide handy for testing after any form updates.
