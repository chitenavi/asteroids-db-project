import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/userModel';

export const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, 'Please provide email and password!'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return next(createError(401, 'Invalid Credentials!'));
    }

    const tokenJWT = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token: tokenJWT,
    });
  } catch (err) {
    next(createError(401, err));
  }
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConf } = req.body;

    if (password !== passwordConf) {
      return next(
        createError(400, 'Your password and validation password does not match')
      );
    }

    // Create new user to DB
    const newUser = await User.create({
      username,
      email,
      password,
    });

    const tokenJWT = signToken(newUser._id);

    // if it was all correct, return json success data and token
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: newUser,
        token: tokenJWT,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};
