var CircleMachine = (function(){

  var canvas = document.getElementById('viewport'),
      canvas2 = document.getElementById('drawSurface'),
      ctx1 = canvas.getContext('2d'),
      ctx2 = canvas.getContext('2d'),
      canvasWidth,
      canvasHeight,
      parentCircle;

      circleArray = [];

  var BG_COLOR = 'rgb(50, 50, 50)';
  
  function setCanvasDimensions(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;  
    
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    canvas2.setAttribute('width', canvasWidth);
    canvas2.setAttribute('height', canvasHeight);
  }  

  function Circle(radius, color){
    this.radius = radius;
    this.color = color;
    this.xPos;
    this.yPos;
    this.angle = -Math.PI/2;
    this.rotationSpeed = 0; 
    this.trackSpeed = 0;
    this.trackLocation = -Math.PI/2;
    this.parentCircle;
         
    this.draw = function(){
      this.penX = this.xPos + this.radius * Math.cos(this.angle);
      this.penY = this.yPos + this.radius * Math.sin(this.angle);

      ctx1.save();
      ctx1.beginPath();
      ctx1.strokeStyle = this.color;
      ctx1.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      ctx1.moveTo(this.xPos, this.yPos);
      ctx1.lineTo(this.penX, this.penY);
      ctx1.stroke();
      ctx1.restore();
      
      this.angle += this.rotationSpeed;
      this.trackLocation += trackSpeed;

      if(parentCircle = this.parentCircle){
         
      } 
    }

    this.createChildCircle = function(radius, color){
      var newCircle = new Circle(radius, color);
      newCircle.xPos = this.xPos;
      newCircle.yPos = this.yPos - this.radius;
      newCircle.rotationSpeed = 0.01;
      newCircle.trackSpeed = 0.01;
      newCircle.parentCircle = this;
    } 

    circleArray.push(this);

 }

  function render(){
    ctx1.save();
      ctx1.fillStyle = BG_COLOR;
      ctx1.fillRect(0,0,canvasWidth, canvasHeight); 
      
      for(i = 0; i < circleArray.length; i++){
        circleArray[i].draw()
      }

    ctx1.restore();
    requestAnimationFrame(render);
  }

  function setBaseCircle(){
    var baseCircle = new Circle(canvasHeight / 2 - 100, 'white');
    baseCircle.xPos = canvasWidth / 2;
    baseCircle.yPos = canvasHeight / 2;
    baseCircle.createChildCircle(50, 'red'); 
  }

  function init(){
    setCanvasDimensions();
    setBaseCircle();
    requestAnimationFrame(render);
  }
  
  init();    
    
  return {
    canvas: canvas
  }
})();
