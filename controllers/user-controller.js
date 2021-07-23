const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const { removeItem } = require('../middleware/remover')

exports.getUser = async (req, res) => {
  const user = await User.find();
  res.send(user);
}

exports.createUser = async (req, res) => {
  try {
    const admin = { ...req.body, isAdmin: true, isActive: true }
    const { error } = validateUser(admin);
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['username', 'password', 'isAdmin', 'isActive']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'isAdmin', 'isActive']));

  }
  catch (err) {
    console.log(err)
  }
};

exports.updateUser = async (req, res) => {
  const { error } = validateUser(removeItem(req.body, ['_id', 'new', 'createdAt', '__v', 'oldPassword']));
  console.log(error)
  if (error) return res.status(400).send(error.details[0].message);

  // let user = await User.findOne({ username: req.body.username });
  // if (user) return res.status(400).send('User already registered.');

  let user = User(_.pick(req.body, ['username', 'password', 'isAdmin', 'isActive']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await User.findByIdAndUpdate(req.params.id, {
    username: user.username,
    password: req.body.new ? user.password : req.body.password,
    isAdmin: user.isAdmin,
    isActive: user.isActive
  }, {
    new: true
  }).select('-password');

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'isAdmin', 'isActive']));
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


