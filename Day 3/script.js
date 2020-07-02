function F(x, y) {
  return x * x + y * y - 9;
}
// =====================================================================

var pixctx = mypixcanvas.getContext("2d");
let alph = Math.PI / 6;

class Graphics1d {
  constructor() {
    this.xmin = -5.0;
    this.xmax = 5.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 500;
    this.H = 500;
    mypixcanvas.width = this.W;
    mypixcanvas.height = this.H;
    this.imgData = pixctx.getImageData(0, 0, this.W, this.H);
    this.z = new Float64Array(this.W * this.H);
  }

  evaluate() {
    let i = 0;
    let X = 0; //Screen X
    let Y = 0; //Screen Y
    for (let p = 0; p < this.H * this.W * 4; p += 4) {
      let x = X / 10;
      let y = -Y / 10;
      x -= this.W / 20;
      y += this.H / 20;
      const th = 1 / 250;
      let axis_x = Math.abs(y) < th;
      let axis_y = Math.abs(x) < th;
      let axes = (axis_x + axis_y) * 100;
      let grid_vertical = Math.abs(x % 1) < th;
      let grid_horizontal = Math.abs(y % 1) < th;
      let grid = (grid_vertical + grid_horizontal) * 75;
      let axes_and_grid = axes + grid;
      this.z[i] = F(x, y);
      let a = Math.abs(this.z[i]);
      let F1 = (255 / a) * 6;

      var RGBA = this.imgData.data;

      if (this.z[i] > 0) {
        RGBA[p + 0] = F1;
      }
      RGBA[p + 1] = axes_and_grid;

      if (this.z[i] < 0) {
        RGBA[p + 2] = F1;
      }
      RGBA[p + 3] = 255;

      X++;
      if (X == this.W) {
        X = 0;
        Y++;
      }
      i++;
    }
  }

  draw() {
    let i = 0;
    let Lx = this.W;
    let lx = this.xmax - this.xmin;
    let Ly = this.H;
    let ly = this.ymax - this.ymin;
    let dx = lx / this.W;
    let Sx = Lx / lx;
    let Sy = Ly / ly;
    let X = (0 - this.xmin) * Sx + 0;
    let Y = -(0 - this.ymin) * Sy + this.H;
    for (
      let p = 0;
      p < this.H * this.W * (this.xmax - this.xmin / this.W);
      p += this.xmax - this.xmin / this.W
    ) {
      let x = X;
      let y = -Y;
      const th = 1 / 250;
      let axis_x = Math.abs(y) < th;
      let axis_y = Math.abs(x) < th;
      let axes = (axis_x + axis_y) * 100;
      let grid_vertical = Math.abs(x % 1) < th;
      let grid_horizontal = Math.abs(y % 1) < th;
      let grid = (grid_vertical + grid_horizontal) * 75;
      let axes_and_grid = axes + grid;
      let a = Math.abs(this.z[i]);
      let F1 = (255 / a) * 6;

      var RGBA = this.imgData.data;

      if (this.z[i] > 0) {
        RGBA[p + 0] = F1;
      }
      RGBA[p + 1] = axes_and_grid;

      if (this.z[i] < 0) {
        RGBA[p + 2] = F1;
      }
      RGBA[p + 3] = 255;

      X++;
      if (X == this.xmax) {
        X = 0;
        Y++;
      }
      i++;
    }
    pixctx.putImageData(this.imgData, 0, 0);
  }

  autodraw() {
    let min = 999999;
    let max = -999999;
    for (let i = 0; i <= this.z.length; i++) {
      if (min > this.z[i]) {
        min = this.z[i];
      }
      if (max < this.z[i]) {
        max = this.z[i];
      }
      i++;
    }
    this.ymin = min;
    this.ymax = max;
  }
}

let g = new Graphics1d();

g.evaluate();
g.autodraw();
g.draw();
