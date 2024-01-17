AFRAME.registerComponent("player-movement", {
    init: function () {
      console.log("welcome")
      this.walk();

    },
    walk: function () {
      console.log("welcome1")
      window.addEventListener("keydown", (e) => {
        console.log("welcome2")
        // Add the condition to play sound
        if ( e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" )
        {
          var entity = document.querySelector("#sound2");
          entity.components.sound.playSound(); 
        } 
    }); 
  }, 
});

  