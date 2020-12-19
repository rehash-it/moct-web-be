const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const subscriberRequestSchema = require('../models/subscriber_request');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },

  isAdmin: {
    type: Boolean,
    default: false,
    required: false,
  },

  isActive: {
    type: Boolean,
    default: false,
    required: false,
  },

  // isAdmin: Boolean,
  // isActive: Boolean,

  loginLink: {
    type: String,
    required: false,
    unique: true
  },
  subscriberRequest: {
    type: subscriberRequestSchema
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, keys.jwtPrivateKey);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
    isActive: Joi.boolean(),
  });
  const validation = schema.validate(user);
  return validation;
}


exports.User = User;
exports.validateUser = validateUser;