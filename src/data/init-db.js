import readline from 'readline';
import csvtojson from 'csvtojson';
import Asteroid from '../models/asteroidModel';
// import User from '../models/userModel';
import conn from '../utils/connectMoonDB';

// Delete all data and reload the initial asteroids
const initAsteroidsDB = async () => {
  try {
    console.log('Emptying asteroids collection...');
    await Asteroid.deleteMany();
    console.log('Data successfully deleted!');

    console.log('Loading adverts...');
    // Read CSV file with asteroids
    await csvtojson()
      .fromFile('./OrbitalParameters_PHAs.csv')
      .then(async listAsteroidsObj => {
        // console.log(listAsteroidsObj);
        await Asteroid.create(listAsteroidsObj);

        console.log(
          `Data successfully loaded!. ${listAsteroidsObj.length} asteroids have been created.`
        );
      });
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
};

// Delete all users and reload the initial users, one user for
// development is mandatory
// const initUsersDB = async () => {
//   console.log('Emptying users collection...');
//   await User.deleteMany();

//   console.log('Loading users...');
//   const users = await User.insertMany([
//     {
//       username: 'DevNodePopUser',
//       email: 'user@example.com',
//       password: await User.hashPassword(process.env.DEV_USER_PASS),
//     },
//     {
//       username: 'UserTest2',
//       email: 'user2@example.com',
//       password: await User.hashPassword(process.env.DEV_USER2_PASS),
//     },
//     {
//       username: process.env.ADMIN_USERNAME,
//       email: process.env.ADMIN_EMAIL,
//       avatar: process.env.ADMIN_AVATAR,
//       rol: 'ADMIN',
//       password: await User.hashPassword(process.env.ADMIN_PASS),
//     },
//   ]);
//   // console.log(users);
//   console.log(
//     `Users successfully loaded!. ${users.length} users have been created.`
//   );
// };

function askUser(askText) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(askText, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

conn.once('open', async () => {
  try {
    // Ask to initialize DB
    const response = await askUser('Are you sure to initialize DB? (no/yes) ');

    if (response.toLowerCase() !== 'yes' && response.toLowerCase() !== 'y') {
      console.log('Process aborted!');
      return process.exit();
    }

    await initAsteroidsDB();
    // await initUsersDB();

    // close connection
    conn.close();
    process.exit();
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
});
