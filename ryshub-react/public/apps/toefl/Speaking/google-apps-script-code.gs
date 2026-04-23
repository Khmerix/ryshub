// Google Apps Script for TOEFL Speaking Audio Upload
// This code runs on Google's servers and saves files to your Drive

function doPost(e) {
  try {
    // Get the uploaded file data
    var data = Utilities.base64Decode(e.parameters.data);
    var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
    
    // Get or create the folder
    var folderName = "TOEFL Speaking Recordings";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Create subfolder for date
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

// Required for CORS preflight requests
function doGet(e) {
  return ContentService.createTextOutput("TOEFL Speaking Upload Service is running!");
}
