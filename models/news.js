
const Joi = require('joi');
const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  content: {
    type: String,
    required: true,
    minlength: 10
  },

  endDate: {
    type: Date,
    default: Date.now
  },

  images: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const News = mongoose.model('News', newsSchema);

function validateNews(news) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(10).required(),
    endDate: Joi.date(),
    // image : Joi.required(),
  });
  const validation = schema.validate(news);
  return validation;
}


exports.News = News;
exports.validateNews = validateNews;