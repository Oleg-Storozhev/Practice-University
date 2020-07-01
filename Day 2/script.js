function f(x){
  return x*x;
}
class Graphics1d {
  constructor() {
    this.xmin = -40.0;
    this.xmax = 40.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 120;
    this.H = 100;
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
    
    ctx.beginPath();
    ctx.strokeStyle = "green";
    Y = -(this.y[0]-this.ymin)*Sy+this.H;
    ctx.moveTo(X, Y);
    
    
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
