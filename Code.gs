// Code.gs - Google Apps Script for Kad Nikah

const SPREADSHEET_ID = '1mqMOcEKDM67WYQQL76Q8xaVPzJX1yn7hcz7g_Ou5eWc';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    if (data.type === 'guestbook') {
      let sheet = ss.getSheetByName('Ucapan');
      if (!sheet) {
        sheet = ss.insertSheet('Ucapan');
        sheet.appendRow(['Timestamp', 'Name', 'Comment']);
      }
      sheet.appendRow([timestamp, data.name, data.comment]);
      Logger.log('Guestbook saved: ' + data.name);
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
      Logger.log('RSVP saved: ' + data.name);
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'RSVP saved!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid type' }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    Logger.log('Error: ' + err.message);
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Ucapan');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const messages = [];
  
  // Skip header row, reverse to get newest first
  for (let i = data.length - 1; i > 0; i--) {
    if (data[i][1]) { // Name
      messages.push({
        name: data[i][1],
        comment: data[i][2]
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(messages))
    .setMimeType(ContentService.MimeType.JSON);
}