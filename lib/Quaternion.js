'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _V = require('./V3');

var _V2 = _interopRequireDefault(_V);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Quaternion implementation heavily adapted from the Quaternion implementation in THREE.js
// https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js

var Quaternion = function () {
  function Quaternion(x, y, z, w) {
    _classCallCheck(this, Quaternion);

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  _createClass(Quaternion, [{
    key: 'applyToVec3',
    value: function applyToVec3(v3) {
      var x = v3.x;
      var y = v3.y;
      var z = v3.z;

      var qx = this.x;
      var qy = this.y;
      var qz = this.z;
      var qw = this.w;

      // calculate quat * vector
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;

      // calculate result * inverse quat
      return new _V2.default(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
    }
  }]);

  return Quaternion;
}();

Quaternion.fromAxisAngle = function (axis, angle) {
  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
  var axisNorm = axis.norm();
  var halfAngle = angle / 2;
  var s = Math.sin(halfAngle);
  return new Quaternion(axisNorm.x * s, axisNorm.y * s, axisNorm.z * s, Math.cos(halfAngle));
};

exports.default = Quaternion;