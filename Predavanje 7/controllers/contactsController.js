const contactsModel = require('../models/contactsModel');
const fs = require('fs').promises;
const path = require('path'); // Uvoz modula za rad sa putanjama

async function renderContactsPage(req, res) {
    contactsModel.getAllContacts().then(contacts =>{
       return fs.readFile(path.join(__dirname,'../views/contacts.html'), 'utf-8')
       .then(template => {
            let contactsListHtml = contacts.map(contact => `<li>name : ${contact.name} - phone : ${contact.phone}</li>` ).join('');
            let populatedHtml = template.replace('{{contactList}}', contactsListHtml);
            res.send(populatedHtml);
       })
    }).catch(err => res.status(500).send(`Error loading dynamic context : ${err}`));

};

async function getContacts(req, res) {
    try {
        const contacts = await contactsModel.getAllContacts();
        // Poziva se funkcija 'getAllContacts' da se dobije lista svih kontakata.

        res.json(contacts);
        // Vraća se lista kontakata kao JSON odgovor.

    } catch (err) {
        res.status(500).json({ error: 'Failed to load contacts' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
};

module.exports = {
    renderContactsPage,
    getContacts
};