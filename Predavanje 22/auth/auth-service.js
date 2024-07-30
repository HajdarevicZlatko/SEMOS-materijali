require('dotenv').config();
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const generateHTML = require('../email/generate-html');
const User = require('../models/User');

const mg = mailgun({
    apiKey : process.env.MAILGUN_API_KEY || '0b0d4a30916479cd235e1f8995127c33-afce6020-c395bc46',
    domain : process.env.MAILGUN_DOMAIN || 'sandbox244c73b52afa4e17b5c3dcf49864433d.mailgun.org'
});

// Primer HTML template-a
const emailTemplate = `
    <h1>Dobrodosli, {{ name }} !</h1>
    <p>Molim Vas da verifikujete vas email klikom na sledeci link</p>
    <a href="{{ verificationLink }}"> Verifikuj email </a>
`;

async function registerUser(userData)
{
    const {name, email, password} = userData;

    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        throw new Error('Korisnik sa datom email adresom vec postoji');
    }

    const newUser = new User({ name,email, password});
    await newUser.save();

    const verificationToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET || 'your_jwt_secret_key', {expiresIn: '10h'});
    const verificationLink = `${process.env.BASE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;

    const emailHTML = generateHTML(emailTemplate,{name,verificationLink});

    const data = {
        from : 'Your App <noreply@yourDomain.com>',
        to : email,
        subject : 'Verifikacija email',
        html : emailHTML
    };

    await mg.messages().send(data);

    return newUser;

}

module.exports = registerUser;
