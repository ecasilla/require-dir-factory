var _fs     = require('fs'),
    _path   = require('path'),
    util    = require('util'),
    Minimatch = require("minimatch");
    

module.exports = Factory();

//require-factory(['lib/**/*.js'],options,function(err,object){
 //return object.initialize();
//})

 var defaults = {
   recurse: false,
 camelcase:false,
   glob:{
     debug:false,
     nobrace:false,
     noglobstar:false,
     dot:false,
     noext:false,
   nocase:false,
     nonull:false,
     matchBase:false,
     nocomment:false,
     nonegate:false,
     flipNegate:false
   }
 }

/**
* description This the contructor for a module which can require your entire directory
* and give you a event and each found file or call a callback on each file
* @params {String,Array} require a Unix glob expression of either a String or an Array
* @params {Object} A configuration object for specifying 
* @params {Function} callback function that will be called on each file found
* @returns {Array}
*/
function Factory(path,options,cb){
  if(! (this instanceof Factory) ){
    return new Factory(path,options,cb);
  }

  path = this._verifyPath(path,options);

  //TODO
  //var files = _fs.readdirSync(path);
  
  return this._importFiles(path, files, cb);
}

/**
 * description v
 *
 */
Factory.prototype._verifyPath = function _verifyPath(path,options) {
  var stats; 

  /// Guard Checks against empty string
  if (typeof path === "undefined" || (typeof path === "string" && path.trim().length === 0) || (Array.isArray(path)) ) {
    throw new Error("The path must be provided when instantiating the object.");
  }

  if (Array.isArray(path)) {
    this.filter(path)
  } else {
    this.guard(path)
    // Resolve the given require path relative to the parent module's directory.
    // This way the user can provide paths that are relative to themselves.
    path = _path.resolve(_path.dirname(module.parent.filename), path);
  }
  return path; 
}

/**
 * description
 *
 */
Factory.prototype.guard = function guard (filePath) {
  //Guard against non existent paths
  try {
    stats = _fs.statSync(filePath);
  } catch (e) {
    throw new Error("The directory Path does not exist. [" + filePath + "]");
  }

  if (!stats.isDirectory()){
    throw new Error("The Path provided is not a directory. [" + filePath + "]");
  }
}

/**
 * description
 *
 */
Factory.prototype._importFiles = function _importFiles(path, files, cb) {
  var moduleList = [],cache = {}, trimmedName,module;

  files.forEach(function (element, index, array){
    // Require each file, skipping dotfiles.
    if (_fs.lstatSync(_path.join(path, element)).isFile() && element.substring(0,1) !== "."){
      trimmedName = _path.basename(element, _path.extname(element));
      module = require(_path.join(path, trimmedName));			
      moduleList.push(module);
      cache[trimmedName] = module;
      cb(null,module);
    }
  });

  cache.length = moduleList.length;
  cache.toArray = function(){return moduleList;};
  console.log(cache)
  return cache; 
}
