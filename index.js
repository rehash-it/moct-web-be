const Joi = require('joi');
const keys=require('./config/keys');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
require('./routes/index')(app);


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
