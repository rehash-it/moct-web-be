
const Joi = require('joi');
const mongoose = require('mongoose');


const bidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  instruction: {
    type: String,
    required: true,
    minlength: 10
  },

  endDate: {
    type: Date,
    default: Date.now
  },

  file: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bid = mongoose.model('Bid', bidSchema);

function validateBid(bid) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    instruction: Joi.string().min(10).required(),
    endDate: Joi.date(),
    file: Joi.allow()
    // image : Joi.required(),
  });
  const validation = schema.validate(bid);
  return validation;
}


exports.Bid = Bid;
exports.validateBid = validateBid;