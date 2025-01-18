//CAMERA MOVEMENT
AFRAME.registerComponent("move-where-facing", {
  schema: { speed: { type: "number", default: 0.1 } },
  tick: function () {
    const rigEl = this.el;
    const cameraEl = rigEl.querySelector("#camera");
    const cameraObj = cameraEl.object3D;
    const direction = new THREE.Vector3();

    cameraObj.getWorldDirection(direction);
    direction.y = 0;
    rigEl.object3D.position.addScaledVector(direction, -this.data.speed);
  },
});

// Example for setting the speed dynamically
let ax = 0,
  ay = 0,
  az = 0; // Initial acceleration values

// Check if DeviceMotionEvent is supported
if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", function (event) {
    if (event.acceleration) {
      ax = event.acceleration.x || 0;
      ay = event.acceleration.y || 0;
      az = event.acceleration.z || 0;
    }
  });
} else {
  alert("DeviceMotionEvent is not supported on this device.");
}

// Update the camera rig speed periodically
setInterval(function () {
  const cameraRig = document.querySelector("#cameraRig");
  if (cameraRig) {
    // Calculate the speed based on acceleration
    let move = Math.sqrt(ax * ax + ay * ay + az * az);

    let speed = 0;

    if (move > 0.5) {
      speed = move * 0.015;
    }

    // Set the move-where-facing attribute dynamically
    cameraRig.setAttribute("move-where-facing", `speed: ${speed}`);
  }
}, 100);

//END CAMERA MOVEMENT
