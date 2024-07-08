const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

const MONGODB_URI = "mongodb+srv://zlatkohajdarevic:5Hww796ooRG55azO@semoscluster.doagyil.mongodb.net/UsersValidateDatabase?retryWrites=true&w=majority&appName=SemosCluster";

//Konekcija ka nasoj bazi
mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=> console.log('Konektovana je aplikacija na bazu'))
        .catch(err => console.log('Neuspela konekcija: '+err));

//Middleware za parsiranje JSON podataka        
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, ()=>{
  console.log('Server startovan');
})