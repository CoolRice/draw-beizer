"use strict";

// sketch

/**Computes factorial*/
function fact(k) {
  if (k == 0 || k == 1) {
    return 1;
  } else {
    return k * fact(k - 1);
  }
}

/**Computes Bernstain
*@param {Integer} i - the i-th index
*@param {Integer} n - the total number of points
*@param {Number} t - the value of parameter t , between 0 and 1
**/
function B(i, n, t) {
  //if(n < i) throw "Wrong";
  return fact(n) / (fact(i) * fact(n - i)) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

/**Computes a point's coordinates for a value of t
*@param {Number} t - a value between o and 1
*@param {Array} points - an {Array} of [x,y] coodinates. The initial points
**/
function P(t, points) {
  var r = [0, 0];
  var n = points.length - 1;
  for (var i = 0; i <= n; i++) {
    r[0] += points[i][0] * B(i, n, t);
    r[1] += points[i][1] * B(i, n, t);
  }
  return r;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function drawDot(dot, ctx) {
  ctx.fillRect(dot[0], dot[1], 1, 1);
}

function drawDot1(dot, ctx) {
  ctx.beginPath();
  ctx.arc(dot[0], dot[1], 2, 0, 2 * Math.PI, true);
  ctx.stroke();
}

function calcStep(points) {
  var tLength = 0;
  for (var i = 0; i < points.length - 1; i++) {
    tLength += distance(points[i], points[i + 1]);
  }
  return 1 / tLength;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.width = 500;
ctx.height = 400;
//compute the support points
var points = [[0, 0], [200, 100], [100, 200], [200, 150]];

points.forEach(function (p) {
  drawDot1(p, ctx);
});

var step = calcStep(points);
console.log(step);
for (var t = 0; t <= 1; t = t + step) {
  var p = P(t, points);
  drawDot(p, ctx);
  console.log(p);
}

// drawDot({ x: 10, y: 10 }, ctx)
