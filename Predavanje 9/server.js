/*
Razlika između Postback-a i Redirect-a
Postback i Redirect su dva različita mehanizma u web razvoju koja se koriste za različite svrhe. 
Obe tehnike uključuju interakciju između klijenta (web browser) i servera, 
ali se razlikuju u načinu na koji se podaci šalju i odgovori vraćaju.

Postback
Šta je Postback?
Postback je proces u kojem se podaci sa klijenta šalju serveru u okviru iste stranice, 
a zatim server vraća odgovor koji može biti ista stranica ili ažurirana verzija te stranice. 
Postback se najčešće koristi kada korisnik popunjava formu i šalje podatke serveru za obradu.

Primer scenarija:

Korisnik popunjava formu: Korisnik unosi podatke u HTML formu.
Forma se šalje serveru: Kada korisnik pritisne dugme za slanje, podaci se šalju serveru putem HTTP POST zahteva.
Server obrađuje podatke: Server prima podatke, obrađuje ih (npr. čuva u bazi podataka, proverava validnost).
Server vraća odgovor: Server vraća odgovor koji može biti ista stranica sa ažuriranim sadržajem ili druga stranica.

Prednosti:

Zadržava se kontekst trenutne stranice.
Može se koristiti za dinamičko ažuriranje sadržaja.

Nedostaci:

Može rezultirati duplim unosom podataka ako korisnik ponovo pošalje POST zahtev (osveži stranicu).


Redirect
Šta je Redirect?
Redirect (preusmeravanje) je proces u kojem server šalje odgovor klijentu sa instrukcijama da poseti drugu URL adresu. 
Nakon što klijent primi ovaj odgovor, automatski šalje novi zahtev na tu drugu URL adresu.

Primer scenarija:

Korisnik popunjava formu: Korisnik unosi podatke u HTML formu.
Forma se šalje serveru: Kada korisnik pritisne dugme za slanje, podaci se šalju serveru putem HTTP POST zahteva.
Server obrađuje podatke: Server prima podatke, obrađuje ih (npr. čuva u bazi podataka, proverava validnost).
Server vraća odgovor za preusmeravanje: Server šalje odgovor koji sadrži HTTP status kod 302 (Found) ili 303 (See Other), 
zajedno sa novom URL adresom.
Klijent se preusmerava: Klijent automatski šalje novi zahtev na navedenu URL adresu.

Prednosti:

Izbegava se problem duplog unosa podataka.
Omogućava preusmeravanje korisnika na drugu stranicu nakon uspešne operacije (npr. stranica za potvrdu).
Nedostaci:

-Izgubljeni su podaci o kontekstu trenutne stranice.
-Dodaje dodatni zahtev i odgovor, što može povećati latenciju.

Ključne razlike:

-Postback zadržava trenutnu stranicu i može je dinamički ažurirati, 
dok Redirect preusmerava korisnika na drugu URL adresu.
-Postback koristi HTTP POST zahteve za slanje podataka i prikazivanje odgovora na istoj stranici, 
dok Redirect koristi HTTP status kodove (302, 303) za preusmeravanje klijenta na drugu stranicu.
-Redirect sprečava problem duplog unosa podataka, 
dok Postback može rezultirati duplim unosom ako korisnik ponovo pošalje POST zahtev.
*/

const express = require('express'); //Uvoz express modula
const fs = require('fs').promises; //Uvos FS modula
const path = require('path'); //Uvoz modula za rad sa putanjama


const app = express(); //Inicijalizacija express servera
const PORT = 3000; //Port na kome ce nas server osluskivati zahteve

app.set('view engine','ejs'); //Prosledjujemo express-u sa kojim 'engine' za view radimo
app.set('views', path.join(__dirname, 'views')); //Setujemo direktorijum za EJS sablone
app.set(express.static(path.join(__dirname,'public'))); //Middleware za staticne fajlove (css, slike itd)
app.use(express.urlencoded({extended : true})); // Middleware koji dozvoljava rad sa URL-encoded podacima sa forme

app.get('/', (req, res) => {
    res.render('index'); // Renderuje index.ejs
});
//Ruta za renderovanje add-user stranice
app.get('/add-user', (req,res) =>{
    res.render('add-user', {error : null}); //Renderuje add-user bez greske
});

app.post('/add-user', async (req,res)=>{
        const {firstName, lastName, email} = req.body;
        const newUser = {firstName, lastName, email};

        //Validacija podataka
        let users = await readUsers();
        //Provericemo da li postoji korisnik sa istim imenom i prezimenom
        const userExist = users.some(user => user.firstName === firstName && user.lastName === lastName);

        if(userExist)
        {
            //Ukoliko postoji takav korisnik vrati gresku POSTBACK
            res.render('add-user',{error : 'Korisnik vec postoji', korisnik: newUser});
        }
        else
        {
            //Ukoliko korisnik nije pronadjen REDIRECT
            users.push(newUser);
            await saveUsers(users);
            res.redirect('/users');
        }

});

//Prikazivanje stranice users
app.get('/users', async(req,res) =>{
    const users = await readUsers(); //Citanje iz fajla
    res.render('users',{users}); //renderovanje stranice i prosledjivanje liste za ispis
});

app.listen(PORT);

// Funkcija koja cita korisnike iz fajla
async function readUsers() {
    try {
      const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8');
      return JSON.parse(data); // Parsing JSON data
    } catch (err) {
      if (err.code === 'ENOENT') {
        return []; // Returning an empty array if the file does not exist
      }
      throw err; // Throwing the error if it's not a file not found error
    }
  }
  
  // Funkcija koja snima korisnika u fajla
  async function saveUsers(users) {
    await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), 'utf-8');
  }