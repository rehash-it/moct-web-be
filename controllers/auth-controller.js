const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');

exports.auth = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!user) return res.status(400).send('Invalid username or password.');

  if (!user.isActive || (!user.isAdmin)) return res.status(400).send('Your account is currently Inactive. Please contact system adminstrator.');

  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  res.send({ token, id: user._id, auth: true });
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

