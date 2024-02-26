const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for auth check
const { errorHandler } = require('../helpers/dbErrorHandler');

require('dotenv').config();

exports.signup = (req, res) => {
  // console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find the user based on mobile
  const { mobile, password } = req.body;
  User.findOne({ mobile }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that mobile no. doesn't exist. Please signup.",
      });
    }
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Mobile No. and password didn't match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET
    );
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, mobile, role, inNRI, address } = user;
    return res.json({ token, user: { _id, mobile, name, role, inNRI, address } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  // algorithms: ['RS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};
