const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//Kreiranje novog korisnika (Create)
// users/
router.post('/', async(req, res) =>{
    try
    {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});
//Dohvatanje svih korisnika (Read)
router.get('/', async(req, res)=>{
    try
    {
        //JEDAN PRIMER KAKO JE MOGLO DRUGACIJE
        //const id = req.query.id;
        // if id nije undefined => koristimo filter id
        // ukoliko je undefined koristimo bez filtera
        const users = await User.find();
        res.send(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

});

// Dohvatanje korisnika po ID (Read)
router.get('/:id', async (req, res)=>{
    try
    {
        const user = await User.findById(req.params.id);
        if(!user)
        {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});


//Azuriranje korisnika (Update)
router.put('/:id', async (req, res)=>{
    try
    {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators : true});
        if(!user)
        {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

});

//Brisanje korisnika (Delete)
router.delete('/:id', async (req, res) =>{
    try
    {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
        {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

});

module.exports = router;
