var dirFactory = require('./lib');

dirFactory('./tasks',{recurse:false},function() {
 // console.log(result);
});

module.exports = dirFactory;
