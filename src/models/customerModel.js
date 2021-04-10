import mongoose from 'mongoose';
import Asteroid from './asteroidModel';

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please add a first_name.'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Please add a last_name.'],
    },
    age: {
      type: Number,
      required: [true, 'Please add an age.'],
    },
    hotspot_asteroids: {
      type: Number,
      required: [true, 'Please provide a hotspot asteroids number.'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price.'],
      default: 0,
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
  {
    timestamps: true,
  }
);

customerSchema.methods.getHotspotAsteroids = async function () {
  return Asteroid.countDocuments({
    latitude: { $lt: this.latitude + 15, $gt: this.latitude - 15 },
    longitude: { $lt: this.longitude + 15, $gt: this.longitude - 15 },
  });
};

customerSchema.pre('save', async function (next) {
  try {
    const hotspotAsteroids = await this.getHotspotAsteroids();
    this.hotspot_asteroids = hotspotAsteroids;
    this.price = 170 + ((100 * this.age) / 35 + 10 * hotspotAsteroids);
  } catch (err) {
    next(err);
  }
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
