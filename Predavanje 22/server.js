require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const registerUser = require('./auth/auth-service');
const User = require('./models/User');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://zlatkohajdarevic:5Hww796ooRG55azO@semoscluster.doagyil.mongodb.net/VerifiedDB?retryWrites=true&w=majority&appName=SemosCluster', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=>console.log('Connected to DB'))
.catch(err => console.log('Failed to connected to DB', err));

app.post('/register', async(req, res) =>{
    try
    {
        const newUser = await registerUser(req.body);
        res.status(201).json({message : 'Korisnik uspesno kreiran, proverite email za verfikaciju'});
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }

});

app.get('/verify-email', async (req, res) =>{

    try
    {
        const token = req.query.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');

        const user = await User.findById(decoded.userId);

        if(!user)
        {
                return res.status(400).json({message:'User do not exist'});
        }

        user.isVerified = true;
        await user.save();

        res.status(200).send({message:'Email is verified succesfully'});        

    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    };

});

app.listen(3000, ()=>{
    console.log(`Server is running`)
});