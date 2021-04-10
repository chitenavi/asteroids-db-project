import createError from 'http-errors';
import User from '../models/userModel';

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

export const deleteUserById = async (req, res, next) => {
  try {
    // Check if it is different id
    if (req.params.id !== req.userId) {
      return next(createError(401, 'Unauthorized request!'));
    }

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
    const userToUp = await User.findById(req.params.id);

    const { newUsername, newEmail, newPassword, newPasswordConf } = req.body;

    if (newUsername) userToUp.username = newUsername;

    if (newEmail) userToUp.email = newEmail;

    if (newPassword || newPasswordConf) {
      if (newPassword !== newPasswordConf) {
        return next(
          createError(
            400,
            'Your password and validation password does not match'
          )
        );
      }
      userToUp.password = newPassword;
    }

    await userToUp.save();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user: userToUp,
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

    console.log(usersList);

    const users = await User.create(usersList);

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
