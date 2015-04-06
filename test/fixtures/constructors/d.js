"use strict"
function D() {
 if (! (this instanceof D)) {
   return new D;
 }
}
D.prototype.init = function() {
 return "init";
}
module.exports = D();
