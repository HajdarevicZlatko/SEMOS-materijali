const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Definicija seme za korisnika
const userSchema = new mongoose.Schema({
    name : {type:String, required : true, minlength: 3},
    email : {type : String, required: true, unique: true},
    password :{type:String, required:true}
});

userSchema.pre('save', async function (next){

    if(this.isModified('password') || this.isNew)
    {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
    }
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;