let scripts = [
  { imgIdx: 0, name: "돌쇠", text: "' 마님, 마님! '" },
  { imgIdx: 0, name: "돌쇠", text: "' 어째서 늘 빈 수레같은 공허한 눈망울로 하늘만 치켜보십니까? '" },
  { imgIdx: 0, name: "돌쇠", text: "' 전 아는 것이라고는 잡곡밥보다야 흰쌀밥이 맛있다는 사실 뿐인, 멍청하기로는 견줄 바 없는 놈팡이라지만, 마님께서 이루말하기 어려운 사연을 갖고 계신 줄은 알겠습니다. '" },
  { imgIdx: 1, name: "돌쇠", text: "도읍엔 이미 나으리가 다른 이와 정을 나누셨다는 소문이 자자합니다." },
  { imgIdx: 1, name: "돌쇠", text: "하늘은 마님께 어찌 이런 고역을 내리시는지요…" },
  { imgIdx: 2, name: "돌쇠", text: "마님... 앙큼한 고양이처럼 혼자서 눈물 흘리지 마시고..." },
  { imgIdx: 2, name: "돌쇠", text: "저를 봐주세요!!!!!!!!!!" },
  { imgIdx: 3, name: "돌쇠", text: "'마님... 내가 나으리라면 마님이 슬프도록 두고 보지 않을 텐데.'" },
  { imgIdx: 3, name: "돌쇠", text: "'몸이 좋아지면... 마님을 데리고 도망가는 거야... 마님이 행복하실 수 있는 곳으로...!'" },
  { imgIdx: 3, name: "돌쇠", text: "나도 마님을 위해 몸을 키워야지..." },
  { imgIdx: 4, name: "나으리", text: "XX 뭐?" },
  { imgIdx: 5, name: "나으리", text: "네 이 놈!! 저 천한 것이 거둬준 은혜는 모조리 잊고 감히 이 몸의 안사람에게 욕정해!!!" },
  { imgIdx: 5, name: "돌쇠", text: "어블성성이십니다!! 오해하신 겁니다!!" },
  { imgIdx: 5, name: "나으리", text: "어불성설이다 천한것아! 그리고 아니긴 뭐가 아니느냐! 여봐라! 당장 이 놈을 잡물고에 가두고 절대로 열어주지 말거라!!" },
  { imgIdx: 5, name: "돌쇠", text: "으아악!!!!!" }
];

let currentScriptIdx = 0;
let revealedLength = 0;
let lastTypeTime = 0;
let typeSpeed = 50;

let transitionAlpha = 0;
let isTransitioning = false;
let nextAction = "";


function drawStartMenu() {
  drawCoverImage(bgImg);
  imageMode(CENTER);
  image(menuBtnImg1, windowWidth / 2 - 150, windowHeight / 2 + 200, btnImgW, btnImgH);
  image(menuBtnImg2, windowWidth / 2 + 150, windowHeight / 2 + 200, btnImgW, btnImgH);
  imageMode(CORNER); 
}

function drawStoryIntro() {
  let currentScript = scripts[currentScriptIdx];
  let targetImg = introImgs[currentScript.imgIdx];
  if (!targetImg) targetImg = bgImg;

  drawCoverImage(targetImg);

  if (transitionAlpha < 240) {
    push();
    rectMode(CENTER);
    fill(255, 180); 
    stroke(0, 100); 
    strokeWeight(1);
    rect(windowWidth - 80, 40, 90, 40, 5);

    fill(0); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text("건너뛰기", windowWidth - 80, 40);
    pop();

    let boxW = windowWidth * 0.8;          
    let boxH = windowHeight * 0.22;        
    let boxX = (windowWidth - boxW) / 2;   
    let boxY = windowHeight * 0.7;    

    rectMode(CORNER);
    noStroke();
    fill(0, 180); 
    rect(boxX, boxY, boxW, boxH, 10);

    let nameW = boxW * 0.2;          
    let nameH = boxH * 0.25;         
    let nameX = boxX + 10;
    let nameY = boxY - nameH + 2;    

    fill(0, 200); 
    rect(nameX, nameY, nameW, nameH, 5);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(nameH * 0.5); 
    text(currentScript.name, nameX + nameW / 2, nameY + nameH / 2);

    if (!isTransitioning && revealedLength < currentScript.text.length) {
      if (millis() - lastTypeTime > typeSpeed) {
        revealedLength++;
        lastTypeTime = millis();
      }
    }

    let displayText = currentScript.text.substring(0, revealedLength);
    textAlign(LEFT, TOP);
    textSize(boxH * 0.14); 
    fill(255);

    let paddingX = boxW * 0.04;
    let paddingY = boxH * 0.2;
    text(displayText, boxX + paddingX, boxY + paddingY, boxW - (paddingX * 2), boxH - (paddingY * 2));

    if (revealedLength === currentScript.text.length && !isTransitioning) {
      textAlign(RIGHT, BOTTOM);
      textSize(boxH * 0.1);
      fill(255, 150 + sin(frameCount * 0.1) * 105); 
      text("▶ 클릭 또는 Enter", boxX + boxW - paddingX, boxY + boxH - paddingY / 2);
    }
  }

  if (isTransitioning) {
    if (nextAction === "FADE_IN") {
      transitionAlpha -= 15; 
      if (transitionAlpha <= 0) {
        transitionAlpha = 0;
        isTransitioning = false; 
        nextAction = "";
      }
    } else if (nextAction === "NEXT_SCRIPT" || nextAction === "GO_TO_GAME") {
      transitionAlpha += 15; 
      if (transitionAlpha >= 255) {
        transitionAlpha = 255;

        if (nextAction === "NEXT_SCRIPT") {
          currentScriptIdx++;
          revealedLength = 0;
          nextAction = "FADE_IN"; 
        } 
        else if (nextAction === "GO_TO_GAME") {
          gameState = "GAME_PLAY"; 
          currentRoom = 0; 
          timeLeft = 180000; 
          timerStarted = false; 
          isGameOver = false;

          dialogueLines = [
            "으윽... 안 돼... ",
            "제길... 이렇게 되었으니 어쩔 수 없어. 여기서 죽거나, 도망가거나, 둘 중 하나다...",
            "이... 이것은... 다이얼(多異孼)?!",
            "맞는 4종류의 숫자를 알아와서 선택하면 풀리는 잠금쇠가 아닌가....!",
            "방을 돌아다니며 단서를 얻어야겠어."
          ];
          currentDialogueIndex = 0;
          revealedLength = 0;
          lastTypeTime = millis();

          nextAction = "FADE_IN"; 
        }
      }
    }
  }

  if (transitionAlpha > 0) {
    rectMode(CORNER);
    fill(0, transitionAlpha); 
    noStroke();
    rect(0, 0, windowWidth, windowHeight);
  }
}

function drawHowToPlay() {
  background(50);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("놀이 방법 (" + (howToStep + 1) + " / " + totalHowToSteps + ")", windowWidth/2, 100);

  textSize(30);
  if (howToStep === 0) {
    fill('red');
    triangle(50, windowHeight/2, 90, windowHeight/2 - 30, 90, windowHeight/2 + 30);
    triangle(windowWidth - 50, windowHeight/2, windowWidth - 90, windowHeight/2 - 30, windowWidth - 90, windowHeight/2 + 30);
    fill('white');
    text("화면 양옆의 화살표를 눌러 공간을 이동하시오.", windowWidth/2, windowHeight/2);
  }
  if (howToStep === 1) text("의심되는 물건을 눌러 물품을 수집하시오.", windowWidth/2, windowHeight/2);
  if (howToStep === 2) {
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight-50, windowWidth, 100); 
    fill('black'); 
    for(let i = 0; i<16; i++){ 
      rect(200 + 90*i , windowHeight-50, 70, 80);
    }
    fill('black');
    text("주머니", 60, windowHeight - 50);
    fill('white');
    text("수집한 물품은 하단 저장공간에서 확인 가능하오.", windowWidth/2, windowHeight/2);
  }
  if (howToStep === 3) {
    text("마지막 방에서 자물쇠 번호를 입력해 탈출하시오!", windowWidth/2, windowHeight/2);
    fill('yellow');
    text("화면 속 글자판을 이용해 4자리를 입력하면 되오", windowWidth/2, windowHeight/2 + 100);
  }
  if (howToStep === 4) {
    text("총 제한 시간은 5분이오. 그 안에 탈출해야만 하오..!", windowWidth/2, windowHeight/2);
    fill('yellow');
    text("무슨 일이 일어나면 시간이 감소하거나 늘어난다는 소문을 들었소.", windowWidth/2, windowHeight/2 + 100);
  }

  drawButton(windowWidth - 300, 60, 80, 40, "다음");
}


function drawButton(x, y, w, h, label) {
  push();
  rectMode(CENTER);
  fill(255);
  stroke(0);
  rect(x, y, w, h, 5);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x, y);
  pop();
}


function handleNextScript() {
  if (isTransitioning) return;
  let currentScript = scripts[currentScriptIdx];

  if (revealedLength < currentScript.text.length) {
    revealedLength = currentScript.text.length;
    return;
  } 

  if (currentScriptIdx + 1 < scripts.length) {
    let nextScript = scripts[currentScriptIdx + 1];
    if (currentScript.imgIdx !== nextScript.imgIdx) {
      isTransitioning = true;
      nextAction = "NEXT_SCRIPT";
    } else {
      currentScriptIdx++;
      revealedLength = 0;
    }
  } else {
    isTransitioning = true;
    nextAction = "GO_TO_GAME"; 
  }
}