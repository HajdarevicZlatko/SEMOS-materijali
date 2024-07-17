const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const db = require('./config/db');
const authService = require('./middleware/auth');

const app = express();
const port = 3000;

//Middleware za parsiranje JSON podataka        
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/blogs', authService.authenticate, blogRoutes);

app.listen(port, ()=>{
  console.log('Server startovan');
});