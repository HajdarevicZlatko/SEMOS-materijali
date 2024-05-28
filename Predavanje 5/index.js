// Uvoz potrebnih modula
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    console.log(`${req.method} zahtev na ${req.url}`);
    next();
});

app.get('/', (req,res) => {
    res.send('Pocetak Express-a');
});

app.use((req, res, next)=>{
    console.log(`${req.method} zahtev na ${req.url} - POTREBNA AUTENTIFIKACIJA`);
    next();
});

app.post('/userpost',(req,res)=>{
    const newUser = req.body;
    res.status(201).send(`Korisnik kreiran: ${JSON.stringify(newUser)}`);
});


app.get('/kraj', (req,res) => {
    const err = new Error('Ovo je kraj greska');
    res.send('Kraj Express-a');
});

app.get('/cause-error', (req,res, next) => {
    //Namerno izazivanje greske
    const err = new Error('Ovo je namerna greska');
    err.status = 500;
    next(err);
});

app.get('/kraj/:userId', (req,res) => {
    const userIdText = req.params.userId;
    const queryText = req.query.a;

    res.send(`Korisnicki ID: ${userIdText}`);
});

app.get('/users', (req,res) => {
    const queryText = req.query.query2;
    res.send(`Query: ${queryText}`);
});

//Midleware za obradu greske
app.use((err,req,res,next)=>{
    //Loguj gresku na fajl
    //Posalji mail developeru
    //Upisi gresku u bazu
    //Posalji na viber
    //.....
    res.status(err.status || 500);
    res.json({
                error :{message : err.message}
            });

});

//app.delete() - sami uradite

// Middleware za logovanje promasene rute
app.use((req,res,next) =>{
    //Mnogo logike
    console.log(`${req.method} zahtev na ${req.url} - PROMASENA RUTA`);
    next();
});

app.listen(3000, ()=> {
        console.log('Server radi na portu 3000');
});

/*
Dohvati_sve_korisnike(){
    //Ide ka bazi i hvata korisnike

    //dodatni_kod();
    return korisnici;
}

dodatni_kod(){

//Dodatni kod
}
*/
/*
Objašnjenje koda:
Uvoz modula:
express: Uvoz Express framework-a.
body-parser: Uvoz body-parser middleware-a.
Kreiranje Express aplikacije:

const app = express();: Kreiranje nove Express aplikacije.
Postavljanje body-parser middleware-a:

app.use(bodyParser.json());: Middleware za parsiranje JSON podataka. Svaki zahtev sa JSON telom će biti parsiran i dostupan u req.body.

Definisanje POST rute:

app.post('/users', (req, res) => { ... });: Ruta koja prihvata podatke iz tela zahteva i kreira novog korisnika. Parsirani podaci će biti dostupni u req.body.
Definisanje GET rute za korisnike:

app.get('/users/:id', (req, res) => { ... });: Ruta koja prima ID korisnika iz URL parametara i vraća odgovarajući odgovor.
Definisanje GET rute koja izaziva grešku:

app.get('/cause-error', (req, res, next) => { ... });: Ruta koja namerno izaziva grešku za testiranje middleware-a za obradu grešaka.
Middleware za obradu grešaka:

app.use((err, req, res, next) => { ... });: Middleware koji hvata sve greške, postavlja odgovarajući statusni kod i vraća odgovor sa porukom greške.
Pokretanje servera:

const port = 3000;: Definisanje porta na kojem server sluša.
app.listen(port, () => { ... });: Pokretanje servera i slušanje na definisanom portu.
Testiranje:
Za kreiranje korisnika: POST localhost:3000/users
Za dohvat korisnika: GET localhost:3000/users/:id
Za izazivanje greške: GET localhost:3000/cause-error
Ovaj primer pokriva osnovne aspekte rada sa Express-om, uključujući rute, middleware za parsiranje podataka, rad sa URL parametrima i obradu grešaka.

Kako radi body-parser?
Parsira JSON podatke:

Kada se koristi bodyParser.json(), body-parser middleware parsira telo zahteva koje je u JSON formatu i čini ga dostupnim kroz req.body.

OVO JE BEZ BODY PARSER-A

app.post('/users', (req, res) => {
    let data = '';

    // Čitanje podataka iz tela zahteva
    req.on('data', chunk => {
        data += chunk.toString();
    });

    // Završetak čitanja tela zahteva
    req.on('end', () => {
        const newUser = JSON.parse(data);
        // Ovdje biste obično sačuvali novog korisnika u bazu podataka
        res.status(201).send(`Korisnik kreiran: ${JSON.stringify(newUser)}`);
    });
});
*/


/***************************************************************************************
 * Domaci
 * 
 * Prebacivanje prethodnog domaces u Express framework, kalkulator, konverziju Fh u Cs
 * --- to su dtri rute:
 *  1) jedna ce primati operaciju, podatak a i podatak b i u zavisnosti od operacije vracati rezultat
 *  2) Druga ce konvertovati iz Fh u Cs
 *  3) Treca ruka konvertuje iz Cs u Fh
 ****************************************************************************************/
