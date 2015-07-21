var CircleMachine = (function(){
    
  function sayIt(){
    alert("I'm a function in a module!")
  }

  return {
    sayIt: sayIt
  }

})();
