//Ucitacemo potrebne module
const express = require('express');
const mongoose = require('mongoose');

//Uzimamo sa nase klaud masine

const MONGODB_URI = "mongodb+srv://zlatkohajdarevic:5Hww796ooRG55azO@semoscluster.doagyil.mongodb.net/MyFirstDatabaseSemos?retryWrites=true&w=majority&appName=SemosCluster";

//Kreiranje express aplikacije
const app = express();
//Middleware za parsiranje JSON zahteva 
app.use(express.json());

const User = require('./models/UserMongoose');

//Konekcija ka nasoj bazi
mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=> console.log('Konektovana je aplikacija na bazu'))
        .catch(err => console.log('Neuspela konekcija: '+err));


app.post('/users', (req, res) => {
  //Kreiranje novog korsinika iz podataka prosledjenih u telu zahteva
  const newUser = new User(req.body);
  //Snimanje korisnika u bazu
  newUser.save()
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json({error: err.message}));
});

app.get('/users', (req,res) =>{
  //Pronalazenje svih korisnika
      User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({error: err.message}));
});

app.get('/users/:id', (req,res)=>{
      //Pronalazenje korisnika po id-u
      User.findById(req.params.id)
        .then(user => {
          if(!user) return res.status(404).json({error : 'Korisnik nije pronadjen'});
          res.json(user);
        })
        .catch(err => res.status(500).json({error: err.message}));
});

app.put('/users/:id', (req,res) =>{
    //Azuriranje podataka
    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator : true})
      .then(user =>{
        if(!user) return res.status(404).json({error: 'Korisnik nije pronadjen'})
         res.json(user); 
      })
      .catch(err => res.status(500).json({error: err.message}));
});

app.delete('/users/:id', (req, res) =>{
    //Brisanje korisnika po id-u
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if(!user) return res.status(404).json({error: 'Korisnik nije pronadjen'})
          res.json({message : 'Korisnik izbrisan'});
      })
      .catch(err => res.status(500).json({error: err.message}));
});


// Napredniji upiti ////////////////////////////////
// Endpoint za filtriranje, ograničavanje broja vracenih i sortiranje
app.get('/filter', (req, res) => {
  let query = User.find();

  // Filtriranje prema query parametru (npr. age)
  if (req.query.age) {
      query = query.where('age').equals(req.query.age);
  }

  // Ograničavanje broja rezultata
  if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit));
  }

  // Sortiranje rezultata
  if (req.query.sortBy) {
      let sortOrder = req.query.order === 'desc' ? -1 : 1;
      query = query.sort({ [req.query.sortBy]: sortOrder });
  }
// Filtriranje prema query parametru (npr. ageGreaterThan)
if (req.query.ageGreaterThan) {
  query = query.where('age').gt(parseInt(req.query.ageGreaterThan));
}
  query.then(users => res.json(users)).catch(err => res.status(500).json(err));
});

const PORT = 3000;

app.listen(PORT,() =>{
  console.log('Server pokrenut');
});