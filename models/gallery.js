const Joi = require('joi');
const mongoose = require('mongoose');
const galleryTypeSchema = require('./lookup');
const eventTypeSchema = require('./event');
const tagSchema = require('./lookup');
const galleryCategorySchema = require('./gallery_category');
const { boolean } = require('joi');
const gallerySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  fileurl:{
    type: String,
    required: true,
    unique: true
  },
  eventType:{
    type: eventTypeSchema
  },
  description:{
    type:String,
    required : true,
  },
  caption: {
    type: String,
    required: false
  },
  views: {
    type: Number,
    required: false
  },
  istangible:{
     type:Boolean, 
     required: true,
  },
  tags:{
    type:[String],
  },
  category:{
      type: galleryCategorySchema,
  },
  capturedYear:{ 
    type : Date, 
  },
  createdAt:{ 
    type : Date, 
    default: Date.now 
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

function validateGallery(gallery) {
  const schema = Joi.object({
    typeId: Joi.string().required(),
    fileurl: Joi.string().required(),
    eventTypeId: Joi.string().required(),
    description: Joi.string().required(),
    istangible: Joi.boolean().required(),
    tags:Joi.array().items(Joi.string()),
    categoryId: Joi.string().required(),
    capturedYear: Joi.string().required(),
  });
  const validation = schema.validate(gallery);
  return validation;
}

exports.Gallery = Gallery; 
exports.validateGallery= validateGallery;