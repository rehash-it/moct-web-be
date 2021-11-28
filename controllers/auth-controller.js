const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const sendError = require('../utils/sendError');

exports.auth = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ username: req.body.username });

  if (!user) return sendError('Invalid username.', res)
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!user.isActive || (!user.isAdmin)) return sendError('Your account is currently Inactive. Please contact system adminstrator.', res);

  if (!validPassword) return sendError('Invalid password.', res);

  const token = user.generateAuthToken();
  res.send({ token, id: user._id, auth: true, username: user.username });
}
exports.changePassword = async (req, res, next) => {
  let user = await User.findOne({ _id: req.body._id });
  const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!user) return res.status(400).send('Invalid username or password.');

  if (!user.isActive || (!user.isAdmin)) return res.status(400).send('Your account is currently Inactive. Please contact system adminstrator.');

  if (!validPassword) return res.status(400).send('Invalid username or password.');
  next();
}
function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().max(255).required()
  });
  const validation = schema.validate(req);
  return validation;
}

exports.signin = async (req, res) => {
  let account_type = req.body.account_type
  let user = await User.findOne({ username: req.body.username });
  let checkAccount = account_type ? (account_type === 'fb' || account_type === 'google') ? true : false : false
  if (!user && checkAccount) {
    this.signUp(req, res)
  }
  else if (!user.isActive) {
    return sendError('Your account is currently Inactive. Please contact system adminstrator.', res);
  }
  else if (user && (!checkAccount)) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return sendError('Invalid username or password.', res);
    const token = user.generateAuthToken();
    res.send({ token, id: user._id, username: user.username })
  }
  else if (user && checkAccount) {
    const token = user.generateAuthToken();
    res.send({ token, id: user._id, username: user.username })
  }
  else {
    return sendError('Invalid username or password.', res);
  }
}
exports.signUp = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return sendError(error.details[0].message, res);

    let user = await User.findOne({ username: req.body.username });
    if (user) return sendError('User already registered plese login through ' + user.account_type, res);
    if (req.body.account_type === 'fb' || req.body.account_type === 'google') { req.body.password = '' }

    user = new User(_.pick(req.body, ['username', 'password', 'isAdmin', 'isActive', 'account_type']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.send({ token, id: user._id, username: user.username })

  }
  catch (err) {
    console.log(err)
    sendError('internal server error', res, 500)
  }

}

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().allow('').min(5).max(255),
    isAdmin: Joi.boolean().required(),
    isActive: Joi.boolean().required(),
    account_type: Joi.string().allow('')
  });
  const validation = schema.validate(user);
  return validation;
}