const mongoose = require('mongoose');

module.exports = function(req, res, next)  {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        // console.log(`guess ${req.params.id} is considered invalid id`);
        return res.status(404).send("Invalid ID!");
      } //else console.log(`guess ${req.params.id} is considered valid id`);
    
      next();
}