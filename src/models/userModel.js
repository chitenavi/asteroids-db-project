import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username.'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: [true, 'That email is already in use.'],
      lowercase: true,
      validate: [validator.isEmail, 'Please add a valid email.'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: [6, 'Password should be at least 6 characters.'],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (plainTextPass) {
  return await bcrypt.hash(plainTextPass, 10);
};

userSchema.methods.comparePasswords = async function (
  tryPassword,
  userPassword
) {
  return await bcrypt.compare(tryPassword, userPassword);
};

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
