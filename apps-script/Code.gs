/**
 * noui.si intent collector (Google Apps Script web app).
 * Appends visitor-typed text to the "Submissions" tab of the bound spreadsheet.
 * Deploy as: Execute as "Me", Who has access "Anyone".
 *
 * The endpoint URL is public, so everything below assumes hostile input.
 */
const SHEET_NAME = 'Submissions'
const MAX_LEN = 120        // characters kept per submission
const MAX_ROWS = 5000      // hard cap so a flood cannot fill the sheet
const MIN_MS = 1000        // faster than this since page load is a bot

function doPost(e) {
  const p = (e && e.parameter) || {}

  // Honeypot: real visitors never see or fill this field.
  if (p.hp) return ok_()

  // Too fast to be a person typing.
  if (!(Number(p.t) >= MIN_MS)) return ok_()

  // Keep one line of plain text.
  let text = String(p.intent || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LEN)
  if (text.length < 2) return ok_()

  // Spreadsheet formula injection: neutralise leading = + - @ (OWASP guidance).
  if (/^[=+\-@]/.test(text)) text = "'" + text

  const lock = LockService.getScriptLock()
  if (!lock.tryLock(5000)) return ok_()
  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME)
    if (!sheet || sheet.getLastRow() > MAX_ROWS) return ok_()
    const row = sheet.getLastRow() + 1
    // Plain-text format so the cell is never parsed as a formula or date.
    sheet.getRange(row, 1, 1, 2).setNumberFormat('@').setValues([[new Date().toISOString(), text]])
  } finally {
    lock.releaseLock()
  }
  return ok_()
}

// Always answer the same way so attackers learn nothing from responses.
function ok_() {
  return ContentService.createTextOutput('ok')
}
