const mongoose = require('mongoose');

const blogSema = new mongoose.Schema({
    title: {type: String, required: true},
    posts: {type: [String], required: true},
    user : {type : mongoose.Schema.Types.ObjectId, ref: 'User', required : true}
});


const Blog = mongoose.model('Blog', blogSema);

module.exports = Blog;
