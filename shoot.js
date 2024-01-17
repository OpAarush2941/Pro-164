AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera-rig").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    var elementHit = e.detail.body.el;

        var paint = document.createElement("a-entity");
        var position = element.getAttribute("position");
        var rotation = elementHit.getAttribute("rotation");

        paint.setAttribute("position", {
          x:position.x,
          y:position.y,
          z:position.z,
        });

        paint.setAttribute("rotation", {
          x:rotation.x,
          y:rotation.y,
          z:rotation.z,
        });

        paint.setAttribute("position", {
          x:position.x,
          y:position.y,
          z:position.z,
        });
  
        paint.setAttribute("rotation", {
          x:rotation.x,
          y:rotation.y,
          z:rotation.z,
        });
        paint.setAttribute("scale", {
          x:2,
          y:2,
          z:2
        });
        paint.setAttribute("material",{
          src:"Assets/paint.png"
        });
        paint.setAttribute("geometry", {
          primitive:"plane",
          width:0.5,
          height:0.5
        });
        var scene = document.querySelector("a-scene");
        scene.appendChild(paint);

      //impulse and point vector
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeBullet);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

