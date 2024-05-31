const express = require('express');
// Uvozi se Express modul.

const router = express.Router();
// Kreira se novi Express ruter.

const contactsController = require('../controllers/contactsController');
// Uvozi se kontroler za kontakte.

const contactModel = require('../models/contactsModel');

router.get('/contacts', contactsController.getContacts);
// Definiše se GET ruta '/contacts' koja koristi kontroler 'getContacts'.

router.post('/contacts', contactsController.createContact);
// Definiše se POST ruta '/contacts' koja koristi kontroler 'createContact'.

// Ažuriranje kontakta prema imenu
router.put('/contacts/update/:name', contactsController.updateContact);

// Brisanje kontakta prema imenu
router.delete('/contacts/remove/:name', contactsController.deleteContact);
module.exports = router;
// Eksportuje se ruter tako da može biti uključen u glavni fajl aplikacije.
