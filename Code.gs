// Code.gs - Google Apps Script for Kad Nikah

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your sheet ID or leave empty to auto-create

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    const sheet = getOrCreateSheet();
    
    if (data.type === 'guestbook') {
      const rows = [
        timestamp,
        data.name,
        data.comment,
        '',
        'Guestbook'
      ];
      sheet.appendRow(rows);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Guestbook saved!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'rsvp') {
      const rows = [
        timestamp,
        data.name,
        data.count,
        data.status,
        'RSVP'
      ];
      sheet.appendRow(rows);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'RSVP saved!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid type' }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Kad Nikah API is running!');
}

function getOrCreateSheet() {
  let ss;
  let sheetId = SPREADSHEET_ID;
  
  // If no spreadsheet ID, create new one
  if (!sheetId || sheetId === 'YOUR_SPREADSHEET_ID' || sheetId === '') {
    try {
      ss = SpreadsheetApp.create('Kad Nikah - Guestbook & RSVP');
      sheetId = ss.getId();
      Logger.log('Created new spreadsheet: ' + sheetId);
    } catch (e) {
      Logger.log('Error creating spreadsheet: ' + e.message);
      throw new Error('Cannot create spreadsheet: ' + e.message);
    }
  } else {
    try {
      ss = SpreadsheetApp.openById(sheetId);
    } catch (e) {
      Logger.log('Error opening spreadsheet: ' + e.message);
      throw new Error('Cannot open spreadsheet: ' + e.message);
    }
  }
  
  const sheet = ss.getSheetByName('Data');
  if (!sheet) {
    const newSheet = ss.insertSheet('Data');
    newSheet.appendRow(['Timestamp', 'Name', 'Detail', 'Status', 'Type']);
    return newSheet;
  }
  return sheet;
}