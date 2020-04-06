var multer = require('multer');
var bodyParser = require('body-parser');
var Datauri = require('datauri');
var express = require('express');
var cloudinary = require('cloudinary').v2;
var cors = require('cors');

const storage = multer.memoryStorage();
const multerUploads = multer ({ storage }).single('image');
const dUri = new Datauri();

cloudinary.config({ 
  cloud_name: 'project-test', 
  api_key: '172992157242178', 
  api_secret: 'lr0Jhu6R2FsXDQvhazabT-saaR4' 
});

const app =express();
app.use(cors());
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:false}));

app.post('/upload',multerUploads, (req, res) => {
     
  if(req.file){
  //console.log(req.file);
    const mime=req.file.mimetype;
    const ext= mime.slice(mime.indexOf('/')+1);

    //Converting buffer content to a uri
    const dataUri = req => {
      return dUri.format(ext.toString(), req.file.buffer); 
    }

    const file = dataUri(req).content;
    console.log(file);

    cloudinary.uploader.upload(file)
    .then(result=> {
      console.log(result);
      console.log(result.url);
      const imageurl = result.url;
      return res.status(200).json({
        message: 'Upload Successful',
        data: {imageurl}
      })    
    })
    .catch(err=> {
      console.log(err);
      res.status(400).json({
        message: 'Someting went wrong while processing your request',
        data: {err}
      })
    })
  }
    
});

app.listen(3000,()=>{
  console.log('running');
})


