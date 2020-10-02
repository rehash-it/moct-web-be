const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = require('./user');
const deliveryStatusSchema = require('./lookup');
const subscriberResponseSchema = new mongoose.Schema({
 user: {
    type: userSchema,
    required: true,
  },
  phonenumber:{
    type: String,
    required: true
  },
  message_content:{
    type: String,
    required: true
  },
  deliverystatus:{
    type: deliveryStatusSchema,
    required: true
  },
  createdAt:{ 
    type : Date, 
    default: Date.now 
  }
});

const SubscriberResponse = mongoose.model('subscriberResponse', subscriberResponseSchema);

function validateSubscriberResponse(subscriberResponse) {
  const schema = Joi.object({
    phonenumber: Joi.string().min(8).max(8).required(),
    message_content: Joi.string().min(20).required(),
    deliverystatusId: Joi.string.required(),
  });
  const validation = schema.validate(subscriberResponse);
  return validation;
}

exports.SubscriberResponse = SubscriberResponse; 
exports.validateSubscriberResponse= validateSubscriberResponse;