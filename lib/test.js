var Minimatch = require("minimatch");
async = require('async'),
fs = require('fs'),
path   = require('path'),
util    = require('util'),
glob    = require('glob'),
_       = require('lodash');


//parse arguments for the path type and options
//read the contents of the dir
//check for dirs
//recurse read dir
//call the callback for each file
//call done
//
//



/**
* description A helper object for easy access to util methods
* @type {Object}
* @private
*/
var Helper = {};
// Windows?
var win32 = process.platform === 'win32';
var kindsOf = {};
'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function(k) {
  kindsOf['[object ' + k + ']'] = k.toLowerCase();
});

/**
 * description A helper method for inspecting a Objects type
 * does a lookup in the kindsOf object
 * @type {string}
 * @returns {string}
 */
Helper.kindOf = function(value) {
  // Null or undefined.
  if (value == null) { return String(value); }
  // Everything else.
  return kindsOf[kindsOf.toString.call(value)] || 'object';
}; 

Helper.glob = require('glob');
Helper.minimatch = require('minimatch');

/**
 * description True if the path is a directory.
 * @returns {boolean}
 * @type {function}
 * 
 */

Helper.isDir = function() {
  var filepath = path.join.apply(path, arguments);
  return file.exists(filepath) && fs.statSync(filepath).isDirectory();
};

/**
 * description True if the path is a file.
 * @returns {boolean}
 * @type {function}
 * 
 */
Helper.isFile = function() {
  var filepath = path.join.apply(path, arguments);
  return file.exists(filepath) && fs.statSync(filepath).isFile();
};

/**
 * description  Normalize \\ paths to / paths.
 * @params {String}
 * @returns {String}
 * @type {function}
 */
Helper.unixifyPath = function(filepath) {
  if (win32) {
    return filepath.replace(/\\/g, '/');
  } else {
    return filepath;
  }
};

function waterfall(arr,callback){
  return async.waterfall(arr,
    function(results){
      if (err) {
        callback(err,null); 
      }
      callback(null,results);
    });
}

//waterfall([function(cb){cb(options,done)},parseArgs,readDir,filterIgnores,recurseDir,sendModuleToCaller],done)

/**
* description This the contructor for a module which can require your entire directory
* and give you a event and each found file or call a callback on each file
* @params {Object} A configuration object for specifying 
* @params {Function} callback function that will be called on each file found
* @returns {Array}
*/
function Factory(options,callback){
  if(!(this instanceof Factory)){
    return new Factory(options,callback);
  }
  var opts = _.extend({},options);
  this._options = _.extend(otps,options || {});
  //return waterfall([function(cb){cb(options,done)}],callback)
}


// Return an array of all file paths that match the given wildcard patterns.
Factory.prototype.expand = function() {
  var args = _.toArray(arguments);
  // If the first argument is an options object, save those options to pass
  // into the file.glob.sync method.
  var options = Helper.kindOf(args[0]) === 'object' ? args.shift() : {};
  // Use the first argument if it's an Array, otherwise convert the arguments
  // object to an array and use that.
  var patterns = Array.isArray(args[0]) ? args[0] : args;
  // Return empty set if there are no patterns or filepaths.
  if (patterns.length === 0) { return []; }
  // Return all matching filepaths.
  var matches = this.processPatterns(patterns, function(pattern) {
    // Find all matching files for this pattern.
    console.log(typeof pattern , 'pattern');
    return Helper.glob.sync(pattern, options);
  });
  // Filter result set?
  if (options.filter) {
    matches = matches.filter(function(filepath) {
      filepath = path.join(options.cwd || '', filepath);
      try {
        if (typeof options.filter === 'function') {
          return options.filter(filepath);
        } else {
          // If the file is of the right type and exists, this should work.
          return fs.statSync(filepath)[options.filter]();
        }
      } catch (e) {
        // Otherwise, it's probably not the right type.
        return false;
      }
    });
  }
  return matches;
};
/**
 * description Process specified wildcard glob patterns or filenames against a
 * callback, excluding and uniquing files in the result set.
 * @params {String}
 * @params {function}
 * @returns {Array}
 */

Factory.prototype.processPatterns = function(patterns, fn) {
  // Filepaths to return.
  var result = [];
  // Iterate over flattened patterns array.
  _.flatten(patterns).forEach(function(pattern) {
    // If the first character is ! it should be omitted
    var exclusion = pattern.indexOf('!') === 0;
    // If the pattern is an exclusion, remove the !
    if (exclusion) { pattern = pattern.slice(1); }
    // Find all matching files for this pattern.
    var matches = fn(pattern);
    if (exclusion) {
      // If an exclusion, remove matching files.
      result = _.difference(result, matches);
    } else {
      // Otherwise add matching files.
      result = _.union(result, matches);
    }
  });
  console.log(result," result process patterns");
  return result;
};

/**
 * description Recurse into a directory, executing callback for each file.
 *
 */ 
Factory.prototype.recurse = function recurse(rootdir,subdir,callback) {
  var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
  fs.readdirSync(abspath).forEach(function(filename) {
    var filepath = path.join(abspath, filename);
    if (fs.statSync(filepath).isDirectory()) {
      recurse(rootdir, Helper.unixifyPath(path.join(subdir || '', filename || '')),callback);
    } else {
      callback(null,Helper.unixifyPath(filepath), rootdir, subdir, filename);
    }
  });
};
// Match a filepath or filepaths against one or more wildcard patterns. Returns
// all matching filepaths.
Factory.prototype.match = function(options, patterns, filepaths) {
  if (Helper.kindOf(options) !== 'object') {
    filepaths = patterns;
    patterns = options;
    options = {};
  }
  // Return empty set if either patterns or filepaths was omitted.
  if (patterns == null || filepaths == null) { return []; }
  // Normalize patterns and filepaths to arrays.
  if (!Array.isArray(patterns)) { patterns = [patterns]; }
  if (!Array.isArray(filepaths)) { filepaths = [filepaths]; }
  // Return empty set if there are no patterns or filepaths.
  if (patterns.length === 0 || filepaths.length === 0) { return []; }
  // Return all matching filepaths.
  return this.processPatterns(patterns, function(pattern) {
    console.log(options);
    return Helper.minimatch.match(filepaths, pattern, options);
  });
};

// Match a filepath or filepaths against one or more wildcard patterns. Returns
// true if any of the patterns match.
Factory.prototype.isMatch = function() {
  return Factory.prototype.match.apply(Factory, arguments).length > 0;
};

Factory({},function(err,results) {
  
})


var op = {
 patterns:[],
 root:[]
}
