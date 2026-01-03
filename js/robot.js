const colors = [
  "linear-gradient(145deg, #2196F3, #0D47A1)",    // Blue
  "linear-gradient(145deg, #F44336, #B71C1C)",    // Red
  "linear-gradient(145deg, #FF9800, #E65100)",    // Orange
  "linear-gradient(145deg, #4CAF50, #1B5E20)"     // Green
];
const robots = document.querySelectorAll(".robot");

robots.forEach((robot, i) => {
  const startX = 20;
  robot.style.left = startX + "px";
  robot.style.top = `${50 + i*140}px`;
  robot.dataset.moving = "0";
  robot.dataset.direction = "right";

  // HEAD
  const head = document.createElement("div");
  head.className = "head";
  robot.appendChild(head);

  // BODY
  const body = document.createElement("div");
  body.className = "body";
  body.style.background = colors[i];
  robot.appendChild(body);

  // CENTER EMBLEM
  const centerEmblem = document.createElement("div");
  centerEmblem.className = "center-emblem";
  body.appendChild(centerEmblem);

  // EYES
  const leftEye = document.createElement("div");
  leftEye.className = "eye left";
  const rightEye = document.createElement("div");
  rightEye.className = "eye right";
  head.appendChild(leftEye);
  head.appendChild(rightEye);

  // SHOULDERS
  const leftShoulder = document.createElement("div");
  leftShoulder.className = "shoulder left";
  const rightShoulder = document.createElement("div");
  rightShoulder.className = "shoulder right";
  robot.appendChild(leftShoulder);
  robot.appendChild(rightShoulder);

  // ARMS
  const leftArm = document.createElement("div");
  leftArm.className = "arm left";
  const rightArm = document.createElement("div");
  rightArm.className = "arm right";
  robot.appendChild(leftArm);
  robot.appendChild(rightArm);

  // HANDS
  const leftHand = document.createElement("div");
  leftHand.className = "hand left";
  const rightHand = document.createElement("div");
  rightHand.className = "hand right";
  robot.appendChild(leftHand);
  robot.appendChild(rightHand);

  // HIPS
  const leftHip = document.createElement("div");
  leftHip.className = "hip left";
  const rightHip = document.createElement("div");
  rightHip.className = "hip right";
  robot.appendChild(leftHip);
  robot.appendChild(rightHip);

  // LEGS
  const leftLeg = document.createElement("div");
  leftLeg.className = "leg left";
  const rightLeg = document.createElement("div");
  rightLeg.className = "leg right";
  robot.appendChild(leftLeg);
  robot.appendChild(rightLeg);

  // FEET
  const leftFoot = document.createElement("div");
  leftFoot.className = "foot";
  leftLeg.appendChild(leftFoot);
  
  const rightFoot = document.createElement("div");
  rightFoot.className = "foot";
  rightLeg.appendChild(rightFoot);

  // BACKPACK (only on some robots for variety)
  if (i % 2 === 0) {
    const backpack = document.createElement("div");
    backpack.className = "backpack";
    robot.appendChild(backpack);
  }

  // Click to start movement
  robot.addEventListener("click", () => {
    if (robot.dataset.moving === "1") return;
    robot.dataset.moving = "1";

    function move() {
      let x = parseInt(robot.style.left);

      if (robot.dataset.direction === "right") {
        x += 2;
        robot.style.transform = "scaleX(1)";
        if (x + robot.offsetWidth >= window.innerWidth - 10) {
          robot.style.transition = "transform 0.3s";
          robot.style.transform = "scaleX(-1)";
          setTimeout(() => {
            robot.style.transition = "";
            robot.dataset.direction = "left";
          }, 300);
        }
      } else if (robot.dataset.direction === "left") {
        x -= 2;
        robot.style.transform = "scaleX(-1)";
        
        if (x <= startX) {
          robot.style.left = startX + "px";
          robot.style.transition = "transform 0.3s";
          robot.style.transform = "scaleX(1)";
          
          setTimeout(() => {
            robot.style.transition = "";
            robot.dataset.moving = "0";
            robot.dataset.direction = "right";
            return;
          }, 300);
        }
      }

      if (robot.dataset.moving === "1") {
        robot.style.left = x + "px";
        requestAnimationFrame(move);
      }
    }

    requestAnimationFrame(move);
  });
});
