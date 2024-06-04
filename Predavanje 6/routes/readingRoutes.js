const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/readingInside', contactsController.getContacts);
// Definise se GET ruta '/contacts' koja koristi kontroler getContacts


router.post('/readingInside', contactsController.createContact);
// Definise se POST ruta '/contacts' koja koristi kontroler createContact

module.exports = router;
//Exportujemo rute