const Joi = require('joi');
const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
 description: {
    type: String,
    required: true,
    unique: true
  },
  eventyear:{ 
    type : Date, 
    default: Date.now 
  }
});

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    description: Joi.string().min(8).required(),
    eventyear:Joi.date()
  });
  const validation = schema.validate(event);
  return validation;
}

exports.Event = Event; 
exports.validateEvent= validateEvent;