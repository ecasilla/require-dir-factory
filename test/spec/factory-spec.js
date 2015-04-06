"use strict"
var factory = require('../../lib');

factory(process.cwd() + '/test/fixtures/constructors',{recurse:true},function(err,file) {
  console.log(file.init());
});

