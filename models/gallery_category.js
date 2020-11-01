const Joi = require('joi');
const mongoose = require('mongoose');
const galleryCategorySchema = new mongoose.Schema({
 description: {
    type: String,
  },
 fileurl:{
    type: String,
    unique: true,
    required: true,
  }
});

const GalleryCategory = mongoose.model('GalleryCategory', galleryCategorySchema);

function validateGalleryCategory(galleryCategory) {
  const schema = Joi.object({
    description: Joi.string().min(5),
    fileurl: Joi.string().required()
  });
  const validation = schema.validate(galleryCategory);
  return validation;
}

exports.GalleryCategory = GalleryCategory; 
exports.validateGalleryCategory= validateGalleryCategory;