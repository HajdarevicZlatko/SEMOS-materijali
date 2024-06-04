const express = require('express');

const app = express();

const contactsRoutes = require('./routes/contactsRoutes')
//Uvozimo ruter za kontakte


app.use(express.urlencoded({extended : true}));
//Middleware za parsiranje URL kodiranih podataka iz formulara
app.use(express.json());

app.use((req, res, next)=>{
    console.log(`${req.method} zahtev na ${req.url}`);
    next();
});


app.use('/', contactsRoutes);
//Ukljucujemo rute za kontakt aplikaciju

/* 
/api
localhost:3000/api/
localhost:3000
*/



const PORT = 3000;
//Definisemo port
app.listen(PORT,()=>{
    console.log(`Server startovan na portu: ${PORT}`)
});