const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');


exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
}

exports.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['username', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']));
};

exports.updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('User already registered.');

  // user = new User(_.pick(req.body, ['username', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await User.findByIdAndUpdate(req.params.id, {
    username: req.body.username, password: req.body.password,
    isAdmin: req.body.isAdmin, isActive: req.body.isActive
  }, {
    new: true
  }).select('-password');

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']));
};


exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id).select('-password');

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find().sort('-createdAt').select('-password');
  if (!users) return res.status(404).send('No user data found.');
  res.send(users);
};