const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// const moment = require('moment');
// moment.locale('lt');

const app = express();
const port = 2000; // process.env.PORT vietoje atsiras heroku portas // process.env.PORT || 3000;

const databaseUser = 'Ada';
const databasePassword = 'asiu0419';
const databaseName = 'cars-js-project';
const databasePort = 21895;

const carsRoutes = require('./routes/cars');
const stationsRoutes = require('./routes/stations');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
})
);

// cors config
app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})


// database config
mongoose.connect(
  `mongodb://${databaseUser}:${databasePassword}@ds021895.mlab.com:${databasePort}/${databaseName}`,
  { useNewUrlParser: true }
);


app.get('/', (req, res) => res.send('Automobiliai')); // ++
app.use('/cars', carsRoutes);
app.use('/stations', stationsRoutes);


app.listen(port, () => console.log(`Listening on port ${port}!`));