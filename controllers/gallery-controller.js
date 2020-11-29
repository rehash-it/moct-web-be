const { now } = require('lodash');
const {Gallery, validateGallery} = require('../models/gallery');
const {GalleryCategory, validateGalleryCategory} = require('../models/gallery_category');
const {Lookup,validateLookup} = require('../models/lookup');
const {Event,validateEvent} = require('../models/event');
const APIFeatures = require('./../utils/APIFeatures');

exports.getGallery = async (req, res) => {
  try {
    const apiFeatures = new APIFeatures(Gallery.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const galleries = await apiFeatures.query;
    res.status(200).send(galleries);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// exports.getGallery =async (req, res) => {
//     const gallery = await Gallery.find().sort('description');
//     res.send(gallery);
// };

exports.createGallery =async (req, res) => {
    const { error } = validateGallery(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const category= await GalleryCategory.findById(req.body.categoryId);
    if(!category) return res.status(400).send('Invalid Category');
  

    const type= await Lookup.findById(req.body.typeId);
    if(!type) return res.status(400).send('Invalid Type');

    const eventType= await Event.findById(req.body.eventTypeId);
    if(!eventType) return res.status(400).send('Invalid Event Type');

 
    let tags=[];
    for (let i=0;i<req.body.tags.length;i++){
      let result= await Lookup.findById(req.body.tags[i]);
      if(!result){
        return res.status(400).send('Invalid Tag');
      } else{     
        tags.push(result.description);
      }
    }

    let gallery = new Gallery({ 
        description: req.body.description,
        fileurl:req.body.fileurl,
        type:type,
        eventType:eventType,
        istangible:req.body.istangible,
        tags:tags,
        category:req.body.categoryId,
        capturedYear:req.body.capturedYear,
    });
    gallery = await gallery.save();
    
    res.send(gallery);
};
exports.updateGallery = async (req, res) => {
    const { error } = validateGallery(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const category= await GalleryCategory.findById(req.body.categoryId);
    if(!category) return res.status(400).send('Invalid Category');
  

    const type= await Lookup.findById(req.body.typeId);
    if(!type) return res.status(400).send('Invalid Type');

    const eventType= await Event.findById(req.body.eventTypeId);
    if(!eventType) return res.status(400).send('Invalid Event Type');

 
    let tags=[];
    for (let i=0;i<req.body.tags.length;i++){
      let result= await Lookup.findById(req.body.tags[i]);
      if(!result){
        return res.status(400).send('Invalid Tag');
      } else{     
        tags.push(result.description);
      }
    }
    
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, { 
      description: req.body.description,
      fileurl:req.body.fileurl,
      type:type,
      eventType:eventType,
      istangible:req.body.istangible,
      tags:tags,
      category:req.body.categoryId,
      capturedYear:req.body.capturedYear,
    }, {
      new: true
    });
  
    if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
    
    res.send(gallery);
};


exports.deleteGallery =async (req, res) => {
    const gallery = await Gallery.findByIdAndRemove(req.params.id);
  
    if (!gallery) return res.status(404).send('The Gallery  with the given ID was not found.');
  
    res.send(gallery);
};

exports.getGalleryByCategory = async (req, res) => {
    const gallery= await Gallery.find({"category": req.params.id}).select({ });
  
    if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
  
    res.send(gallery);

};