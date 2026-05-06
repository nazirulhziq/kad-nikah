// Code.gs - Google Apps Script for Kad Nikah

function doPost(e) {
  const sheet = getOrCreateSheet();
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    if (data.type === 'guestbook') {
      const rows = [
        timestamp,
        data.name,
        data.comment,
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
  const spreadsheetId = ScriptProperties.getProperty('SPREADSHEET_ID');
  let ss;
  
  if (spreadsheetId) {
    ss = SpreadsheetApp.openById(spreadsheetId);
  } else {
    ss = SpreadsheetApp.create('Ked Nikah - Guestbook & RSVP');
    ScriptProperties.setProperty('SPREADSHEET_ID', ss.getId());
  }
  
  const sheet = ss.getSheetByName('Data');
  if (!sheet) {
    const newSheet = ss.insertSheet('Data');
    newSheet.appendRow(['Timestamp', 'Name', 'Detail', 'Status', 'Type']);
    return newSheet;
  }
  return sheet;
}