const express = require('express');
const weather = require('./handlers/weather');

const api = express();

api.get('/api/weather/:city', weather.getCity);

api.listen(10000, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Server started on port 10000');
});

/*
.env fajl je jednostavan tekstualni fajl koji se koristi za definisanje konfiguracionih promenljivih 
okruženja u aplikacijama. Ovaj fajl obično sadrži parove ključ-vrednost koje aplikacija koristi za 
čitanje raznih konfiguracija, kao što su API ključevi, stringovi za povezivanje s bazom podataka, 
portovi, i druge važne informacije koje treba da budu prilagodljive bez potrebe za menjanje koda.
*/