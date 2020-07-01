function f(x){
  return x*x;
}


class Graphics1d {
  constructor() {
    this.xmin = -10.0;
    this.xmax = 10.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 500;
    this.H = 500;
    this.y = new Float64Array(this.W);
  }
  
  evaluate(){
    let i = 0;
    let X;
    let L = this.W;
    let l = this.xmax-this.xmin;
    let dx = l/this.W;
    let S = L/l;
    
    for(let x = this.xmin; x <= this.xmax; x+= dx){
      this.y[i] = f(x);
      i++;
    }
  }
  
  
  draw(){
    let i = 0;
    let Lx = this.W;
    let lx = this.xmax-this.xmin;
    let Ly = this.H;
    let ly = this.ymax-this.ymin;
    let dx = lx/this.W;
    let Sx = Lx/lx;
    let Sy = Ly/ly;
    let X = (0-this.xmin)*Sx+0;
    let Y = -(0-this.ymin)*Sy+this.H;
    
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    canvas.height = this.H;
    canvas.width = this.W;
    
    // Сетка координат
    for (var x = 0; x < Math.max(this.W, this.H); x += this.W/lx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, Math.max(this.W, this.H));
    }

    for (var y = 0; y < Math.max(this.W, this.H); y += this.W/ly) {
      ctx.moveTo(0, y);
      ctx.lineTo(Math.max(this.W, this.H), y);
    }

    ctx.strokeStyle = "#888";
    ctx.stroke();
    
    // координата Х
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    Y = -(0-this.ymin)*Sy+this.H;
    ctx.moveTo(X, Y);
    
    for(let x = this.xmin; x <= this.xmax; x+=dx){
      X = (x-this.xmin)*Sx;
      Y = -(0-this.ymin)*Sy+this.H;
      ctx.lineTo(X, Y);
    }
    ctx.stroke();
    
    // координата Y
    ctx.strokeStyle = "blue";
    X = (0-this.xmin)*Sx;
    Y = this.H;
    ctx.moveTo(X, Y);
    
    for(let y = this.ymin; y <= this.ymax; y+=dx){
      X = (0-this.xmin)*Sx;
      Y = -(y-this.ymin)*Sy+this.H;
      ctx.lineTo(X, Y);
    }
    ctx.stroke();
    
    
    // Функция
    X = (0-this.xmin)*Sx+0;
    ctx.beginPath();
    ctx.strokeStyle = "red";
    Y = -(this.y[0]-this.ymin)*Sy+this.H;
    for(let x = this.xmin; x <= this.xmax; x+=dx){
      X = (x-this.xmin)*Sx;
      Y = -(this.y[i]-this.ymin)*Sy+this.H;
      ctx.lineTo(X, Y);
      i++;
    }
    ctx.stroke();
    
  }
}


let g = new Graphics1d();
g.evaluate();
g.draw();
