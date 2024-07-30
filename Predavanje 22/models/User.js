const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true, 'Ime je obavezno']
    },
    email :{
        type : String,
        required : [true, 'Email je obavezan'],
        unique : true,
    },
    password : {
        type : String,
        required : [true, 'Lozinka je obavezna'],
    },
    isVerified : {
        type: Boolean,
        default: false
    }
},
{timestamps : true}
);

// Pre snimanja korisnika hashira lozinku
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

 // Upoređivanje lozinke --- Istrazite sami ovaj deo
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
const User = mongoose.model('User', userSchema);
module.exports = User; 
