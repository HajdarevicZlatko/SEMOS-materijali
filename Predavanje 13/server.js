const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Blog = require('./models/BlogEntity');

const MONGODB_URI = "mongodb+srv://zlatkohajdarevic:5Hww796ooRG55azO@semoscluster.doagyil.mongodb.net/BlogDatabase?retryWrites=true&w=majority&appName=SemosCluster";

//Konekcija ka nasoj bazi
mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=> console.log('Konektovana je aplikacija na bazu'))
        .catch(err => console.log('Neuspela konekcija: '+err));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

//const blogsFilePath = path.join(__dirname,'blogs.json');
//Prosledjujemo sve podatke na nasu index stranicu i ukoliko smo admin dodajemo funkcionalnost za
//dodavanje novog blog-a

/*
Metoda .lean() u Mongoose-u se koristi za konvertovanje rezultata upita iz Mongoose dokumenata u obične JavaScript objekte. Evo detaljnog objašnjenja kako i zašto se koristi .lean():

Šta je .lean()?
Kada izvršite upit u Mongoose-u, podaci koje dobijete su Mongoose dokumenti. Ovi dokumenti su specijalni objekti sa dodatnim funkcionalnostima koje pruža Mongoose, kao što su metode za manipulaciju dokumentom (save(), remove(), itd.). U nekim slučajevima, ovi dodatni slojevi mogu biti nepotrebni, a čak i usporavati performanse.

Metoda .lean() konvertuje Mongoose dokumente u obične JavaScript objekte, što može poboljšati performanse i smanjiti memorijski otisak, jer Mongoose ne mora da dodaje dodatne metode i funkcionalnosti na dokumente.

Kada koristiti .lean()?
Samo za čitanje podataka: Kada vam treba samo da pročitate podatke iz baze, bez potrebe za manipulacijom istim, možete koristiti .lean().
*/

app.get('/',async(req,res) => {
  try
  {
    const admin = req.query.admin === 'true';
    const blogs = await Blog.find().lean();
    res.render('index',{blogs,admin});
  }
  catch(err)
  {
    res.status(500).send('Desio se error: '+err);
  }
});
//Prikazivanje specificnog blog-a kao entitet na bazi
//Dohvatanje samo jednog blog-a iz liste i prikazivanje na blog.ejs stranici
//Celokupan sadrzaj stranice ce se prikazati u zavisnosti od podataka iz naseg fajl-a (baze)
app.get('/blog/:id', async(req,res) =>{
    const blogId = req.params.id;
    try
    {
      const blog = await Blog.findById(req.params.id).lean();
      if(blog)
        {
          res.render('blog',{blog});
        }
      else
        {
          res.status(404).send('Nismo pronasli blog');
        }
    }
    catch(err)
    {
      res.status(500).send('Desio se error: '+err);
    } 
});

//Sledeca je ruta za dodavanje post-a u specifican blog
app.post('/blogs/:id', async(req, res) =>{
  const blogId = req.params.id;
  const {content} = req.body;
  try
  {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {$push: {posts: content}},
      {new : true, runValidators : true});
    if(blog)
      {
        res.redirect('/blog/'+blogId);
      }
      else
      {
        res.status(404).send('Nismo pronasli blog');
      }

  }
  catch(err)
  {
    res.status(500).send('Desio se error: '+err);
  }
});
//Dodavanje novog blog-a
app.post('/blog/new', async(req,res) => {
  const {title} = req.body;
  try
  {
    const newBlog = new Blog({
      title : title,
      posts: []
    });

    await newBlog.save();
    res.redirect('/');
  }
  catch(err)
  {
    res.status(500).send('Desio se error: '+err);
  }
});

app.get('/statistics', (req,res)=>{
  const results = {
    blogsCount : undefined,
    postsCount : undefined
  };
  res.render('statistika',results);
})

app.post('/statistics', async (req,res) => {

  const results = {
    blogsCount : undefined,
    postsCount : undefined
  };

  if(req.body.postsCount)
    {
      const postsCount = await Blog.aggregate([
        {$project: {title: 1, postsCount : {$size:"$posts"} } }
      ]);
      results.postsCount = postsCount;
    }

    if(req.body.blogsCount)
      {
        const blogsCount = await Blog.countDocuments();
        results.blogsCount = blogsCount;
      }

      res.render('statistika', results);

});

app.listen(PORT);



