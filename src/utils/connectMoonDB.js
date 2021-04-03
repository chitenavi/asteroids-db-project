import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB = process.env.DATABASE;

mongoose.connection.on('open', () => {
  console.log(
    `Connected to MongoDB in ${mongoose.connection.name} successful!`
  );
});

mongoose.connection.on('error', err => {
  console.log(`Connection error!: ${err}`);
  process.exit(1);
});

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

export default mongoose.connection;
