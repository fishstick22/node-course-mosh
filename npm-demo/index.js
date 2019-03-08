var _ = require('underscore');

// resolution order
// core module
// file or folder
// node_modules

var result = _.contains([1,2,3],3);
console.log(result);