var FS = require('fs');
var Path = require('path');
var _ = require('lodash');

// make a note of the calling file's path, so that we can resolve relative
// paths. this only works if a fresh version of this module is run on every
// require(), so important: we clear the require() cache each time!
var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);
delete require.cache[__filename];

function requireDir(directory, options, fn) {
  directory = directory || '.';
  if (!directory) {
    throw new Error('Need a director path');
  }
  if (_.isFunction(options) && !fn) {
    fn = options;
  }
  options = _.merge({},options);
  
  // resolve the path to an absolute one:
  directory = Path.resolve(parentDir,directory);

  var filesArray = FS.readdirSync(directory);
  // to prioritize between multiple files with the same basename, we'll
  // first derive all the basenames and create a map from them to files:
  var filesForBase = getBasePaths(filesArray);
  // then we'll go through each basename, and first check if any of the
  // basenames' files are directories, since directories take precedence if
  // we're recursing and can be ignored if we're not. if a basename has no
  // directory, then we'll follow Node's own require() algorithm of going
  // through and trying the require.extension keys in order. in the process,
  // we create and return a map from basename to require()'d contents! and
  // if duplicates are asked for, we'll never short-circuit; we'll just add
  // to the map using the full filename as a key also.
  var cache = {};
}

function getBasePaths(files) {
  return files.reduce(function(prev,curr,i){
    var file = files[i];
    var ext = Path.extname(file);
    var base = Path.basename(file, ext);
    (prev[base] = curr[base] || []).push(file);
    return prev;
  },{});
}

function toCamelCase(str) {
    return str.replace(/[_-][a-z]/ig, function (s) {
        return s.substring(1).toUpperCase();
    });
}

module.exports = requireDir;
