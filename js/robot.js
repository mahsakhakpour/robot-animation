const colors = ["#4fc3f7", "#f44336", "#ffb74d", "#81c784"];
const robots = document.querySelectorAll(".robot");

robots.forEach((robot, i) => {
  const startX = 20;
  robot.style.left = startX + "px";
  robot.style.top = `${50 + i*120}px`;
  robot.dataset.moving = "0";
  robot.dataset.direction = "right";

  // HEAD
  const head = document.createElement("div");
  head.className = "head";
  head.style.background = colors[i];
  robot.appendChild(head);

  // BODY
  const body = document.createElement("div");
  body.className = "body";
  body.style.background = colors[i];
  robot.appendChild(body);

  // EYES
  const leftEye = document.createElement("div");
  leftEye.className = "eye left";
  const rightEye = document.createElement("div");
  rightEye.className = "eye right";
  head.appendChild(leftEye);
  head.appendChild(rightEye);

  // HANDS
  const leftHand = document.createElement("div");
  leftHand.className = "hand left";
  const rightHand = document.createElement("div");
  rightHand.className = "hand right";
  robot.appendChild(leftHand);
  robot.appendChild(rightHand);

  // LEGS
  const leftLeg = document.createElement("div");
  leftLeg.className = "leg left";
  const rightLeg = document.createElement("div");
  rightLeg.className = "leg right";
  robot.appendChild(leftLeg);
  robot.appendChild(rightLeg);

  // Click to start movement
  robot.addEventListener("click", () => {
    if (robot.dataset.moving === "1") return;
    robot.dataset.moving = "1";

    function move() {
      let x = parseInt(robot.style.left);

      if (robot.dataset.direction === "right") {
        x += 2;
        robot.style.transform = "scaleX(1)"; // face right
        if (x + robot.offsetWidth >= window.innerWidth - 10) {
          // Add flip animation at the end
          robot.style.transition = "transform 0.3s";
          robot.style.transform = "scaleX(-1)";
          setTimeout(() => {
            robot.style.transition = "";
            robot.dataset.direction = "left"; // change direction
          }, 300);
        }
      } else if (robot.dataset.direction === "left") {
        x -= 2;
        robot.style.transform = "scaleX(-1)"; // face left
        
        // Check if robot has reached or passed the starting position
        if (x <= startX) {
          // Position exactly at start
          robot.style.left = startX + "px";
          
          // Add flip animation to face right again
          robot.style.transition = "transform 0.3s";
          robot.style.transform = "scaleX(1)";
          
          setTimeout(() => {
            robot.style.transition = "";
            robot.dataset.moving = "0"; // STOP MOVEMENT
            robot.dataset.direction = "right"; // reset direction for next click
            return; // Exit the move function - STOP COMPLETELY
          }, 300);
        }
      }

      // Only continue moving if we haven't stopped
      if (robot.dataset.moving === "1") {
        robot.style.left = x + "px";
        requestAnimationFrame(move);
      }
    }

    requestAnimationFrame(move);
  });
});
