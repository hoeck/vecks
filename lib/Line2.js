'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _V = require('./V2');

var _V2 = _interopRequireDefault(_V);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var turn = function turn(p1, p2, p3) {
  var a = p1.x;
  var b = p1.y;
  var c = p2.x;
  var d = p2.y;
  var e = p3.x;
  var f = p3.y;
  var m = (f - b) * (c - a);
  var n = (d - b) * (e - a);
  return m > n + Number.EPSILON ? 1 : m + Number.EPSILON < n ? -1 : 0;
};

// http://stackoverflow.com/a/16725715/35448
var isIntersect = function isIntersect(e1, e2) {
  var p1 = e1.a;
  var p2 = e1.b;
  var p3 = e2.a;
  var p4 = e2.b;
  return turn(p1, p3, p4) !== turn(p2, p3, p4) && turn(p1, p2, p3) !== turn(p1, p2, p4);
};

var _getIntersection = function _getIntersection(m, n) {
  // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  var x1 = m.a.x;
  var x2 = m.b.x;
  var y1 = m.a.y;
  var y2 = m.b.y;

  var x3 = n.a.x;
  var x4 = n.b.x;
  var y3 = n.a.y;
  var y4 = n.b.y;

  var x12 = x1 - x2;
  var x34 = x3 - x4;
  var y12 = y1 - y2;
  var y34 = y3 - y4;
  var c = x12 * y34 - y12 * x34;

  var px = ((x1 * y2 - y1 * x2) * x34 - x12 * (x3 * y4 - y3 * x4)) / c;
  var py = ((x1 * y2 - y1 * x2) * y34 - y12 * (x3 * y4 - y3 * x4)) / c;

  if (isNaN(px) || isNaN(py)) {
    return null;
  } else {
    return new _V2.default(px, py);
  }
};

var dist = function dist(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

var Line2 = function () {
  function Line2(a, b) {
    _classCallCheck(this, Line2);

    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' || a.x === undefined || a.y === undefined) {
      throw Error('expected first argument to have x and y properties');
    }
    if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object' || b.x === undefined || b.y === undefined) {
      throw Error('expected second argument to have x and y properties');
    }
    this.a = new _V2.default(a);
    this.b = new _V2.default(b);
  }

  _createClass(Line2, [{
    key: 'length',
    value: function length() {
      return this.a.sub(this.b).length();
    }
  }, {
    key: 'intersects',
    value: function intersects(other) {
      if (!(other instanceof Line2)) {
        throw new Error('expected argument to be an instance of vecks.Line2');
      }
      return isIntersect(this, other);
    }
  }, {
    key: 'getIntersection',
    value: function getIntersection(other) {
      if (this.intersects(other)) {
        return _getIntersection(this, other);
      } else {
        return null;
      }
    }
  }, {
    key: 'containsPoint',
    value: function containsPoint(point) {
      var eps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-12;

      return Math.abs(dist(this.a, this.b) - dist(point, this.a) - dist(point, this.b)) < eps;
    }
  }]);

  return Line2;
}();

exports.default = Line2;