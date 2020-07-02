class Graphics2d {
  constructor() {
    this.xmin = -10.0;
    this.xmax = 10.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 450;
    this.H = 450;
    this.z = new Float64Array(this.W * this.H * 4);
    this.f = function f(x, y) {
      return x*x+y*y-81;
    };
  }
  evaluate() {
    let i = 0;
    let Dx = (this.xmax - this.xmin) / this.W;
    let Dy = (this.ymax - this.ymin) / this.H;
    for (let x = this.xmin; x <= this.xmax; x += Dx) {
      for (let y = this.ymin; y <= this.ymax; y += Dy) {
        this.z[i] = this.f(x, y);
        i++;
      }
    }
  }
  
  draw() {
    var canvas = document.getElementById("canvas");
    var pixctx = canvas.getContext("2d");
    var imgData = pixctx.getImageData(0, 0, this.W, this.H);
    var RGBA = imgData.data;

    canvas.height = this.H;
    canvas.width = this.W;

    let alph = Math.PI / 6;
    let X = 0;
    let Y = 0;
    let dx = this.W / (this.xmax - this.xmin);
    let dy = this.H / (this.ymax - this.ymin);

    for (let p = 0; p < this.W * this.H * 4; p += 4) {
      let x = X / this.xmax;
      let y = -Y / this.ymax;
      x -= dx;
      y += dy;
      const th = 10 / Math.min(this.W, this.H);
      let axis_x = Math.abs(y) < th;
      let axis_y = Math.abs(x) < th;
      let axes = (axis_x + axis_y) * 64;
      let grid_vertical = Math.abs(x % 1) < th;
      let grid_horizontal = Math.abs(y % 1) < th;
      let grid = (grid_vertical + grid_horizontal) * 64;
      let axes_and_grid = axes + grid;
      
      let F = this.f(x, y);
      let a = Math.abs(F);
      let F1 = (255 / a) * 6;

      if (F > 0) RGBA[p + 0] = F1;
      RGBA[p + 1] = axes_and_grid;
      if (F < 0) RGBA[p + 2] = F1;
      RGBA[p + 3] = 255;
      X++;
      if (X == this.W) {
        X = 0;
        Y++;
      }
    }
    pixctx.putImageData(imgData, 0, 0);
    pixctx.fillStyle = "white";
    pixctx.fillText("xmin=", 10, this.H - 40);
    pixctx.fillText("ymin=", 10, this.H - 20);
    pixctx.fillText("xmax=", this.W - 100, 20);
    pixctx.fillText("ymax=", this.W - 100, 40);
    pixctx.fillText(this.xmin, 70, this.H - 40);
    pixctx.fillText(this.ymin, 70, this.H - 20);
    pixctx.fillText(this.xmax, this.W - 30, 20);
    pixctx.fillText(this.ymax, this.W - 30, 40);
    pixctx.stroke();
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

let g = new Graphics2d();
g.evaluate();
//g.autodraw();
g.draw();
