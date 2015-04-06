"use strict"
function A() {
 if (! (this instanceof A)) {
   return new A;
 }
}
A.prototype.init = function() {
 return "init";
}
module.exports = A();
