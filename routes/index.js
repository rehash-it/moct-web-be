const express=require('express');
const asyncMiddleware=require('../middleware/async');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authController=require('../controllers/auth-controller');
const userController=require('../controllers/user-controller');
const contactInfoController = require('../controllers/contactInfo-controller');
const galleryCategoryController = require('../controllers/gallery-category-conroller');
const error=require('../middleware/error');
var cors = require('cors')

module.exports=function(app){
app.use(express.json());
app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.get('/me', auth,asyncMiddleware(userController.getUser)));

app.use('/api',router.post('/user', asyncMiddleware(userController.createUser)));

app.use('/api',router.all('/contactInfo', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   }));
   app.use('/api',router.all('/galleryCategory', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   }));
app.use('/api',router.post('/contactInfo', asyncMiddleware(contactInfoController.createContactInfo)));
app.use('/api',router.get('/contactInfo', asyncMiddleware(contactInfoController.getContactInfo)));
app.use('/api',router.put('/contactInfo', asyncMiddleware(contactInfoController.updateContactInfo)));
app.use('/api',router.delete('/contactInfo', asyncMiddleware(contactInfoController.deleteContactInfo)));

app.use('/api',router.post('/galleryCategory', cors(),asyncMiddleware(galleryCategoryController.createGalleryCategory)));
app.use('/api',router.get('/galleryCategory', cors(),asyncMiddleware(galleryCategoryController.getGalleryCategory)));
app.use('/api',router.put('/galleryCategory', cors(),asyncMiddleware(galleryCategoryController.updateGalleryCategory)));
app.use('/api',router.delete('/galleryCategory', cors(),asyncMiddleware(galleryCategoryController.deleteGalleryCategory)));

app.use(error);
}



