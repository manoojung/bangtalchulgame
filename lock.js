let enteredCode = "";
let isCleared = false;
let fadeAlpha = 0;
let showLockPanel = false;
let showFailBanner = false;

function drawDialLock() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  let panelW = 320;
  let panelH = 420;
  let panelX = windowWidth / 2;
  let panelY = windowHeight / 2 - 40;

  fill(0, 240);
  rect(panelX, panelY, panelW, panelH, 15);

  noStroke();
  fill(230, 210, 180);
  textSize(18);
  text("자물쇠 (네 자리 입력)", panelX, panelY - panelH/2 + 30);

  fill("#DAA520");
  rect(panelX, panelY - 110, panelW - 40, 50, 5);

  fill(240, 200, 120); 
  textSize(28);
  let displayStr = enteredCode;
  while(displayStr.length < 4) {
    displayStr += " _";
  }
  text(displayStr, panelX, panelY - 112);

  let startX = panelX - 80;
  let startY = panelY - 30;
  let btnSpacingX = 80;
  let btnSpacingY = 65;
  let btnSize = 55;

  let buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "C", "0", "E"
  ];

  textSize(22);
  for (let i = 0; i < buttons.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let btnX = startX + col * btnSpacingX;
    let btnY = startY + row * btnSpacingY;

    if (mouseX > btnX - btnSize/2 && mouseX < btnX + btnSize/2 &&
        mouseY > btnY - btnSize/2 && mouseY < btnY + btnSize/2) {
      fill(90, 70, 55);
    } else {
      fill(60, 45, 35);
    }

    stroke(140, 110, 80);
    strokeWeight(2);
    rect(btnX, btnY, btnSize, btnSize, 8);

    noStroke();
    if (buttons[i] === "C") fill(240, 100, 100);
    else if (buttons[i] === "E") fill(100, 240, 100);
    else fill(245, 230, 200);

    text(buttons[i], btnX, btnY - 2);
  }

  fill(180);
  textSize(13);
  text("▲ 패널 바깥을 클릭하면 다이얼을 닫습니다", panelX, panelY + panelH/2 - 25);
  pop();
}

function drawFailBanner() {
  push();
  rectMode(CENTER);

  fill(0, 100);
  rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);

  noStroke();
  fill(0, 220);
  rect(windowWidth / 2, windowHeight / 2, 480, 110, 12);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("< 문이 안 열린다 >", windowWidth / 2, windowHeight / 2 - 15);

  textSize(14);
  fill(200, 150 + sin(frameCount * 0.1) * 105);
  text("▶ 클릭 또는 Enter를 누르면 돌아갑니다", windowWidth / 2, windowHeight / 2 + 25);
  pop();
}

function verifySecretCode() {
  if (enteredCode === "3745") {
    if (doorSound) doorSound.play(); 
    showLockPanel = false;
    isCleared = true;                  
  } else {
    showFailBanner = true;
    enteredCode = ""; 
  }
}
