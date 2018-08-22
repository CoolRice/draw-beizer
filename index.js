

function factorial(num) {
  if (num <= 1) {
    return 1;
  }
  return num * this.factorial(num - 1);
}

function Bernstein(i, n, t) {
  // if(n < i) throw "Wrong";
  return factorial(n) / (factorial(i) * factorial(n - i)) * (t ** i) * ((1 - t) ** (n - i));
}

function getCurvePoint(t, points) {
  const r = [0, 0];
  const n = points.length - 1;
  for (let i = 0; i <= n; i += 1) {
    r[0] += points[i][0] * Bernstein(i, n, t);
    r[1] += points[i][1] * Bernstein(i, n, t);
  }
  return r;
}

class Bezier {
  constructor(target, config) {
    const ctx = target.getContext('2d');
    ctx.width = config.width;
    ctx.height = config.height;

    this.target = target;
    this.ctx = ctx;
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
  }

  draw() {

  }
}

export default Bezier;
