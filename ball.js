function Ball ( {
  x=Math.random()*100,
  y=Math.random()*100,
  vx=Math.random()*10,
  vy=Math.random()*10,
  gvh=1
}={} ) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.gvh = gvh;
  this.g = 0.8;
  this.appendToBody();
  this.animated();
}

Ball.prototype.refresh = function() {
  var vW = document.documentElement.clientWidth;
  var vH = document.documentElement.clientHeight;
  var ball_w = this.el.scrollWidth;
  var ball_h = this.el.scrollHeight;
  if (this.x >= vW-ball_w) {
    this.x = vW-ball_w;
    // this.vx = -this.vx;
    this.vx = +(-this.vx*this.g);
    this.g -= 0.05;
  }
  if (this.y >= vH-ball_h) {
    this.y = vH-ball_h;
    // this.vy = -this.vy;
    this.vy = +(-this.vy*this.g);
    this.g -= 0.05;

    // this.gvh *= 0.4;
  }
  if (this.y <= 0) {
    this.y = 0;
    this.vy = -this.vy;
  }
  if (this.x <= 0) {
    this.x = 0;
    this.vx = -this.vx;
  }
  if(!isFinite(this.vx)){
    window.clearInterval(this.timer);
    console.log('closed')
  }
  this.el.style.left = this.x + "px";
  this.el.style.top = this.y + "px";
  console.log(this.vy);

}

Ball.prototype.appendToBody = function(dom) {
    this.el = document.createElement("div");
    this.el.className = 'ball';
    this.el.style.backgroundColor = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()*1})`;
    this.refresh();
    document.body.appendChild(this.el);
}

Ball.prototype.animated = function() {
  this.timer = setInterval(()=>{
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gvh;
    this.refresh();
  },1000/60)

}