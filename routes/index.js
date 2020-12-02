const express=require('express');
const asyncMiddleware=require('../middleware/async');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authController=require('../controllers/auth-controller');
const userController=require('../controllers/user-controller');
const contactInfoController = require('../controllers/contactInfo-controller');
const galleryCategoryController = require('../controllers/gallery-category-conroller');
const galleryController = require('../controllers/gallery-controller');
const lookupController = require('../controllers/lookup-controller');
const eventController = require('../controllers/event-controller');


const error=require('../middleware/error');
var cors = require('cors')

module.exports=function(app){
app.use(express.json());

app.use('/api',router.all('/galleryCategory', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
next();
}));

app.use('/api',router.all('/auth', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/me', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/user', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/contactinfo', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/gallery', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.get('/me',asyncMiddleware(userController.getUser)));

app.use('/api',router.post('/user', asyncMiddleware(userController.createUser)));

app.use('/api',router.post('/contactInfo', asyncMiddleware(contactInfoController.createContactInfo)));
app.use('/api',router.get('/contactInfo', asyncMiddleware(contactInfoController.getContactInfo)));
app.use('/api',router.put('/contactInfo/:id', asyncMiddleware(contactInfoController.updateContactInfo)));
app.use('/api',router.delete('/contactInfo/:id', asyncMiddleware(contactInfoController.deleteContactInfo)));

app.use('/api',router.post('/galleryCategory',asyncMiddleware(galleryCategoryController.createGalleryCategory)));
app.use('/api',router.get('/galleryCategory',asyncMiddleware(galleryCategoryController.getGalleryCategory)));
app.use('/api',router.get('/galleryCategory/:id',asyncMiddleware(galleryCategoryController.getGalleryCategoryById)));
app.use('/api',router.put('/galleryCategory/:id',asyncMiddleware(galleryCategoryController.updateGalleryCategory)));
app.use('/api',router.delete('/galleryCategory/:id',asyncMiddleware(galleryCategoryController.deleteGalleryCategory)));

app.use('/api',router.post('/gallery',asyncMiddleware(galleryController.createGallery)));
app.use('/api',router.get('/gallery',asyncMiddleware(galleryController.getGallery)));
app.use('/api',router.get('/galleryByCategory/:id',asyncMiddleware(galleryController.getGalleryByCategory)));
app.use('/api',router.put('/gallery/:id',asyncMiddleware(galleryController.updateGallery)));
app.use('/api',router.delete('/gallery/:id',asyncMiddleware(galleryController.deleteGallery)));

app.use('/api',router.post('/lookup',asyncMiddleware(lookupController.createLookup)));
app.use('/api',router.get('/lookup',asyncMiddleware(lookupController.getLookup)));
app.use('/api',router.put('/lookup/:id',asyncMiddleware(lookupController.updateLookup)));
app.use('/api',router.delete('/lookup/:id',asyncMiddleware(lookupController.deleteLookup)));

app.use('/api',router.post('/event',asyncMiddleware(eventController.createEvent)));
app.use('/api',router.get('/event',asyncMiddleware(eventController.getEvent)));
app.use('/api',router.put('/event/:id',asyncMiddleware(eventController.updateEvent)));
app.use('/api',router.delete('/event/:id',asyncMiddleware(eventController.deleteEvent)));
app.use(error);
}



