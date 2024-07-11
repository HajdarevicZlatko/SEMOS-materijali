const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://zlatkohajdarevic:5Hww796ooRG55azO@semoscluster.doagyil.mongodb.net/UsersValidateDatabase?retryWrites=true&w=majority&appName=SemosCluster";

//Konekcija ka nasoj bazi
mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=> console.log('Konektovana je aplikacija na bazu'))
        .catch(err => console.log('Neuspela konekcija: '+err));

module.exports = mongoose;