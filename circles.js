var CircleMachine = (function(){

// Draw the circles on canvas ctx1 
// Draw the pen on on canvas2 ctx2

  var canvas = document.getElementById('viewport'),
      canvas2 = document.getElementById('drawSurface'),

      ctx1 = canvas.getContext('2d'),
      ctx2 = canvas2.getContext('2d'),

      canvasWidth,
      canvasHeight,
      parentCircle,
      currentPen,
    
      circleNum = Math.floor(Math.random()*5),

      circleArray = [],
      penArray = [],

  BG_COLOR = 'rgb(50, 50, 50)';
  
  function setCanvasDimensions(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;  
    
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    canvas2.setAttribute('width', canvasWidth);
    canvas2.setAttribute('height', canvasHeight);
  }  
  
  function Pen(color){
    this.xPos;
    this.yPos;

    this.prevX;
    this.prevY;

    this.color = color;
    
    this.draw = function(){
      ctx2.save();
        ctx2.beginPath();
        ctx2.strokeStyle = this.color;
        
        if(typeof(this.prevX) === "number"){
          ctx2.moveTo(this.prevX, this.prevY);
          ctx2.lineTo(this.xPos, this.yPos);
          ctx2.stroke();
        }  
      ctx2.restore();
    }  
 
    penArray.push(this);
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
    this.pen;
         
    this.draw = function(){
      this.penX = this.xPos + this.radius * Math.cos(this.angle);
      this.penY = this.yPos + this.radius * Math.sin(this.angle);

      ctx1.save();
      ctx1.beginPath();
      ctx1.strokeStyle = this.color;
      ctx1.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      ctx1.moveTo(this.xPos, this.yPos);
      if(this.parentCircle){
        ctx1.lineTo(this.penX, this.penY);
      };
      ctx1.stroke();
      ctx1.restore();  

      this.step();
    }

    this.step = function(){
      this.angle += this.rotationSpeed;
      this.trackLocation += this.trackSpeed;

      if(parentCircle = this.parentCircle){
        this.xPos = parentCircle.xPos + parentCircle.radius * Math.cos(this.trackLocation);
        this.yPos = parentCircle.yPos + parentCircle.radius * Math.sin(this.trackLocation);
       
        this.pen.prevX = this.pen.xPos;
        this.pen.prevY = this.pen.yPos;
 
        this.pen.xPos = this.penX;
        this.pen.yPos = this.penY;
      } 
    }

    this.createChildCircle = function(radius, color){
      var newCircle = new Circle(radius, color);
      newCircle.xPos = this.xPos;
      newCircle.yPos = this.yPos - this.radius;
      newCircle.rotationSpeed = Math.random()*0.2;
      newCircle.trackSpeed = Math.random()*0.2;
      
      newCircle.parentCircle = this;
      newCircle.pen = new Pen(color);

      return newCircle;
    } 

    circleArray.push(this); 
  }

  function tick(){
    ctx1.clearRect(0,0,canvasWidth,canvasHeight);  
    for(var i = 0; i < circleArray.length; i++){
      circleArray[i].draw(); 
    }

    for(var n = 0; n < penArray.length; n++){
      penArray[n].draw(); 
    }

    requestAnimationFrame(tick);
  }
  
  function generateCircles(){
    for(i = 0; i < circleNum; i++){
      var randum = Math.floor(Math.random() * circleArray.length);
      var randum2 = Math.floor(Math.random() * 150);
      var rColor = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
      console.log(rColor);
      circleArray[randum].createChildCircle(randum2, rColor);  
    }
  }  

  function setBaseCircle(){
    var baseCircle = new Circle(canvasHeight / 2 - 100, 'darkgray');
    baseCircle.xPos = canvasWidth / 2;
    baseCircle.yPos = canvasHeight / 2;
  }

  function init(){
    setCanvasDimensions();
    setBaseCircle();
    generateCircles();
    requestAnimationFrame(tick);
  }
  
  init();    
    
  return {
    canvas: canvas
  }
})();
