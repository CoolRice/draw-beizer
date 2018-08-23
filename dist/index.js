'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bezier = function () {
  function Bezier(target, points, config) {
    _classCallCheck(this, Bezier);

    var ctx = target.getContext('2d');
    ctx.width = config.width;
    ctx.height = config.height;

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
    key: 'calcStep',
    value: function calcStep() {
      var totalLength = 0;
      for (var i = 0; i < this.points.length - 1; i += 1) {
        totalLength += Bezier.distance(this.points[i], this.points[i + 1]);
      }
      this.step = 1 / totalLength;
    }
  }, {
    key: 'draw',
    value: function draw() {
      for (var t = 0; t <= 1; t += this.step) {
        var curvePoint = Bezier.getCurvePoint(t, this.points);
        this.drawDot(curvePoint, this.ctx);
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
      // if(n < i) throw "Wrong";
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

// export default Bezier;

var c = document.getElementById('myCanvas');

var points = [[0, 0], [200, 100], [100, 200], [200, 150]];

var berzier = new Bezier(c, points, {
  width: 500,
  height: 400
});

berzier.draw();