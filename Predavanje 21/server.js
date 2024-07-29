//Ucitavanje .env require();
require('dotenv').config();
const mailgun = require('mailgun-js');

const mg = mailgun({
    apiKey : process.env.MAILGUN_API_KEY,
    domain : process.env.MAILGUN_DOMAIN
});

const data = {
    from : 'Your App <noreply@yourDomain.com>',
    to : 'zlatkohajdarevic@gmail.com',
    subject : 'Hello from Mailgun',
    text : 'Testing Mailgun with Node.js is easy'
};

/*
Ucitamo sve email od korisnika sajte

for
{
    za svaku email adresu poslao neke podatke
}
*/

mg.messages().send(data, function(error,body)
{
    if(error)
    {
            console.log('Error: ', error);
    }
    else
    {
        console.log('Email sent: ', body);
    }
}
);