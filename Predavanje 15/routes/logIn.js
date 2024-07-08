const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res)=>{
    try
    {
        const {email, password} = req.body;

        if(email == undefined || password == undefined)
        {
            return res.status(400).send("Nedostaje podatak");
        }
        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(400).send("Neispravan email ili password");
        }
        //Password = Test => oikhjsdfiuiusgdfbhlk
        //Password na bazi = oikhjsdfiuiusgdfbhlk

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).send("Neispravan email ili password");
        }
        res.send('Logovanje uspesno');

    }
    catch(err)
    {
        res.status(500).send(err);
    }


});

module.exports = router;