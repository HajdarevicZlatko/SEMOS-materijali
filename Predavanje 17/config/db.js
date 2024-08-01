const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path : path.join(__dirname, '../.env')});

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>console.log('Connected to DB'))
    .catch(err => console.log('Failed to connected to DB', err));

module.exports = mongoose;