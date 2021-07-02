
const keys=require('./config/keys');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors');
var multer = require('multer')
app.use(cors());
app.use(express.static('public'));

require('./routes/index')(app);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})
var upload = multer({ storage: storage }).single('file');
app.use('/uploads', express.static('./uploads'));

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});
if (!keys.jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
let dbUri = keys.dburl;
const connect = (databaseUrl =dbUri) => {
  return mongoose
      .connect(databaseUrl)
      .then(() => console.log('Database connected'))
      .catch(err => console.error('Database connection failed', err));
};
connect();

app.listen(keys.port, () => console.log(`Listening on port ${keys.port}...`));
