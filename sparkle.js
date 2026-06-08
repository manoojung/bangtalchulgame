let sparkles = [];
let activeSparkle = null;
let sparkleRevealedLength = 0;
let sparkleLastTypeTime = 0;
let sparkleTypeSpeed = 50;


function initSparkles() {
  sparkles = [
    { room: 3, xRatio: 0.5, yRatio: 0.18, x: 0, y: 0, message: "벽장을 절대 열지 마시오." },
    { room: 3, xRatio: 0.22, yRatio: 0.85, x: 0, y: 0, message: "벽장을 반드시 여세요." },
    { room: 3, xRatio: 0.88, yRatio: 0.52, x: 0, y: 0, message: "< 곰팡이가 잔뜩 피어있다. >" },
    { room: 3, xRatio: 0.68, yRatio: 0.22, x: 0, y: 0, message: "< 방에 갇힌 지 얼마나 되었을까? >" },
    { room: 3, xRatio: 0.48, yRatio: 0.86, x: 0, y: 0, message: "마님을 돌쇠를 어떻게 생각할까?" }
  ];
}

function drawSparklePopup() {
  push();
  rectMode(CENTER);

  let targetText = activeSparkle.message;
  if (sparkleRevealedLength < targetText.length) {
    if (millis() - sparkleLastTypeTime > sparkleTypeSpeed) {
      sparkleRevealedLength++;
      sparkleLastTypeTime = millis();
    }
  }
  let displayText = targetText.substring(0, sparkleRevealedLength);

  let boxW = max(380, targetText.length * 20);
  let boxH = 140;

  noStroke();
  fill(0, 220);
  rect(windowWidth / 2, windowHeight / 2, boxW, boxH, 15);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(displayText, windowWidth / 2, windowHeight / 2 - 10);

  if (sparkleRevealedLength === targetText.length) {
    textSize(12);
    fill(200, 150 + sin(frameCount * 0.1) * 105);
    text("▲ 클릭 또는 Enter를 눌러 닫기", windowWidth / 2, windowHeight / 2 + boxH / 2 - 20);
  }
  pop();
}

function drawSparkles() {
  for (let i = 0; i < sparkles.length; i++) {
    let sp = sparkles[i];
    if (sp.room === currentRoom) {
      push();
      let pulse = sin(frameCount * 0.12 + i * 5);
      let alpha = 160 + pulse * 95;
      let starSize = 8 + pulse * 3;
      stroke(255, alpha);
      strokeWeight(2);
      fill(255, alpha + 40);
      line(sp.x - starSize, sp.y, sp.x + starSize, sp.y);
      line(sp.x, sp.y - starSize, sp.x, sp.y + starSize);
      rectMode(CENTER);
      noStroke();
      fill(255, alpha);
      rect(sp.x, sp.y, 3, 3);
      pop();
    }
  }
}
