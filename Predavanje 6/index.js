const express = require('express');

const app = express();

const contactsRoutes = require('./routes/contactsRoutes')
//Uvozimo ruter za kontakte


app.use(express.urlencoded({extended : true}));
//Middleware za parsiranje URL kodiranih podataka iz formulara
app.use(express.json());

app.use('/', contactsRoutes);
//Ukljucujemo rute za kontakt aplikaciju



const PORT = 3000;
//Definisemo port
app.listen(PORT,()=>{
    console.log(`Server startovan na portu: ${PORT}`)
});