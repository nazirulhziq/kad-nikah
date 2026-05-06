// Code.gs - Google Apps Script for Kad Nikah

const SPREADSHEET_ID = ''; // Leave empty to auto-create new sheet

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    const ss = getSpreadsheet();
    
    if (data.type === 'guestbook') {
      let sheet = ss.getSheetByName('Ucapan');
      if (!sheet) {
        sheet = ss.insertSheet('Ucapan');
        sheet.appendRow(['Timestamp', 'Name', 'Comment']);
      }
      sheet.appendRow([timestamp, data.name, data.comment]);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Guestbook saved!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'rsvp') {
      let sheet = ss.getSheetByName('RSVP');
      if (!sheet) {
        sheet = ss.insertSheet('RSVP');
        sheet.appendRow(['Timestamp', 'Name', 'Bilangan', 'Status']);
      }
      sheet.appendRow([timestamp, data.name, data.count, data.status]);
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

function getSpreadsheet() {
  let sheetId = SPREADSHEET_ID;
  
  if (!sheetId || sheetId === '') {
    const ss = SpreadsheetApp.create('Kad Nikah - Wedding Data');
    Logger.log('Created: ' + ss.getId());
    return ss;
  }
  return SpreadsheetApp.openById(sheetId);
}