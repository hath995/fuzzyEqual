var fuzzyEqual = require('../index.js');
var should = require('should');

describe("Fuzzy Equal",function() {
  var sampleobject = {a:1,b:2};
  var sampleboolean = true;
  var samplenumber = 7;
  var samplestring = "toast";
  var samplearray = [1,2,3,4,5];
  it("should not compare objects of different types",function(){
    fuzzyEqual(samplenumber,sampleboolean).matching_types.should.not.be.true; // number boolean
    fuzzyEqual(samplenumber,samplestring).matching_types.should.not.be.true; // number string 
    fuzzyEqual(samplenumber,sampleobject).matching_types.should.not.be.true; // number object 
    fuzzyEqual(samplenumber,samplearray).matching_types.should.not.be.true; // number array 

    fuzzyEqual(sampleboolean,samplestring).matching_types.should.not.be.true; //boolean string
    fuzzyEqual(sampleboolean,sampleobject).matching_types.should.not.be.true; //boolean object
    fuzzyEqual(sampleboolean,samplearray).matching_types.should.not.be.true; //boolean array 

    fuzzyEqual(samplestring,sampleobject).matching_types.should.not.be.true; //string object
    fuzzyEqual(samplestring,samplearray).matching_types.should.not.be.true; //string array

    fuzzyEqual(sampleobject,samplearray).matching_types.should.not.be.true; //object array 
  });

  it("should compare objects of similiar types", function() {
    fuzzyEqual(sampleobject,sampleobject).matching_types.should.be.true;
    fuzzyEqual(sampleboolean,sampleboolean).matching_types.should.be.true;
    fuzzyEqual(samplenumber,samplenumber).matching_types.should.be.true;
    fuzzyEqual(samplestring,samplestring).matching_types.should.be.true;
    fuzzyEqual(samplearray,samplearray).matching_types.should.be.true;
  });

  it("should compare objects of similiar literal types and should show deep equals", function() {
    fuzzyEqual(sampleboolean,true).deep_equal.should.be.true;
    fuzzyEqual(sampleboolean,false).deep_equal.should.be.false;
    fuzzyEqual(samplenumber,7).deep_equal.should.be.true;
    fuzzyEqual(samplenumber,8).deep_equal.should.be.false;
    fuzzyEqual(samplestring,"toast").deep_equal.should.be.true;
    fuzzyEqual(samplestring,"bagel").deep_equal.should.be.false;
  });
  it("should compare arrays and show deep equals",function(){
    fuzzyEqual(samplearray,[1,2,3,4,5]).deep_equal.should.be.true;
    fuzzyEqual(samplearray,[1,2,3,4]).deep_equal.should.be.false;
    fuzzyEqual([],[]).deep_equal.should.be.true;
  });

  it("should compare objects and show deep equals",function() {
    fuzzyEqual(sampleobject,{a:1,b:2}).deep_equal.should.be.true;
    fuzzyEqual({b:1},{c:1}).deep_equal.should.be.false;
    fuzzyEqual({a:1},{a:1,b:1}).deep_equal.should.be.false;
    fuzzyEqual({},{}).deep_equal.should.be.true;

    fuzzyEqual({a: 1}, {a: "1"}).deep_equal.should.be.false;
  });

  it("should compare arrays and objects recursively",function(){
    fuzzyEqual([{a:1},{b:1}],[{a:1},{b:1}]).deep_equal.should.be.true;
    fuzzyEqual([{a:1},{b:1}],[{a:1},{c:1}]).deep_equal.should.be.false;
    fuzzyEqual({a:[1,2,3]},{a:[1,2,3]}).deep_equal.should.be.true;
  });

  it("should compare things to null correctly", function() {
    fuzzyEqual(sampleobject, null).matching_types.should.be.false;
    fuzzyEqual(sampleboolean,null).matching_types.should.be.false;
    fuzzyEqual(samplenumber, null).matching_types.should.be.false;
    fuzzyEqual(samplestring, null).matching_types.should.be.false;
    fuzzyEqual(samplearray,  null).matching_types.should.be.false;
    fuzzyEqual(null,  null).matching_types.should.be.true;
  });

  it("should compare things to undefined correctly", function() {
    fuzzyEqual(sampleobject, undefined).matching_types.should.be.false;
    fuzzyEqual(sampleboolean,undefined).matching_types.should.be.false;
    fuzzyEqual(samplenumber, undefined).matching_types.should.be.false;
    fuzzyEqual(samplestring, undefined).matching_types.should.be.false;
    fuzzyEqual(samplearray,  undefined).matching_types.should.be.false;
  });

});
