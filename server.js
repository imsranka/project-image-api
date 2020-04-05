var multer = require('multer');
var bodyParser = require('body-parser');
var Datauri = require('datauri');
var path = require('path');
var express = require('express');
var cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const multerUploads = multer ({ storage }).single('image');
const dUri = new Datauri();

cloudinary.config({ 
  cloud_name: 'project-test', 
  api_key: '172992157242178', 
  api_secret: 'lr0Jhu6R2FsXDQvhazabT-saaR4' 
});

const app =express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:false}));

app.post('/upload',multerUploads, (req, res) => {
   // console.log('req.file:',req.file.mimetype);str.slice(str.indexOf("/")+1)
   const mime=req.file.mimetype;
   const ext= mime.slice(mime.indexOf('/')+1);
   //console.log(req.file);
    const dataUri = req => {
       return dUri.format(ext.toString(), req.file.buffer);
    
    }

    const file = dataUri(req).content;
    console.log(file);

    cloudinary.uploader.upload(file)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    
    
    //res.send(req.file);
    
      // const file = dataUri(req).content;
      // console.log(file);
    
});

app.listen(3000,()=>{
  console.log('running');
})


