
const Joi = require('joi');
const mongoose = require('mongoose');


const docsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  description: {
    type: String,
    required: true,
    minlength: 10
  },
  file: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Docs = mongoose.model('Docs', docsSchema);

function validateDocs(docs) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).required()
    // image : Joi.required(),
  });
  const validation = schema.validate(docs);
  return validation;
}


exports.Docs = Docs;
exports.validateDocs = validateDocs;