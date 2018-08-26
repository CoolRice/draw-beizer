'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bezier = function () {
  function Bezier(target, points, config) {
    _classCallCheck(this, Bezier);

    var ctx = target.getContext('2d');
    target.width = config.width;
    target.height = config.height;

    this.target = target;
    this.ctx = ctx;
    this.config = config;
    this.points = points;

    this.calcStep();
  }

  _createClass(Bezier, [{
    key: 'drawDot',
    value: function drawDot(point) {
      this.ctx.fillRect(point[0], point[1], 1, 1);
    }
  }, {
    key: 'drawLine',
    value: function drawLine(startPoint, endPoint) {
      var _ctx, _ctx2;

      (_ctx = this.ctx).moveTo.apply(_ctx, _toConsumableArray(startPoint));
      (_ctx2 = this.ctx).lineTo.apply(_ctx2, _toConsumableArray(endPoint));
      this.ctx.stroke();
    }
  }, {
    key: 'calcStep',
    value: function calcStep() {
      var totalLength = 0;
      for (var i = 0; i < this.points.length - 1; i += 1) {
        totalLength += Bezier.distance(this.points[i], this.points[i + 1]);
      }
      this.step = 1 / totalLength;
    }
  }, {
    key: 'drawControlPoints',
    value: function drawControlPoints() {
      var _this = this;

      var prevPoint = null;
      this.points.forEach(function (point) {
        _this.ctx.beginPath();
        _this.ctx.arc(point[0], point[1], 3, 0, 2 * Math.PI, true);
        _this.ctx.stroke();
        if (_this.config.showControlLine) {
          if (prevPoint) {
            _this.ctx.lineWidth = 2;
            _this.ctx.strokeStyle = 'rgb(200,0,0)';
            _this.drawLine(prevPoint, point);
          }
          prevPoint = point;
        }
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _ctx3;

      this.ctx.beginPath();
      (_ctx3 = this.ctx).moveTo.apply(_ctx3, _toConsumableArray(this.points[0]));
      for (var t = 0; t <= 1; t += this.step) {
        var _ctx4;

        var curvePoint = Bezier.getCurvePoint(t, this.points);
        (_ctx4 = this.ctx).lineTo.apply(_ctx4, _toConsumableArray(curvePoint));
      }
      this.ctx.stroke();

      if (this.config.showControlPoint) {
        this.drawControlPoints();
      }
    }
  }], [{
    key: 'factorial',
    value: function factorial(num) {
      if (num <= 1) {
        return 1;
      }
      return num * Bezier.factorial(num - 1);
    }
  }, {
    key: 'Bernstein',
    value: function Bernstein(i, n, t) {
      return Bezier.factorial(n) / (Bezier.factorial(i) * Bezier.factorial(n - i)) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }
  }, {
    key: 'getCurvePoint',
    value: function getCurvePoint(t, points) {
      var r = [0, 0];
      var n = points.length - 1;
      for (var i = 0; i <= n; i += 1) {
        r[0] += points[i][0] * Bezier.Bernstein(i, n, t);
        r[1] += points[i][1] * Bezier.Bernstein(i, n, t);
      }
      return r;
    }
  }, {
    key: 'distance',
    value: function distance(a, b) {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }
  }]);

  return Bezier;
}();

exports.default = Bezier;