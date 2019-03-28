require('express-async-errors');
// require('winston-mongodb');
const winston = require('winston');

module.exports = function() {
  // process.on('uncaughtException', (ex) => {
  //   console.log('UNCAUGHT EXCEPTION!!!!!');
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    // console.log('UNHANDLED REJECTION!!!!!');
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/vidly",
  //   level: "error"
  // });

  //throw new Error('Something failed during startup!!');
  // const p = Promise.reject(new Error('Something failed miserably!'))
};
