const express=require('express');
const asyncMiddleware=require('../middleware/async');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authController=require('../controllers/auth-controller');
const userController=require('../controllers/user-controller');
const contactInfoController = require('../controllers/contactInfo-controller');
const error=require('../middleware/error');

module.exports=function(app){
app.use(express.json());
app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.get('/me', auth,asyncMiddleware(userController.getUser)));

app.use('/api',router.post('/user', asyncMiddleware(userController.createUser)));


app.use('/api',router.post('/contactInfo', asyncMiddleware(contactInfoController.createContactInfo)));
app.use('/api',router.get('/contactInfo', asyncMiddleware(contactInfoController.getContactInfo)));
app.use('/api',router.put('/contactInfo', asyncMiddleware(contactInfoController.updateContactInfo)));
app.use('/api',router.delete('/contactInfo', asyncMiddleware(contactInfoController.deleteContactInfo)));


app.use(error);
}



