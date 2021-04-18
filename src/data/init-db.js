import readline from 'readline';
import csvtojson from 'csvtojson';
import Asteroid from '../models/asteroidModel';
import Customer from '../models/customerModel';
import conn from '../utils/connectMoonDB';

// Delete all data and reload the initial asteroids, read from csv file
const initAsteroidsDB = async () => {
  try {
    console.log('Emptying asteroids collection...');
    await Asteroid.deleteMany();
    console.log('Data successfully deleted!');

    console.log('Loading asteroids...');
    // Read CSV file with asteroids
    const asteroids = await csvtojson().fromFile(
      './data/OrbitalParameters_PHAs.csv'
    );

    const resAsteroids = await Asteroid.create(asteroids);

    console.log(
      `Data successfully loaded!. ${resAsteroids.length} asteroids have been created.`
    );
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
};

// Delete all customers and reload the initial customers, read from csv file
const initCustomersDB = async () => {
  console.log('Emptying customers collection...');
  await Customer.deleteMany();

  console.log('Loading customers...');

  const customersReaded = await csvtojson().fromFile(
    `./data/List_Of_Clients.csv`
  );

  const customers = customersReaded.map(e => ({
    first_name: e.Name?.replace('ÿ', ''),
    last_name: e.Lastname,
    age: e.Age,
    latitude: e.Latitude,
    longitude: e.Longitude,
  }));

  const resCustomers = await Customer.create(customers);

  console.log(
    `Users successfully loaded!. ${resCustomers.length} customers have been created.`
  );
};

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
    await initCustomersDB();

    // close connection
    conn.close();
    process.exit();
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
});
