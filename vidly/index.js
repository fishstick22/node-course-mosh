require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const express = require('express');
const app = express();

// process.on('uncaughtException', (ex) => {
//   console.log('UNCAUGHT EXCEPTION!!!!!');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
winston.handleExceptions(
  new winston.transports.File( { filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex) => {
  // console.log('UNHANDLED REJECTION!!!!!');
  // winston.error(ex.message, ex);
  // process.exit(1);
  console.log('UNHANDLED REJECTION!!!!! exiting...');
  throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, { 
  db: 'mongodb://localhost/vidly',
  level: 'error'
});

//throw new Error('Something failed during startup!!');
const p = Promise.reject(new Error('Something failed miserably!'))

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
// https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
//mongoose.set('useFindAndModify', false);
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/vidly') //, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

//-------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));