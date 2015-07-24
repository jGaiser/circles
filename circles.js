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
      currentPen;
    
      circleNum = Math.floor(Math.random()*5);

      circleArray = [];
      penArray = [];

  var BG_COLOR = 'rgb(50, 50, 50)';
  
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
      //ctx1.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      ctx1.moveTo(this.xPos, this.yPos);
      if(this.parentCircle){
      //  ctx1.lineTo(this.penX, this.penY);
      };
      ctx1.stroke();
      ctx1.restore();
      
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

  

  function renderCircles(){
    ctx1.save();
      ctx1.fillStyle = BG_COLOR;
      ctx1.fillRect(0,0,canvasWidth, canvasHeight); 
      
      for(i = 0; i < circleArray.length; i++){
        circleArray[i].draw()
      }

    ctx1.restore();

    renderPens();

    requestAnimationFrame(renderCircles);
  }
  
  function renderPens(){
    ctx2.save();
      
      for(i = 0; i < penArray.length; i++){
        ctx2.save();
        ctx2.beginPath();
        pen = penArray[i];
        ctx2.strokeStyle = pen.color;
        
        if(typeof(pen.prevX) === "number"){
          ctx2.moveTo(pen.prevX, pen.prevY);
          ctx2.lineTo(pen.xPos, pen.yPos);
          
          ctx2.stroke();
        }  
        ctx2.restore();
      }

    ctx2.restore(); 
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
    var baseCircle = new Circle(canvasHeight / 2 - 100, 'white');
    baseCircle.xPos = canvasWidth / 2;
    baseCircle.yPos = canvasHeight / 2;
  }

  function init(){
    setCanvasDimensions();
    setBaseCircle();
    generateCircles();
    requestAnimationFrame(renderCircles);
  }
  
  init();    
    
  return {
    canvas: canvas
  }
})();
