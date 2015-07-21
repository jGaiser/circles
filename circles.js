var CircleMachine = (function(){

  var canvas = document.getElementById('viewport'),
      canvas2 = document.getElementById('drawSurface'),
      ctx1 = canvas.getContext('2d'),
      ctx2 = canvas.getContext('2d'),
      canvasWidth,
      canvasHeight;

  var BG_COLOR = 'rgb(50, 50, 50)';
  
  function setCanvasDimensions(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;  
    
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    canvas2.setAttribute('width', canvasWidth);
    canvas2.setAttribute('height', canvasHeight);
  }  

  function Circle(radius){
    
  }

  function render(){
    ctx1.save();
      ctx1.fillStyle = BG_COLOR;
      ctx1.fillRect(0,0,canvasWidth, canvasHeight); 
    ctx1.restore();
  }

  function init(){
    setCanvasDimensions();
    render();
    forFun();
  }

  function forFun(){
    var x = canvasWidth / 2, y = canvasHeight / 2;

    ctx1.strokeStyle = 'rgba(20, 200, 20, 0.1)';
    
    setInterval(function(){
      
    ctx1.moveTo(x, y);
    x = (x - 3 + Math.random()*6);
    y = (y - 3 + Math.random()*6);
    ctx1.lineTo(x, y)
    ctx1.stroke(); 
      
    }, 1)
  } 
  
  
  init();    
    
  return {
    canvas: canvas
  }
})();
