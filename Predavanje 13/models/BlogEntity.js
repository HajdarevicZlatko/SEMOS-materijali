const mongoose = require('mongoose');

const blogSema = new mongoose.Schema({
    title: {type: String, required: true},
    posts: {type: [String], required: true}
});


const Blog = mongoose.model('Blog', blogSema);

module.exports = Blog;
