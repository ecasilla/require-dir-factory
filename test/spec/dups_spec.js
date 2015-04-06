"use strict"
var factory = require(process.cwd() + '/lib'),
fixtures = process.cwd() + '/test/fixtures';
context = describe;

var simple = {
  a:'a.js',
  b:'b.js',
  c:'c.js'
}
describe('The requiring of dulplicates: ', function(){
  it('should require normally', function(){
    var subject = factory(fixtures + '/duplicates');
    expect(subject).to.deep.equal(simple); 
  });
});

