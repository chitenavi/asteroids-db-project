import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const signToken = id =>
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

    // if no user or pass is diferent redirect to login
    // and show the errors
    if (!user || !(await user.comparePasswords(password, user.password))) {
      // respond to API client with json error
      return next(createError(401, 'Invalid Credentials!'));
    }

    //console.log(user);
    // make a JWT
    const tokenJWT = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token: tokenJWT,
      rol: user.rol,
    });
  } catch (err) {
    next(createError(401, err));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user,
      },
    });
  } catch (err) {
    next(createError(404, err));
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

    const passHash = await User.hashPassword(password);

    // Create new user to DB
    const newUser = await User.create({
      username,
      email,
      password: passHash,
    });

    // console.log(newUser);

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

export const deleteUserById = async (req, res, next) => {
  try {
    // Check if it is different id
    if (req.params.id !== req.userId) {
      return next(createError(401, 'Unauthorized request!'));
    }

    // console.log(req.params.id, req.userId);

    // Delete user from DB
    await User.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    if (req.params.id !== req.userId) {
      return next(createError(401, 'Unauthorized request!'));
    }

    const { newUsername, newEmail, newPassword, newPasswordConf } = req.body;

    const newUserData = {};

    if (newUsername) newUserData.username = newUsername;

    if (newEmail) newUserData.email = newEmail;

    if (newPassword && newPasswordConf) {
      if (newPassword !== newPasswordConf) {
        return next(
          createError(
            400,
            'Your password and validation password does not match'
          )
        );
      }
      newUserData.password = await User.hashPassword(newPassword);
    }

    if (Object.keys(newUserData).length === 0) {
      return next(createError(400, 'No data to change'));
    }

    const userUpd = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: userUpd,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const findAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: users.length,
        users,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const addList = async (req, res, next) => {
  try {
    const { usersList } = req.body;

    const users = await User.insertMany(usersList);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: users.length,
        users,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};
