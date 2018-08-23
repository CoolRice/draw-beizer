class Bezier {
  constructor(target, points, config) {
    const ctx = target.getContext('2d');
    ctx.width = config.width;
    ctx.height = config.height;

    this.target = target;
    this.ctx = ctx;
    this.config = config;
    this.points = points;

    this.calcStep();
  }

  static factorial(num) {
    if (num <= 1) {
      return 1;
    }
    return num * Bezier.factorial(num - 1);
  }

  static Bernstein(i, n, t) {
    return Bezier.factorial(n) / (Bezier.factorial(i) * Bezier.factorial(n - i)) * (t ** i) * ((1 - t) ** (n - i));
  }

  static getCurvePoint(t, points) {
    const r = [0, 0];
    const n = points.length - 1;
    for (let i = 0; i <= n; i += 1) {
      r[0] += points[i][0] * Bezier.Bernstein(i, n, t);
      r[1] += points[i][1] * Bezier.Bernstein(i, n, t);
    }
    return r;
  }

  static distance(a, b) {
    return Math.sqrt(((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2));
  }


  drawDot(point) {
    this.ctx.fillRect(point[0], point[1], 1, 1);
  }


  calcStep() {
    let totalLength = 0;
    for (let i = 0; i < this.points.length - 1; i += 1) {
      totalLength += Bezier.distance(this.points[i], this.points[i + 1]);
    }
    this.step = 1 / totalLength;
  }

  draw() {
    for (let t = 0; t <= 1; t += this.step) {
      const curvePoint = Bezier.getCurvePoint(t, this.points);
      this.drawDot(curvePoint, this.ctx);
    }
  }
}

// export default Bezier;

const c = document.getElementById('myCanvas');

const points = [[0, 0], [200, 100], [100, 200], [200, 150]];

const berzier = new Bezier(c, points, {
  width: 500,
  height: 400,
});

berzier.draw();
