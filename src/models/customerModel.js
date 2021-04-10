import mongoose from 'mongoose';

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

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
