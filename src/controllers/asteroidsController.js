import createError from 'http-errors';
import Asteroid from '../models/asteroidModel';

export const findAll = async (req, res, next) => {
  try {
    // ** SORT
    // Order by one or more keys separated by commas
    // if no sort, then we apply sort by create date by default
    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : 'createdAt';

    // ** FIELDS
    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    // ** PAGINATE
    // Return 20 asteroids by default
    const start = req.query.start * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (start - 1) * limit;

    // Get asteroids, apply sort, limit fields or paginate if it exists
    const asteroids = await Asteroid.listAsteroids(sortBy, fields, limit, skip);
    const totalAsteroids = await Asteroid.countDocuments();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        totalAsteroids,
        results: asteroids.length,
        asteroids,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const addList = async (req, res, next) => {
  try {
    const asteroidsList = req.body;

    const asteroids = await Asteroid.insertMany(asteroidsList);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: asteroids.length,
        asteroids,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const getNeaById = async (req, res, next) => {
  try {
    const asteroid = await Asteroid.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        asteroid,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const createNea = async (req, res, next) => {
  try {
    console.log(req.body);

    const newAsteroid = await Asteroid.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        asteroid: newAsteroid,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};

export const updateNeaById = async (req, res, next) => {
  try {
    const asteroidUpd = await Asteroid.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        asteroid: asteroidUpd,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};

export const deleteNeaById = async (req, res, next) => {
  try {
    // Second, delete asteroid from DB
    await Asteroid.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err));
  }
};
