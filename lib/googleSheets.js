const { google } = require('googleapis');
require('dotenv').config({path: require('path').join(__dirname, '../.env')});

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({version: 'v4',auth});

async function appendContact({ firstName, lastName, email }) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values:[[firstName, lastName, email, new Date().toISOString()]],
        },
    });
}

module.exports = {appendContact};