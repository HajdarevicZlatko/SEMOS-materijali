const mongoose = require('mongoose');

//Definicija seme za korisnika
const userSchema = new mongoose.Schema({
    name : {type:String, required : true, minlength: 3},
    email : {type : String, required: true, unique: true},
    age : {type: Number, min: 0}

});

const User = mongoose.model('User', userSchema);

module.exports = User;