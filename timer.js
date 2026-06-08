let timeLeft = 300000;
const maxTime = 300000;
let isGameOver = false;
let lastTextChecked = "";
let timerStarted = false;

function drawTimeBar() {
  push();
  let barW = windowWidth * 0.4;
  let barH = 24;
  let barX = windowWidth / 2 - barW / 2;
  let barY = 30;

  stroke(0);
  strokeWeight(2);
  fill(40, 40, 40, 220);
  rect(barX, barY, barW, barH, 8);

  let progress = constrain(timeLeft / maxTime, 0, 1);

  colorMode(RGB);
  let barColor = color(255 * (1 - progress), 255 * progress, 50);

  noStroke();
  fill(barColor);
  rect(barX + 2, barY + 2, (barW - 4) * progress, barH - 4, 6);

  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER, CENTER);

  let minutes = floor(timeLeft / 60000);
  let seconds = floor((timeLeft % 60000) / 1000);
  let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);

  if (!timerStarted) {
    text("탈출 제한시간  05:00", windowWidth / 2, barY + barH / 2);
  } else {
    text("탈출 제한시간  " + timeString, windowWidth / 2, barY + barH / 2);
  }
  pop();
}

