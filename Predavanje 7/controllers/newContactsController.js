const contactsModel = require('../models/contactsModel');
const fs = require('fs').promises;
const path = require('path'); // Uvoz modula za rad sa putanjama
// Uvozi se modul 'contactsModel' koji sadrži funkcije za rad sa kontaktima.


async function createContact(req, res) {
    try {
        const newContact = req.body;
        // Uzima podatke o novom kontaktu iz tela HTTP zahteva.

        const contacts = await contactsModel.getAllContacts();
        // Dobija trenutnu listu kontakata.

        contacts.push(newContact);
        // Dodaje novi kontakt u listu.

        await contactsModel.saveContacts(contacts);
        // Zapisuje ažuriranu listu kontakata u fajl.

        res.status(201).json(newContact);
        // Vraća odgovor sa statusom 201 (kreirano) i podacima o novom kontaktu.

    } catch (err) {
        res.status(500).json({ error: 'Failed to save contact' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
};

async function updateContact(req, res) {
    try {
        const name = req.params.name;
        const newPhone = req.body.phone;


        contactsModel.getAllContacts()
        .then(contacts => {
            const updatedContacts = contacts.map(contact => {
                if (contact.name === name) {
                    contact.phone = newPhone;
                }
                return contact;
            });
            return contactsModel.saveContacts(updatedContacts);
        })
        .then(() => res.status(200).json({ message: 'Contact updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));

    } catch (err) {
        res.status(500).json({ error: 'Failed to update contact' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
};

async function deleteContact(req, res) {
    try {
        const name = req.params.name;
        contactsModel.getAllContacts()
        .then(contacts => {
            const updatedContacts = contacts.filter(contact => contact.name !== name);
            return contactsModel.saveContacts(updatedContacts);
        })
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({ error: err.message }));

    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
}

/*
EJS

HTML <%= name %>
const data = { name: 'John Doe' };
res.render('index', data);


*/
module.exports = {
    createContact,
    updateContact,
    deleteContact
};
// Eksportuju se funkcije 'getContacts' i 'createContact' tako da mogu biti korišćene u rutama.
