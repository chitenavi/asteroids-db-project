import mongoose from 'mongoose';

const asteroidSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      index: true,
      required: [true, 'An asteroid must have a name.'],
    },
    a: {
      type: Number,
      required: [true, 'An asteroid must have a semiaxis value.'],
    },
    e: {
      type: Number,
      required: [true, 'An asteroid must have a eccentricity value.'],
    },
    i: {
      type: Number,
      required: [true, 'An asteroid must have a inclination value.'],
    },
    om: {
      type: Number,
      required: [
        true,
        'An asteroid must have a longitude of the ascending node value.',
      ],
    },
    w: {
      type: Number,
      required: [true, 'An asteroid must have a perihelio argument value.'],
    },
    ma: {
      type: Number,
      required: [true, 'An asteroid must have a mean anomaly value.'],
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

asteroidSchema.statics.listAsteroids = function (sortBy, fields, limit, skip) {
  const query = this.find().sort(sortBy).select(fields).limit(limit).skip(skip);

  return query;
};

const Asteroid = mongoose.model('Asteroid', asteroidSchema);

export default Asteroid;
