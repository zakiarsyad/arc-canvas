let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

// RECTANGLE
// ctx.fillRect(x, y, width, height);
// ctx.fillStyle = "#059dc0";
// ctx.fillRect(100, 100, 100, 100);

// for (let i = 0; i < 10; i++) {
//   let x = Math.random() * innerWidth;
//   let y = Math.random() * innerHeight;

//   ctx.fillStyle = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
//   ctx.fillRect(x, y, 100, 100);
// }

// LINE
// ctx.beginPath();
// ctx.moveTo(100, 200);
// ctx.lineTo(250, 400);
// ctx.strokeStyle = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
// ctx.stroke();

// for (let i = 0; i < 10; i++) {
//   let moveToX = Math.random() * innerWidth;
//   let moveToY = Math.random() * innerHeight;
//   let lineToX = Math.random() * innerWidth;
//   let lineToY = Math.random() * innerHeight;

//   ctx.beginPath();
//   ctx.moveTo(moveToX, moveToY);
//   ctx.lineTo(lineToX, lineToY);
//   ctx.strokeStyle = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
//   ctx.stroke();
// }

// ARC / CIRCLE
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// for (let i = 0; i < 10; i++) {
//   let x = Math.random() * innerWidth;
//   let y = Math.random() * innerHeight;

//   ctx.beginPath();
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
//   ctx.stroke();
// }

// --------------
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let radius = 30;
// let dx = Math.round(Math.random()) * 8 - 4;
// let dy = Math.round(Math.random()) * 8 - 4;

// function animate() {
//   requestAnimationFrame(animate);

//   ctx.clearRect(0, 0, innerWidth, innerHeight);

//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//   ctx.strokeStyle = "blue";
//   ctx.stroke();

//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }
//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }

//   x += dx;
//   y += dy;
// }

// animate();
// --------------

let mouse = {
  x: undefined,
  y: undefined
};
let maxRadius = 40;
let minradius = 2;

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function createCircle(x, y, dx, dy, radius) {
  return {
    x,
    y,
    dx,
    dy,
    radius,
    color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),

    draw: function() {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update: function() {
      if (x + radius > innerWidth || x - radius < 0) {
        dx = -dx;
      }
      if (y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
      }

      x += dx;
      y += dy;

      //interactivity
      if (
        mouse.x - x < 50 &&
        mouse.x - x > -50 &&
        mouse.y - y < 50 &&
        mouse.y - y > -50
      ) {
        if (radius < maxRadius) radius += 1;
      } else if (radius > minradius) radius -= 1;

      this.draw();
    }
  };
}

let circleArray = [];

for (let i = 0; i < 700; i++) {
  let radius = 4;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = Math.round(Math.random()) * 2 - 1;
  let dy = Math.round(Math.random()) * 2 - 1;

  circleArray.push(createCircle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
