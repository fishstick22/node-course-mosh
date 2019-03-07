const log = require('./logger');
const path = require('path');
const os = require('os');
const fs = require('fs');

var loser = 'Jeff';

function sayHello(name) {
    console.log('Hello ' + name);
}


sayHello(loser);

log('Said hello to loser: ' + loser);

var pathObj = path.parse(__filename);
console.log(pathObj);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

//console.log('Total Memory: ' + totalMemory);

// Template string
// ES 6 /ES2015 : ECMAScript 6

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// const files = fs.readdirSync('./');
// console.log(files);

fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});