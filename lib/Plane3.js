"use strict";

var isObject = require('lodash.isobject');

// # class Plane3

// An immutable 3D Plane defined in the standard ax+by+cz+d=0 form.
//
var Plane3 = function(x) {
  var a;
  var b;
  var c;
  var d;

  if (arguments.length === 4) {
    a = arguments[0];
    b = arguments[1];
    c = arguments[2];
    d = arguments[3];
  } else if (isObject(x) && ('a' in x)) {
    a = x.a;
    b = x.b;
    c = x.c;
    d = x.d;
  } else {
    throw new Error('invalid construction of Plane3');
  }

  // Creates issues with unit tests
  if (a === -0) {
    a = 0;
  }
  if (b === -0) {
    b = 0;
  }
  if (c === -0) {
    c = 0;
  }
  if (d === -0) {
    d = 0;
  }

  this.__defineGetter__('a', function() {
    return a;
  });
  this.__defineGetter__('b', function() {
    return b;
  });
  this.__defineGetter__('c', function() {
    return c;
  });
  this.__defineGetter__('d', function() {
    return d;
  });

  this.__defineSetter__('a', function() {
    throw new Error('Plane3 is immutable');
  });
  this.__defineSetter__('b', function() {
    throw new Error('Plane3 is immutable');
  });
  this.__defineSetter__('c', function() {
    throw new Error('Plane3 is immutable');
  });
  this.__defineSetter__('d', function() {
    throw new Error('Plane3 is immutable');
  });

};

// From points
Plane3.fromPoints = function(pa,pb,pc) {
  if (arguments.length !== 3) {
    throw new Error('3 points arguments required');
  }
  var ab = pb.sub(pa);
  var bc = pc.sub(pb);
  var n = ab.cross(bc).normalize();
  return Plane3.fromPointAndNormal(pa, n);
};

// From point and normal
Plane3.fromPointAndNormal = function(p, n) {
  var a = n.x;
  var b = n.y;
  var c = n.z;
  var d = -(p.x*a + p.y*b + p.z*c);
  return new Plane3(n.x, n.y, n.z, d);
};

// String
Plane3.prototype.toString = function() {
  return JSON.stringify(this);
};

// For Node console.log
Plane3.prototype.inspect = function() {
  return this.toString();
};

// Distance to a point
// http://mathworld.wolfram.com/Point-PlaneDistance.html eq 10
Plane3.prototype.distanceToPoint = function(p0) {
  var dd = (this.a*p0.x + this.b*p0.y + this.c*p0.z + this.d) /
    Math.sqrt(this.a*this.a + this.b*this.b + this.c*this.c);
  return dd;
};


module.exports = Plane3;