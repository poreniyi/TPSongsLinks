let express = require('express');
let app = express();
require('dotenv').config();
let path = require('path');
let db=require('./DB/access');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', async(req, res) => {
    db.query('INSERT INTO cards(letter)VALUES ($1)',['apple'])
    res.render('home');
})


app.use((req, res, next) => {
    res.status(404).render('home')
})

app.listen(app.get('port'), () => {
    console.log(`Listening for requests onn port${app.get('port')}`)
})