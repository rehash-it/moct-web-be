const Joi = require('joi');
const mongoose = require('mongoose');
const subscriberRequestSchema = new mongoose.Schema({
 phonenumber: {
    type: String,
    required: true,
    unique: true
  },
  keyword:{
    type: String,
    required: true,
    unique: true
  },
  createdAt:{ 
    type : Date, 
    default: Date.now 
  }
});

const SubscriberRequest = mongoose.model('subscriberRequest', subscriberRequestSchema);

function validateSubscriberRequest(subscriberRequest) {
  const schema = Joi.object({
    phonenumber: Joi.string().min(8).max(8).required(),
    keyword: Joi.string().min(1).max(5).required()
  });
  const validation = schema.validate(subscriberRequest);
  return validation;
}

exports.SubscriberRequest = SubscriberRequest; 
exports.validateSubscriberRequest= validateSubscriberRequest;