function f(x) {
  return x*Math.sin(x);
}
class Graphics1d {
  constructor() {
    this.xmin = -5.0;
    this.xmax = 5;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 600;
    this.H = 600;
    this.y = new Float64Array(this.W);
  }

  evaluate() {
    let i = 0;
    let X;
    let L = this.W;
    let l = this.xmax - this.xmin;
    let dx = l / this.W;
    let S = L / l;

    for (let x = this.xmin; x <= this.xmax; x += dx) {
      this.y[i] = f(x);
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
    let Y_2;

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = this.H;
    canvas.width = this.W;

    // Сетка координат
    for (var x = 0; x < Math.max(this.W, this.H); x += this.W / lx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, Math.max(this.W, this.H));
    }

    for (var y = 0; y < Math.max(this.W, this.H); y += this.W / ly) {
      ctx.moveTo(0, y);
      ctx.lineTo(Math.max(this.W, this.H), y);
    }

    ctx.strokeStyle = "#888";
    ctx.stroke();

    // координата Х
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    Y = -(0 - this.ymin) * Sy + this.H;
    ctx.moveTo(X, Y);

    for (let x = this.xmin; x <= this.xmax; x += dx) {
      X = (x - this.xmin) * Sx;
      Y = -(0 - this.ymin) * Sy + this.H;
      ctx.lineTo(X, Y);
    }
    ctx.stroke();

    // координата Y
    ctx.strokeStyle = "blue";
    X = (0 - this.xmin) * Sx;
    Y = this.H;
    ctx.moveTo(X, Y);

    for (let y = this.ymin; y <= this.ymax; y += dx) {
      X = (0 - this.xmin) * Sx;
      Y = -(y - this.ymin) * Sy + this.H;
      ctx.lineTo(X, Y);
    }
    ctx.stroke();

    // Функция
    X = (0 - this.xmin) * Sx + 0;
    ctx.beginPath();
    ctx.strokeStyle = "red";
    Y = -(this.y[0] - this.ymin) * Sy + this.H;
    for (let x = this.xmin; x <= this.xmax; x += dx) {
      X = (x - this.xmin) * Sx;
      Y = -(this.y[i] - this.ymin) * Sy + this.H;
      if (Math.abs(Y_2) - Math.abs(Y) > 10) {
        ctx.lineTo(X, Y);
      }
      ctx.lineTo(X, Y);
      Y_2 = Y;
      i++;
    }
    ctx.stroke();

    // Нули функции
    i = 0;
    for (let x = this.xmin; x <= this.xmax; x += dx) {
      X = (x - this.xmin) * Sx;
      Y = -(this.y[i] - this.ymin) * Sy + this.H;
      if (
        (x >= -0.15 && x <= 0.15) ||
        (this.y[i] >= -0.15 && this.y[i] <= 0.15)
      ) {
        ctx.beginPath();
        ctx.arc(X, Y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      i++;
    }

    // Рисовка больше или меньше
    i = 0;
    ctx.beginPath();
    ctx.moveTo(this.W, 0);
    ctx.lineTo(0, 0);
    for (let x = this.xmin; x <= this.xmax; x += dx) {
      X = (x - this.xmin) * Sx;
      Y = -(this.y[i] - this.ymin) * Sy + this.H;
      ctx.lineTo(X, Y);
      if (this.y[i] > 0) {
        ctx.lineTo(X, Y);
      }
      i++;
    }
    ctx.fillStyle = "rgba(100,150,185,0.5)";
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillText("xmin=", 10, this.H - 40);
    ctx.fillText("ymin=", 10, this.H - 20);
    ctx.fillText("xmax=", this.W - 100, 20);
    ctx.fillText("ymax=", this.W - 100, 40);
    ctx.fillText(this.xmin, 70, this.H - 40);
    ctx.fillText(this.ymin, 70, this.H - 20);
    ctx.fillText(this.xmax, this.W - 30, 20);
    ctx.fillText(this.ymax, this.W - 30, 40);
  }

  autodraw() {
    let min = 999999;
    let max = -999999;
    for (let i = 0; i <= this.y.length; i++) {
      if (min > this.y[i]) {
        min = this.y[i];
      }
      if (max < this.y[i]) {
        max = this.y[i];
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

// (0-this.xmin)*Sx
// -(0-this.ymin)*Sy+this.H

/* !!!! ИДЕЯ РАЗВИТЬ !!!!!!
if(Math.round(x) >=  0 || Math.round(this.y[i]) >= 0){
        ctx.arc(X, Y, 5, 0, 2*Math.PI);
      }
*/
