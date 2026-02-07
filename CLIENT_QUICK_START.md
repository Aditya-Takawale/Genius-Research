# 🎯 CLIENT QUICK START GUIDE

## For Your Non-Technical Client

Hi! This is a super simple guide to get your survey application working. No coding knowledge needed!

---

## ✅ What You Need
1. A Google account
2. 10 minutes of time
3. This folder with all the files

---

## 📝 Step-by-Step Instructions

### STEP 1: Create Your Google Sheet (2 minutes)

1. Go to https://sheets.google.com
2. Click **"Blank"** to create a new spreadsheet
3. At the top, name it: **"Dealer Survey 2026"**
4. Keep this tab open!

---

### STEP 2: Add the Magic Code (3 minutes)

1. In your Google Sheet, click **Extensions** (at the top menu)
2. Click **Apps Script**
3. You'll see a code editor with some text
4. **DELETE everything** in that editor
5. Open the file **"google-apps-script.js"** from this folder
6. **Copy ALL the code** (Ctrl+A, then Ctrl+C)
7. **Paste it** into the Google Apps Script editor (Ctrl+V)
8. Click the **Save icon** (💾) at the top
9. You can close this Apps Script tab

---

### STEP 3: Make It Live (3 minutes)

1. In the Apps Script tab (if you closed it, go back: Extensions → Apps Script)
2. Click **Deploy** button (top right)
3. Select **New deployment**
4. Click the gear icon ⚙️ next to "Select type"
5. Choose **Web app**
6. Fill these settings:
   - **Description**: Type "Survey API"
   - **Execute as**: Choose **"Me"**
   - **Who has access**: Choose **"Anyone"**
7. Click the blue **Deploy** button

8. **IMPORTANT:** Google will show a security warning. This is normal!
   - Click **"Review Permissions"**
   - Choose your Google account
   - Click **"Advanced"**
   - Click **"Go to [Your Project] (unsafe)"**
   - Click **"Allow"**

9. You'll see a URL that looks like: `https://script.google.com/macros/s/ABC123...`
10. **COPY THIS ENTIRE URL** (you'll need it in the next step!)

---

### STEP 4: Connect the Survey App (2 minutes)

1. Open the **index.html** file from this folder (double-click it)
2. The survey application will open in your browser
3. Click the **Settings icon (⚙️)** in the top right
4. **Paste your URL** from Step 3 into the "Google Sheets Web App URL" box
5. Click **"Test Connection"** 
   - You should see: ✅ "Connection successful!"
6. Click **"Save Configuration"**

---

## 🎉 That's It - You're Done!

Your survey is now ready to use! 

### How to Use It:
1. Open **index.html** anytime to start a survey
2. Fill out the form
3. Click "Submit Survey"
4. Check your Google Sheet - the data is there!

### Where Does Data Go?
- Open your Google Sheet
- You'll see a new tab called **"Dealer Survey Data"**
- All survey responses appear here automatically

---

## 💡 Pro Tips

✅ **Bookmark the index.html** - so you can find it easily
✅ **Share the folder** - copy this folder to all researchers' computers
✅ **Backup your sheet** - Download it as Excel once a week
✅ **Mobile friendly** - Works on tablets and phones too!

---

## ❓ Having Issues?

### "Connection failed"
- Make sure you completed ALL of Step 3
- Check that you chose "Anyone" for "Who has access"
- Try creating a NEW deployment (Step 3 again)

### "Nothing appears in my sheet"
- Make sure the sheet name matches (default is "Dealer Survey Data")
- Check if there's a new tab in your Google Sheet
- Look at the timestamp - data appears with current date/time

### "Authorization required"
- This is normal the FIRST time
- Just follow the security warning steps in Step 3, #8

---

## 📞 Need More Help?

1. Read the detailed **SETUP_GUIDE.md** file
2. Ask your technical team
3. Watch for error messages - they tell you what's wrong!

---

**Remember:** You only need to do Steps 1-4 ONCE. After that, just open index.html and start collecting data!

**Built for Genius Research • February 2026**
