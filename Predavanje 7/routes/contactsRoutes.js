const express = require('express');
// Uvozi se Express modul.
const path = require('path'); // Uvoz modula za rad sa putanjama
const router = express.Router();
// Kreira se novi Express ruter.

const newContactsController = require('../controllers/newContactsController');
const contactsController = require('../controllers/contactsController');
// Uvozi se kontroler za kontakte.

const contactModel = require('../models/contactsModel');

router.get('/contacts', contactsController.getContacts);
// Definiše se GET ruta '/contacts' koja koristi kontroler 'getContacts'.

router.post('/contacts', newContactsController.createContact);
// Definiše se POST ruta '/contacts' koja koristi kontroler 'createContact'.

// Ažuriranje kontakta prema imenu
router.put('/contacts/update/:name', newContactsController.updateContact);

// Brisanje kontakta prema imenu
router.delete('/contacts/remove/:name', newContactsController.deleteContact);

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.get('/new-contact', (req, res) =>{
    res.sendFile(path.join(__dirname, '../views/new-contact.html'));
});

router.get('/contacts.html', contactsController.renderContactsPage);

module.exports = router;
// Eksportuje se ruter tako da može biti uključen u glavni fajl aplikacije.
