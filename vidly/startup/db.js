const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  // https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate

  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
  // by default, you need to set it to false.
  //mongoose.set('useFindAndModify', false);
  // https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);

  mongoose
    .connect("mongodb://localhost/vidly") //, { useNewUrlParser: true })
    .then(() => winston.info("Connected to MongoDB..."));
};
