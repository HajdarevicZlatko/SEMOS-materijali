//Ucitavanje Mongoose biblioteku
const mongoose = require('mongoose');
//Definisanje seme za korisnika
const userSchema = new mongoose.Schema
({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    age : {type : Number}

});

userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.__v;
        return ret;
    }
  });
  
  userSchema.set('toObject', {
    transform: (doc, ret, options) => {
        delete ret.__v;
        return ret;
    }
  });
//Kreiramo model korisnika sa semom
const User = mongoose.model('User', userSchema);

module.exports = User;