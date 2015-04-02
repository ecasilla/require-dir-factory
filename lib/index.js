var events = require('events'),
_fs     = require('fs'),
_path   = require('path');

module.exports = Factory();

/**
* description This the contructor for a module which can require your entire directory
* and give you a event and each found file or call a callback on each file
* @params {String}
* @params {String}
* @return {Array}
*/
function Factory(path,cb){
  if(!(this instance Factory)){
    return new Factory(path,cb);
  }
  events.EventEmitter.call(this); 

  path = this._verifyAndResolveDirectory(path);

  var files = _fs.readdirSync(path);

  return this._importFiles(path, files, cb);
}

Factory.prototype._verifyResolveDir = function verifyResolveDir(path) {
  var stats; 

  /// Guard Checks against empty string
  if (typeof path === "undefined" || (typeof path === "string" && path.trim().length === 0)) {
      throw new Error("The path must be provided when instantiating the object.");
    }

    // Resolve the given require path relative to the parent module's directory.
    // This way the user can provide paths that are relative to themselves.
    path = _path.resolve(_path.dirname(module.parent.filename), path);

    try {
      stats = _fs.statSync(path);
    } catch (e) {
      throw new Error("The directory path does not exist. [" + path + "]");
    }

    if (!stats.isDirectory()){
      throw new Error("The path provided is not a directory. [" + path + "]");
    }

    return path; 
}

Factory.prototype._importFiles = function _importFiles(path, files, cb) {
  var moduleList = [],cache = {}, trimmedName,module;

  files.forEach(function (element, index, array){
    // Require each file, skipping dotfiles.
    if (_fs.lstatSync(_path.join(path, element)).isFile() && element.substring(0,1) !== "."){
      trimmedName = _path.basename(element, _path.extname(element));
      module = require(_path.join(path, trimmedName));			
      moduleList.push(module);
      cache[trimmedName] = module;
      this.emit('file',module);
      cb(module);
    }
  });

  cache.length = moduleList.length;
  cache.toArray = function(){return moduleList;};
  console.log(cache)
  return cache; 
}
util.inhertis(events,Factory);
