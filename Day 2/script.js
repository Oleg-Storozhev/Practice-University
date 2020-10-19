function f(x, a) {
  return x*x+5;
}
function sign(x){
  if(f(x, 1) > 0){
    return 1;
  }
  if(f(x, 1) < 0){
    return -1;
  }
  return 0;
}

class Graphics1d {
  constructor() {
    this.xmin = -5.0;
    this.xmax = 5.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 450;
    this.H = 450;
    this.y = new Float64Array(this.W);
    this.a = 1;
    this.dx = 0.000000001;
    this.time = 500;
  }
  
  Ridder(x_0, x_2){
    let l = this.xmax - this.xmin;
    let dx = l / this.W;
    let i = 1;
    let ii = 0;
    let vec_x = new Float64Array(this.W);
    let vec_x1 = new Float64Array(this.W);
    let vec_inter = new Float64Array(this.W);
    let vec_y = new Float64Array(this.W);
    let x_3;
    let x_1;
    let check = false;
    let count = 0;
    
    const canvas = document.getElementById("canvas");
    const ctx2 = canvas.getContext("2d");
  
    for (let x = this.xmin; x <= this.xmax; x += dx) {
      if(this.y[i]*this.y[i-1] < 0){
        check = true;
        
        x_0 = x-dx;
        x_2 = x;
        x_1 = (x_0+x_2)/2;
        let inter = 1;
        for(let x = x_2; x <= this.xmax; x += 0){
          let dx1 = x_1-x_0;
          let f1_a = f(x_1, this.a);
          let f0_a = f(x_0, this.a);
          let f2_a = f(x_2, this.a);
          let num = dx1*sign(x_0)*f1_a;
          let det = f1_a*f1_a-f0_a*f2_a;
          let den = Math.sqrt(det);
          x_3 = x_1+num/den;
          
          if(x_3*x_1 < 0){
             break;
          }
          
          let d1 = Math.abs(x_3-x_2);
          let d2 = Math.abs(x_2-x_1);
          
          if (Math.max(d1,d2) < this.dx){
            let Sy = this.H / (this.ymax - this.ymin);
            let Y = -(0 - this.ymin) * Sy + this.H;
            let Sx = this.W / (this.xmax - this.xmin);
            let X = (x_3 - this.xmin) * Sx;
            vec_x1[ii] = x;
            vec_x[ii] = X;
            vec_y[ii] = Y;
            vec_inter[ii] = inter;
            ii++;
            count++;
            break;
          }
          x_0 = x_1;
          x_2 = x_3;
          x_1 = (x_2+x_0)/2;
          x = x_3;
          inter++;
      }
    }
      i++;
    }
    
    if(check === false){
      document.write('Imposible, every f(x0)f(x2) > 0');
    }
    
    ii = 0;
    var n = setInterval(dinamic, this.time);
    function dinamic(){
      ctx2.beginPath();
      ctx2.arc(vec_x[ii], vec_y[ii], 3, 0, 2 * Math.PI);
      ctx2.fillStyle = "green";
      ctx2.fill();
      text.value += ii+1+") x = "+vec_x1[ii]+"\t Inter = "+vec_inter[ii]+"\n\n";
      ii++;
      if(ii >= count){
        mytag.innerHTML += "Count = "+count;
        clearInterval(n);
      }
    }
  }
  
  evaluate() {
    let i = 0;
    let X;
    let L = this.W;
    let l = this.xmax - this.xmin;
    let dx = l / this.W;
    let S = L / l;

    for (let x = this.xmin; x <= this.xmax; x += dx) {
      this.y[i] = f(x, this.a);
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
    let min = this.ymax;
    let max = this.ymin;
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
g.Ridder(this.xmin, this.xmax);
