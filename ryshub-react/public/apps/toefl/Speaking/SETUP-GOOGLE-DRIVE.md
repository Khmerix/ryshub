# TOEFL Speaking - Google Drive Setup Guide

This guide explains how to set up automatic upload of speaking recordings to Google Drive.

## What You Need

1. A Google account (Gmail)
2. 5 minutes to set up

---

## Step-by-Step Setup

### **Step 1: Create Google Apps Script**

1. Go to https://script.google.com
2. Sign in with your Google account
3. Click **"New Project"**
4. Delete all the default code in the editor
5. Copy and paste this code:

```javascript
// Google Apps Script for TOEFL Speaking Audio Upload
function doPost(e) {
  try {
    // Get the uploaded file data
    var data = Utilities.base64Decode(e.parameters.data);
    var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
    
    // Get or create the main folder
    var folderName = "TOEFL Speaking Recordings";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Create subfolder for today's date
    var dateFolderName = new Date().toISOString().split('T')[0];
    var subFolders = folder.getFoldersByName(dateFolderName);
    var dateFolder;
    
    if (subFolders.hasNext()) {
      dateFolder = subFolders.next();
    } else {
      dateFolder = folder.createFolder(dateFolderName);
    }
    
    // Save the file
    var file = dateFolder.createFile(blob);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'fileId': file.getId(),
      'fileUrl': file.getUrl()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("TOEFL Speaking Upload Service is running!");
}
```

### **Step 2: Save the Project**

1. Click the disk icon (💾) or press Ctrl+S
2. Name it: "TOEFL Speaking Upload"

### **Step 3: Deploy as Web App**

1. Click **"Deploy"** in the top right
2. Select **"New deployment"**
3. Click the gear icon (⚙️) next to "Type"
4. Select **"Web app"**
5. Fill in:
   - **Description:** TOEFL Speaking Upload
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Click **"Deploy"**
7. Click **"Authorize access"**
8. Review the permissions and click **"Allow"**

### **Step 4: Get Your URL**

1. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/XXXXXXXX/exec`)
2. This is your upload endpoint

### **Step 5: Configure the Speaking Test**

1. Open `toeflspeaking-with-drive.html` in a browser
2. You'll see a settings modal
3. Paste your Google Apps Script URL
4. Click **"Save Configuration"**
5. Enter student name when prompted
6. Start the test!

---

## How It Works

1. Student clicks "Record Response"
2. Browser records audio using microphone
3. Student clicks "Stop Recording"
4. Audio automatically uploads to Google Drive
5. Files are organized in folders by date:
   ```
   My Drive/
   └── TOEFL Speaking Recordings/
       └── 2025-01-07/
           ├── JohnSmith_Q1_2025-01-07.wav
           ├── JohnSmith_Q2_2025-01-07.wav
           └── ...
   ```

---

## Troubleshooting

### "Upload Failed" Error
- Check internet connection
- Verify the Google Script URL is correct
- Check browser console for errors (F12 → Console)

### "Could not access microphone"
- Make sure you're using HTTPS or localhost
- Allow microphone permission when browser asks
- Check browser settings for microphone access

### Files not appearing in Drive
- Check the "TOEFL Speaking Recordings" folder in Google Drive
- Look in the date-stamped subfolder
- Check the Google Apps Script execution log (View → Executions)

---

## Security Notes

- The Google Apps Script URL is like a password - keep it private
- Anyone with the URL can upload files to your Drive
- Files are saved with student names for easy identification
- Students can only upload, cannot access other files

---

## File Naming Convention

Files are automatically named as:
```
[StudentName]_Q[QuestionNumber]_[Date].wav
```

Example:
```
JohnSmith_Q3_2025-01-07.wav
```

---

## Cost

**FREE** - This uses Google Apps Script's free tier:
- 1,000 executions per day (more than enough)
- Storage counts against your Google Drive quota (15GB free)

---

## Support

If you need help, check:
1. Google Apps Script documentation: https://developers.google.com/apps-script
2. Browser console for JavaScript errors
3. Google Drive to verify files are being created
