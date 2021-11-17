
const keys = require('./config/keys');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors');
var multer = require('multer')
const socketIo = require("socket.io");
const webSocket = require('./socket/socket');
app.use(cors());
app.use(express.static('public'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file');
app.use('/uploads', express.static('./uploads'));

app.post('/upload', function (req, res) {

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
const connect = (databaseUrl = dbUri) => {
  return mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed', err));
};


connect();
require('./routes/index')(app);
const server = require("http").createServer(app)
const io = socketIo(server, {
  cors: {
    origin: ["http://192.168.8.101:3000", "http://localhost:3000", "http://localhost:3001", "http://192.168.8.101:3001"],
    methods: ["GET", "POST", "PUT"],
  },
});
webSocket(io);

server.listen(keys.port, () => console.log(`Listening on port ${keys.port}...`));
