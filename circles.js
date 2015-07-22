var CircleMachine = (function(){

  var canvas = document.getElementById('viewport'),
      canvas2 = document.getElementById('drawSurface'),
      ctx1 = canvas.getContext('2d'),
      ctx2 = canvas.getContext('2d'),
      canvasWidth,
      canvasHeight,

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
    
    this.draw = function(){
      ctx1.save();

      ctx1.beginPath();
      ctx1.strokeStyle = this.color;
      ctx1.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      ctx1.stroke();
      ctx1.restore();
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
  }

  function setBaseCircle(){
    var circle = new Circle(50, 'white');
    circle.xPos = canvasWidth / 2;
    circle.yPos = canvasHeight / 2;
  }

  function init(){
    setCanvasDimensions();
    setBaseCircle();
    render();
  }
  
  init();    
    
  return {
    canvas: canvas
  }
})();
