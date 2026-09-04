const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { appendContact } = require('../lib/googleSheets');
const path = require('path');
const app = express();

app.use('/vendor/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.post('/thanks', async (req,res) => {
    try {
        await appendContact(req.body);
    } catch (err) {
        console.error('Failed to write to Google Sheet:', err.message);
    }
    res.render('thanks', { contact: req.body })
});

app.listen(8080,() => {
    console.log('listening at http://localhost:8080');
});
