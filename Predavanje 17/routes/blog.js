const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogEntity');
const authMethods = require('../middleware/auth');

router.post('/blogs', async (req, res) =>{
    try
    {
        const {title, posts} = req.body;
        const blog = new Blog({title, posts, user: req.userId});
        await blog.save();
        res.status(201).send('Blog created');
    }
    catch(err)
    {
        res.status(400).send('Error creating blog' + err);
    }

});

router.get('/blogs', async (req,res)=>{
    try
    {
        const blogs = await Blog.find({user:req.userId});
        res.send(blogs);
    }
    catch(err)
    {
        res.status(500).send('Error ' + err);
    }

});
module.exports = router;