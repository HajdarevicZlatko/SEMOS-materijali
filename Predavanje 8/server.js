const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    {firstName : 'Zlatko', lastName:'Hajdarevic', email : 'zlatkohajdarevic@gmail.com'},
    {firstName : 'Zarko',  lastName:'Mitic',      email : 'zarko@gmail.com'}
];

const appName = "Moja aplikacija promena 2";

app.get('/', (req, res) => {
    res.render('index', { users, appName});
});
app.listen(port,()=>{
    console.log('Server pokrenut');
});