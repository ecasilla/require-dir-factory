"use strict"
function B() {
 if (! (this instanceof B)) {
   return new B;
 }
}
B.prototype.init = function() {
 return "init";
}
module.exports = B();
