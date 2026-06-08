let currentEndIdx = 0; 

let endingLines =  // 배드엔딩 대사
 '돌쇠는 결국 탈출에 실패했다.',
  '마님을 마음에 품고 탈출까지 하려했던 돌쇠',
  '나으리는 결국 돌쇠를 벌했다.',
  '결국 돌쇠는 모든 걸 잃고말았다.'
];

let happyLines = [ // 해피엔딩 대사
 '돌쇠는 마침내 다이얼을 열었다.',
  '돌쇠는 방을 살피는 동안 나으리의 외도 증거품을 아주 많이 수집했다.',
  '외도 증거품들로 마님을 설득해서 반드시 함께 떠날 것이다.',
  '돌쇠는 마님의 손을 붙잡고 함께 도피하기를 간청하였다.',
  '이미 이혼을 고려중이던 마님은 돌쇠의 마음에 감복하여 돌쇠의 청에 응하였다.',
  '돌쇠는 마님을 안고 아주 먼 길을 떠났다.',
  '그들의 미래에는 행복한 일이 잔뜩 일어날 것이다.'
];

let isStamped = false; 
let shakeDuration = 0; 
let imgAlpha = 0; // 엔딩 이미지 페이드 효과
let bgRevealIdx = 3; 

let currentIdx = 0;

// 증거 수집 완료 체크
function checkEvidenceComplete() {
  let evidenceNames = ["비녀", "옷더미", "연서"];
 // 3개 다 인벤토리에 있어야 true
  for (let name of evidenceNames) {
    let found = inventory.some(item => item.name === name);
    if (!found) return false;
  }
  return true;
}

function drawHappyEnding() {
  push();

 // 화면 흔들림 효과 (AI 활용) 
  if (shakeDuration > 0) {
    let shakeIntensity = 8; 
    translate(random(-shakeIntensity, shakeIntensity), random(-shakeIntensity, shakeIntensity));
    shakeDuration--;
  }
// 배경 이밎 페이드 
  if (currentIdx < bgRevealIdx) {
    background(0); 
    imgAlpha = 0;  
  } else {
    background(0); 
    if (imgAlpha < 255) imgAlpha += 5; 
    push();
    tint(255, imgAlpha); // 투명도 적용 (tint - AI 활용) 
    image(happyEndImg, 0, 0, windowWidth, windowHeight); 
    pop();
  }
// 대사 출력
  if (currentIdx < happyLines.length) {
    let boxW = windowWidth * 0.75;  
    let boxH = windowHeight * 0.20; 
    let boxX = windowWidth / 2;
    let boxY = windowHeight / 2;

    rectMode(CENTER);
    fill(255, 220); 
    stroke(0);
    strokeWeight(1.5);
    rect(boxX, boxY, boxW, boxH, 15);

    let currentText = happyLines[currentIdx];
   // 타이핑 효과 (AI 활용) 
    if (revealedLength < currentText.length) {
      if (millis() - lastTypeTime > typeSpeed) {
        revealedLength++;
        lastTypeTime = millis();
      }
    }

    let displayText = currentText.substring(0, revealedLength);

    push();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textSize(windowWidth * 0.018);    
    textLeading(windowWidth * 0.028);  
    fill(0);
    noStroke();
    text(displayText, boxX, boxY, boxW - 80, boxH - 40);
    pop();

   // 대사 끝났을 때 안내
    if (revealedLength === currentText.length) {
      textSize(windowWidth * 0.011);
      fill(100);
      textAlign(RIGHT, BOTTOM);
      text("▶ 클릭 또는 Enter", boxX + boxW / 2 - 20, boxY + boxH / 2 - 12);
    }
  } 
  else {
    drawStatusWindow("자네는 결국 마님을 설득해\n함께 탈출하는 것을 성공했네!", happyStampImg);
  }
  pop(); 
}

function drawBadEnding() {
  push();

  if (shakeDuration > 0) {
    let shakeIntensity = 8; 
    translate(random(-shakeIntensity, shakeIntensity), random(-shakeIntensity, shakeIntensity));
    shakeDuration--;
  }
// 이미지 깜빡임 
  let currentEndImg = (floor(millis() / 1000) % 2 === 0) ? end3 : end3_1;
  image(currentEndImg, 0, 0, windowWidth, windowHeight); 
// 대사 출력
  if (currentEndIdx < endingLines.length) {
    let boxW = windowWidth * 0.6;
    let boxH = windowHeight * 0.12;

    rectMode(CENTER);
    fill(255, 200); 
    stroke(0);
    strokeWeight(1.5);
    rect(windowWidth / 2, windowHeight / 2, boxW, boxH, 10);

    let currentText = endingLines[currentEndIdx];
    if (revealedLength < currentText.length) {
      if (millis() - lastTypeTime > typeSpeed) {
        revealedLength++;
        lastTypeTime = millis();
      }
    }

    let displayText = currentText.substring(0, revealedLength);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(windowWidth * 0.02); 
    text(displayText, windowWidth / 2, windowHeight / 2);
// 타이핑 효과 (AI 활용) 
    if (revealedLength === currentText.length) {
      textSize(windowWidth * 0.011);
      fill(100);
      textAlign(RIGHT, BOTTOM);
      text("▶ 클릭 또는 Enter", windowWidth / 2 + boxW / 2 - 20, windowHeight / 2 + boxH / 2 - 10);
    }
  } 
  else {
    drawStatusWindow("자네는 바람 증거를 모으지 못했거나\n시간 안에 탈출을 실패했네!", stampImg);
  }
  pop();
}


function drawStatusWindow(statusText, stampObj) {
  let statusBoxW = windowWidth * 0.45;
  let statusBoxH = windowHeight * 0.22;
  let statusBoxY = windowHeight / 2 - 40;

  rectMode(CENTER);
  fill(255, 200);
  stroke(0);
  strokeWeight(1);
  rect(windowWidth / 2, statusBoxY, statusBoxW, statusBoxH, 15);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(windowWidth * 0.022);
  textLeading(windowWidth * 0.035); 
  text(statusText, windowWidth / 2, statusBoxY);

  if (!isStamped) {
    textSize(windowWidth * 0.012);
    fill(120);
    textAlign(CENTER, CENTER);
    text("▶ 클릭하거나 Enter를 눌러 결과를 확정하세요.", windowWidth / 2, statusBoxY + (statusBoxH / 2) - 25);
  }

  if (isStamped) {
    push(); 
    imageMode(CENTER);
    translate(windowWidth / 2, statusBoxY); 
    rotate(radians(-12));  
    tint(255, 200);
    image(stampObj, 0, 0, 240, 240); 
    pop(); 

    let btnW = 180; let btnH = 55;
    let btnY = windowHeight / 2 + 110;
    let btnX1 = windowWidth / 2 - 110; 
    let btnX2 = windowWidth / 2 + 110; 

    let hoverBtn1 = mouseX > btnX1 - btnW/2 && mouseX < btnX1 + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2;
    let hoverBtn2 = mouseX > btnX2 - btnW/2 && mouseX < btnX2 + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2;

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    let w1 = hoverBtn1 ? btnW * 1.1 : btnW;
    let h1 = hoverBtn1 ? btnH * 1.1 : btnH;
    let size1 = hoverBtn1 ? 21 : 18;
// 다시하기 버튼
    fill(0, 200); stroke(225); strokeWeight(1);
    rect(btnX1, btnY, w1, h1, 5);
    fill(225); noStroke(); textSize(size1);
    text("놀이 다시하기", btnX1, btnY);

    let w2 = hoverBtn2 ? btnW * 1.1 : btnW;
    let h2 = hoverBtn2 ? btnH * 1.1 : btnH;
    let size2 = hoverBtn2 ? 21 : 18;
// 종료 버튼
    fill(0, 200); stroke(225); strokeWeight(1);
    rect(btnX2, btnY, w2, h2, 5);
    fill(225); noStroke(); textSize(size2);
    text("놀이 그만하기", btnX2, btnY);
  }
}

// 크레딧 
function drawCredits() {
  background(0);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(windowWidth * 0.025);
  let startY = windowHeight * 0.35;
  let lineSpacing = windowHeight * 0.05;

  // 기존 타이틀과 팀명 (크기 예시: 32)
  textSize(32); 
  text("제작자", windowWidth / 2, startY);
  text("team 최강천민", windowWidth / 2, startY + lineSpacing);

  // --- 강수민 파트 ---
  textSize(32); // 이름 폰트 크기
  text("강수민", windowWidth / 2, startY + lineSpacing * 2);
  
  textSize(20); // [소감] 폰트 크기 줄이기
  text("다들힘개를 거꾸로 하면?", windowWidth / 2, startY + lineSpacing * 2 + 25); 


  textSize(32); 
  text("천우정", windowWidth / 2, startY + lineSpacing * 3.5); 
  
  textSize(20); 
  text("플레이어가 스토리에 몰입하면서 게임을 즐길 수 있도록 고민하며 결과물을 완성한 과정이 매우 뿌듯했다.", windowWidth / 2, startY + lineSpacing * 3.5 + 25);


  textSize(32); 
  text("최정은", windowWidth / 2, startY + lineSpacing * 5);
  
  textSize(20);
  text("제가 돌쇠만큼 힘들게 일했으니 돌쇠가 마님과 꼭 행복해졌으면 좋겠습니다.... ", windowWidth / 2, startY + lineSpacing * 5 + 25);

  textSize(windowWidth * 0.04);
  text("감사합니다!", windowWidth / 2, startY + lineSpacing * 7.5);
}

function handleEndingNext() {
  if (gameState === "HAPPY_ENDING") {
    if (currentIdx < happyLines.length) {
      let currentText = happyLines[currentIdx];
      if (revealedLength < currentText.length) {
        revealedLength = currentText.length; 
        return;
      }
      currentIdx++;
      revealedLength = 0;
      lastTypeTime = millis();
    } 
    else if (!isStamped) {
      isStamped = true;
      shakeDuration = 15; 
      if (stampSound && typeof stampSound.play === 'function') stampSound.play(); 
    }
  } 
  else if (gameState === "BAD_ENDING") {
    if (currentEndIdx < endingLines.length) {
      let currentText = endingLines[currentEndIdx];
      if (revealedLength < currentText.length) {
        revealedLength = currentText.length; 
        return;
      }

      currentEndIdx++;
      revealedLength = 0;
      lastTypeTime = millis();

      if (currentEndIdx === 2) {
        if (hitSound && typeof hitSound.play === 'function') hitSound.play();
      } else if (currentEndIdx === 3) {
        if (crySound && typeof crySound.play === 'function') crySound.play();
      }
    } 
    else if (!isStamped) {
      isStamped = true;
      shakeDuration = 15; 
      if (stampSound && typeof stampSound.play === 'function') stampSound.play(); 
    }
  }
}
