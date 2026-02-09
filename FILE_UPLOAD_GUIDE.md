# File Upload Feature Guide

## Overview
The Dealer Survey now supports uploading files to Google Drive:
- **Filled Forms**: Upload photos/images of actual filled paper forms
- **Brochures**: Upload PDF brochures

## Features

### Supported File Types
- **Images**: JPG, JPEG, PNG, HEIC, HEIF, WebP, GIF, BMP, TIFF (for filled forms)
  - ✅ **iPhone HEIC format fully supported**
  - ✅ **Android JPG/PNG formats supported**
- **PDFs**: PDF documents (for brochures)

| Format | Type | Supported | Common Device |
|--------|------|-----------|---------------|
| JPG/JPEG | Image | ✅ Yes | All devices |
| PNG | Image | ✅ Yes | All devices |
| HEIC/HEIF | Image | ✅ Yes | iPhone (iOS 11+) |
| WebP | Image | ✅ Yes | Modern phones |
| GIF | Image | ✅ Yes | All devices |
| BMP | Image | ✅ Yes | Windows devices |
| TIFF | Image | ✅ Yes | Professional cameras |
| PDF | Document | ✅ Yes | All devices |

### File Size Limits
- Maximum file size: **10MB per file**
- Multiple files can be uploaded in each category

### Storage Structure
Files are automatically organized in Google Drive:
```
Dealer Survey Files/
├── GR-{timestamp}-{id}_2026-02-09/
    ├── Filled_Forms/
    │   ├── form_photo_1.jpg
    │   └── form_photo_2.jpg
    └── Brochures/
        ├── brochure_1.pdf
        └── brochure_2.pdf
```

## Setup Instructions

### 1. Create Google Drive Folder
1. Open [Google Drive](https://drive.google.com)
2. Create a new folder (e.g., "Dealer Survey Files")
3. Open the folder
4. Copy the **Folder ID** from the URL:
   - URL: `https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz123456789`
   - **Folder ID**: `1AbCdEfGhIjKlMnOpQrStUvWxYz123456789`
5. **Share the folder** (recommended):
   - Right-click folder → Share → Anyone with the link → Viewer

### 2. Google Apps Script Permissions
The Apps Script needs Drive permissions. When you deploy:
- The script will automatically create subfolders inside your specified folder
- First time deployment will ask for Drive access - click "Allow"

### 3. Update Google Apps Script
1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Copy the updated code from `google-apps-script.js`
4. **Delete all existing code** and paste the new version
5. Click **Save** (or Ctrl+S)
6. Deploy:
   - Click **Deploy → Manage deployments**
   - Click **Edit** (pencil icon) on existing deployment
   - Update version: **New version**
   - Click **Deploy**
7. Authorize any new permissions if prompted

### 4. Configure in Survey App
1. Open the survey application
2. Click the **Settings** (gear) icon
3. Enter:
   - **Google Sheets Web App URL**: Your Apps Script deployment URL
   - **Sheet Name**: The name for the data sheet (default: "Dealer Survey Data")
   - **Google Drive Folder ID**: The folder ID you copied in Step 1
4. Click **Test Connection**
5. Click **Save Configuration**

### 5. Test the Feature
1. Complete a survey form
2. In Step 9 (Feedback), upload test files
3. Submit the survey
4. Check your Google Drive folder - you should see the survey files

## How It Works

### User Experience
1. User fills out the survey (Steps 1-8)
2. In **Step 9 (Feedback section)**:
   - Two file upload sections appear
   - User clicks "Choose Files" to select images or PDFs
   - Selected files appear in a list with file names and sizes
   - User can remove files before submission
3. On survey submission:
   - Files are converted to base64 and sent to Google Apps Script
   - Script saves files to Google Drive
   - File URLs are stored in the spreadsheet

### Data Storage

#### In Google Sheets
Each survey row contains:
- `Serial Number`: Unique identifier (e.g., GR-1707523456789-X4K9P7M2Q)
- `filledForms_URLs`: URLs to uploaded form images (one per line)
- `brochures_URLs`: URLs to uploaded PDF brochures (one per line)

#### In Google Drive
- Files are organized in the folder you specify via Folder ID
- Each survey has its own subfolder (using Serial Number)
- Each file is set to "Anyone with link can view"
- URLs in the spreadsheet are clickable links to the files

#### Folder Structure:
```
Your Google Drive Folder (Folder ID)/
├── GR-xxxxx_2026-02-09/      ← One folder per survey
│   ├── Filled_Forms/
│   │   ├── form_photo_1.jpg
│   │   └── form_photo_2.heic
│   └── Brochures/
│       └── brochure.pdf
└── GR-xxxxx_2026-02-10/
    ├── Filled_Forms/
    └── Brochures/
```

## Technical Details

### File Upload Process
```
1. User selects files → Frontend validates type/size
2. Files converted to base64 → Included in submission data
3. Apps Script receives data → Creates Drive folder structure
4. Files uploaded to Drive → URLs generated
5. URLs stored in spreadsheet → Survey row completed
```

### Validation Rules
- **File Type**: 
  - Filled Forms: JPG, JPEG, PNG, HEIC, HEIF, WebP, GIF, BMP, TIFF
  - Brochures: PDF only
- **File Size**: Maximum 10MB per file
- **Multiple Files**: Supported for both categories

### iPhone HEIC Support
- ✅ **HEIC/HEIF formats are fully supported**
- iPhone photos taken since iOS 11 use HEIC format by default
- The system accepts and stores HEIC files natively
- Files are stored in Google Drive in their original format
- **Note**: HEIC files are uploaded and stored as-is. Google Drive can preview them natively.

### Error Handling
- Invalid file types are rejected with user-friendly alerts
- Large files (>10MB) are rejected before upload
- If Drive upload fails, survey still submits (URLs will be empty)
- Errors are logged in Apps Script execution logs

## Troubleshooting

### Files not uploading?
1. Check file size (must be ≤10MB)
2. Verify file type (images for forms, PDFs for brochures)
3. Ensure Google Drive has sufficient storage
4. Check Apps Script execution logs for errors

### URLs not appearing in spreadsheet?
1. Verify Apps Script is updated with latest code
2. Check that script has Drive permissions
3. Look for errors in **Extensions → Apps Script → Executions**

### Can't see files in Drive?
1. Check the "Dealer Survey Files" folder in your Google Drive
2. Verify the folder exists and contains subfolders with survey serial numbers
3. Ensure file sharing is set to "Anyone with link"

### iPhone HEIC files not uploading?
1. **HEIC is supported** - Files should upload normally
2. If issues persist, you can convert to JPG on iPhone:
   - Settings → Camera → Formats → Choose "Most Compatible"
3. Or convert HEIC to JPG using free online converters
4. Google Drive natively supports viewing HEIC files

## Maintenance

### Monitoring Storage
- Regularly check Google Drive storage usage
- Large surveys with many images can consume significant space
- Consider archiving old survey folders if needed

### Accessing Files
- Open Google Sheets → Click on a file URL to view/download
- Or navigate directly to "Dealer Survey Files" folder in Google Drive
- Each survey has its own subfolder for easy organization

## Security & Privacy

### File Access
- Files are set to "Anyone with link can view"
- URLs are shareable but not publicly listed
- Only people with the spreadsheet can see the URLs

### Best Practices
- Don't share file URLs publicly
- Limit spreadsheet access to authorized personnel
- Consider changing Drive folder permissions for sensitive data
- Regularly audit file access if needed

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Apps Script execution logs
3. Verify all setup steps were completed
4. Test with a small file first

---

**Last Updated**: February 9, 2026  
**Version**: 1.0.0
