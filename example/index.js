import Bezier from '../index';

const c = document.getElementById('myCanvas');

const points = [[150, 100], [300, 10], [450, 100], [800, 600], [100, 600], [150, 100]];

const berzier = new Bezier(c, points, {
  width: 1000,
  height: 1000,
  showControlPoint: true,
  showControlLine: {
    width: 2,

  },
});

berzier.draw();
