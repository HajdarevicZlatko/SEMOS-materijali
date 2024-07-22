const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB
  abortOnLimit: true,
}));


// Middleware za autentikaciju (dummy autentikacija za primer)
const auth = (req, res, next) => {
    // Simulacija autentikacije => odlazak ka bazi i verifikacija korisnika
    req.user = { id: 'user1234' }; // Primer korisničkog ID-a
    next();
  };

 //Kreiranje direktorijuma za korisnika koji ne postoji
 const createUserDirectory = (userId) =>
    {
        const userDir = path.join(__dirname,'uploads',userId);
        if(!fs.existsSync(userDir))
            {
                fs.mkdirSync(userDir,{recursive : true});
            }

    }; 

 app.post('/upload', auth, (req,res)=>
    {
        if(!req.files || Object.keys(req.files).length === 0)
        {
            return res.status(400).send('No files attached');
        }
        
        //Nasa Provera//////////////////////////////////
        let fileTypes = ['image/png','image/jpg','image/jpeg', 'image/gif'];
        let maxFileSize = 1024*1024; //1MB
        if(!fileTypes.includes(req.files.file.mimetype))
        {
            return res.status(400).send('Bad request - format not good');
        }
        if(maxFileSize < req.files.file.size)
        {
            
            return res.status(400).send('Bad request - max size not good');
        }
        //////////////////////////////////////////

        const file = req.files.file;
        const userId = req.user.id;
        createUserDirectory(userId);

        const uploadPath = path.join(__dirname,'uploads',userId,file.name);

        file.mv(uploadPath, (err) =>{
            if(err)
            {
               return res.status(500).send(err); 
            }
        });

        res.send('File uploaded');
    });
    
    app.get('/files/:filename', auth, (req, res) =>{
        const userId = req.user.id;
        const filename = req.params.filename;

        const filePath = path.join(__dirname,'uploads',userId,filename);

        if(fs.existsSync(filePath))
        {
            res.sendFile(filePath);
        }
        else
        {
            res.status(404).send('File not found');
        }

    });
 const port = 3001;
 app.listen(port);   