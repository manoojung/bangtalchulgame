let gameState = "START_MENU";
let howToStep = 0;
const totalHowToSteps = 5;
let btnImgW = 180;
let btnImgH = 70;
let currentRoom = 0;
const totalRooms = 4;
let showSavePopup = false;
let hasSavedGame = false; // 중간 저장

function preload(){
  bgImg = loadImage('images/게임 오프닝 화면.png'); 
  menuBtnImg1 = loadImage('images/놀이방법.png');   
  menuBtnImg2 = loadImage('images/놀이시작.png');  
  gameFont = loadFont('images/ChosunCentennial_ttf.ttf');
  for (let i = 0; i < totalIntroImgs; i++) {
    introImgs[i] = loadImage('images/오프닝일러' + i + '.png');
  }

  dia = loadImage('images/돌쇠 말풍선.png');
  bg = loadImage('images/배경3.png');

  char1 = loadImage('images/벽장.png');
  char2 = loadImage('images/열린벽장.png');
  char3 = loadImage('images/항아리.png');
  char4 = loadImage('images/깨진항아리.png');
  char5 = loadImage('images/쥐구멍.png');
  char6 = loadImage('images/옷더미.png');
  char7 = loadImage('images/서생원.png');
  char8 = loadImage('images/쪽지.png');
  char9 = loadImage('images/옷묶음.png');
  char10 = loadImage('images/신발.png');
  char11 = loadImage('images/책.png');
  char12 = loadImage('images/방석.png');
  char13 = loadImage('images/벽화.png');
  char14 = loadImage('images/부채.png');

  imgBlanket = loadImage('images/이불.png');
  imgAxe = loadImage('images/도끼.png');
  imgUrinal = loadImage('images/요강.png');
  imgOrchid = loadImage('images/난초화.png');
  imgNovel = loadImage('images/야설.png');

  imgLockDoor = loadImage('images/자물쇠문.png'); 
  dialSound = loadSound('sound/다이얼 돌리는 소리.mp3');

  breakSound = loadSound('sound/금속 깨지는 소리.mp3'); 
  mouse = loadSound('sound/쥐찍찍소리 (수정).mp3');  
  manSound = loadSound('sound/남자 으악 소리.mp3'); 
  paperSound = loadSound('sound/종이부스럭소리.mp3');
  doorSound = loadSound('sound/문 철컥 열리는 소리.mp3');
  findSound = loadSound('sound/이불 뒤지는 소리 부스럭.mp3');

  imgWardrobe = loadImage('images/옷장.png');
  imgSkirt = loadImage('images/비단치마.png');
  imgHairpin = loadImage('images/비녀.png');
  imgDrawer = loadImage('images/서랍.png');
  imgStatue = loadImage('images/동상.png');

  end3 = loadImage('images/배드엔딩.png');
  end3_1 = loadImage('images/배드엔딩1.png');
  stampImg = loadImage('images/배드엔딩 도장.jpeg');
  happyEndImg = loadImage('images/엔딩0.png');
  happyStampImg = loadImage('images/해피엔딩 도장.png');
  crySound = loadSound('sound/남자 우는 소리.mp3');
  stampSound = loadSound('sound/도장 쾅 찍는 소리.mp3');
  hitSound = loadSound('sound/곤장 맞는 소리.mp3');

  metalClang = loadSound('sound/비녀짤그랑소리.mp3'); 
  drawerOpen = loadSound('sound/서랍 여는 소리.mp3');

  crowdSound = loadSound('sound/일꾼들 웅성웅성 효과음.mp3');
  paperFallBig = loadSound('sound/종이 떨어지는 소리 (큰버전).mp3');
  paperFallSmall = loadSound('sound/종이 떨어지는 소리 (작은버전).mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(gameFont);
  initItems(); 
  initSparkles(); 
  updatePositions(); 
  if (
  sessionStorage.getItem(
    "dolsoe_save_data"
  )
) {
  hasSavedGame = true;
}
}

function updatePositions() {
  for (let item of items) {
    if (item.xRatio !== undefined) item.x = windowWidth * item.xRatio;
    if (item.yRatio !== undefined) item.y = windowHeight * item.yRatio;
    if (item.sizeRatio !== undefined) item.size = windowHeight * item.sizeRatio;
  }

  for (let sp of sparkles) {
    if (sp.xRatio !== undefined) sp.x = windowWidth * sp.xRatio;
    if (sp.yRatio !== undefined) sp.y = windowHeight * sp.yRatio;
  }
}

function draw() {
  if (gameState === "BAD_ENDING") {
    drawBadEnding();
    return;
  }

  if (gameState === "HAPPY_ENDING") {
    drawHappyEnding();
    return;
  }

  if (gameState === "CREDITS") {
    drawCredits();
    return;
  }

  if (isGameOver) {
    push();
    background(0);
    fill(240, 80, 80);
    textAlign(CENTER, CENTER);
    textSize(55);
    text("시간 초과! 탈출 실패", windowWidth / 2, windowHeight / 2 - 20);
    textSize(20);
    fill(200);
    text("마우스를 클릭하면 메인 메뉴로 리셋됩니다.", windowWidth / 2, windowHeight / 2 + 60);
    pop();
    return;
  }

  if (isCleared) {
    push();
    background(0); 
    fill(255, fadeAlpha);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("엔딩", windowWidth / 2, windowHeight / 2);
    if (fadeAlpha < 255) {
      fadeAlpha += 3;
    } else {
      let hasAllEvidence = checkEvidenceComplete();
      if (hasAllEvidence) {
        gameState = "HAPPY_ENDING";
      } else {
        gameState = "BAD_ENDING";
      }
      currentIdx = 0;
      currentEndIdx = 0;
      revealedLength = 0;
      lastTypeTime = millis();
      imgAlpha = 0;
      isStamped = false;
      shakeDuration = 0;
    }
    pop();
    return; 
  }

  if (gameState === "START_MENU") {
   
    drawStartMenu();
    if (hasSavedGame) {
      push();
      rectMode(CORNER);
      
      if (mouseX > windowWidth - 160 && mouseX < windowWidth - 20 && mouseY > 20 && mouseY < 65) {
        fill(180, 140, 100);
      } else {
        fill(139, 105, 75);
      }
      stroke(255);
      weight = 2;
      strokeWeight(2);
      rect(windowWidth - 160, 20, 140, 45, 8);
      
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(18);
      text("이어하기", windowWidth - 90, 42);
      pop();
    }
  } 
  else if (gameState === "HOW_TO_PLAY") {
    drawHowToPlay();
  } 
  else if (gameState === "STORY_INTRO") {
    drawStoryIntro();
  } 
  else if (gameState === "GAME_PLAY") {
    if (timerStarted && !showSavePopup) {
      timeLeft -= deltaTime;
      if (timeLeft <= 0) {
        timeLeft = 0;
        gameState = "BAD_ENDING";
        currentEndIdx = 0;
        revealedLength = 0;
        lastTypeTime = millis();
        isStamped = false;
        shakeDuration = 0;
        return;
      }
    }
 


    
    let isZoomedRoom = (currentRoom === 0 && currentDialogueIndex >= 2 && currentDialogueIndex <= 4);
    if (isZoomedRoom) {
      push();
      translate(windowWidth / 2, windowHeight / 2);
      scale(1.7); 
      translate(-windowWidth / 2, -windowHeight / 2);
    }

    if (bg) {
      image(bg, 0, 0, windowWidth, windowHeight);
    }

    drawRoomItems();

    if (isZoomedRoom) {
      pop();
    }

    drawSparkles(); 
    drawNavigationArrows();
    drawInventoryBar();
    drawTimeBar(); 

    //저장 버튼
     push();
    rectMode(CORNER);
    if (mouseX > windowWidth - 120 && mouseX < windowWidth - 20 && mouseY > 20 && mouseY < 65) {
      fill(100, 100, 100);
    } else {
      fill(50, 50, 50, 200);
    }
    stroke(255);
    strokeWeight(1);
    rect(windowWidth - 120, 20, 100, 45, 8);
    
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("놀이 저장", windowWidth - 70, 42);
    pop();

    if (dialogueLines && dialogueLines.length > 0 && currentDialogueIndex >= 0) {
      if (dialogueLines[0] === "보기 좋은 수묵화군. …어라?" && currentDialogueIndex >= 1 && currentDialogueIndex <= 8) {
        push();
        fill(0, 180); 
        rect(0, 0, windowWidth, windowHeight);
        imageMode(CENTER);
        if (currentDialogueIndex === 1) {
          let imgH = windowHeight * 0.5;
          let imgW = imgH * (imgNovel.width / imgNovel.height);
          image(imgNovel, windowWidth / 2, windowHeight / 2 - 50, imgW, imgH);
        } else {
          let imgH = windowHeight * 0.5;
          let imgW = imgH * (char8.width / char8.height);
          image(char8, windowWidth / 2, windowHeight / 2 - 50, imgW, imgH);
        }
        pop();
      }

      if (dialogueLines[0] === "부드러운 이불이야." && dialogueLines.length > 1 && currentDialogueIndex === 1) {
        push();
        fill(0, 180);
        rect(0, 0, windowWidth, windowHeight);
        imageMode(CENTER);
        let imgH = windowHeight * 0.4;
        let imgW = imgH * (imgAxe.width / imgAxe.height);
        image(imgAxe, windowWidth / 2, windowHeight / 2 - 50, imgW, imgH);
        pop();
      }
    }

    if (currentDialogueIndex >= 0 && currentDialogueIndex < dialogueLines.length) {
      drawDialogueBox(); 
    }

    if (showPotOptions) drawPotOptionsBox();
    if (showDoorOptions) drawDoorOptionsBox();
    if (showStatueOptions) drawStatueOptionsBox(); 

    if (currentNpcIndex >= 0 && currentNpcIndex < npcDialogueLines.length) drawNpcDialogueBox();

    if (currentRoom === 0 && showLockPanel && activeZoomNote === null && !showFailBanner) {
      drawDialLock();
    }

    if (showFailBanner) {
      drawFailBanner();
    }

    if (activeZoomNote !== null) {
      drawZoomedNote();
    }

    if (activeSparkle !== null) {
      drawSparklePopup();
    }
    
    if (showSavePopup) {
  drawSavePopupBox();
}
  }
}

function drawCoverImage(img) {
  imageMode(CORNER);
  let imgRatio = img.width / img.height;
  let canvasRatio = windowWidth / windowHeight;
  let renderW, renderH;
  let offsetX = 0;
  let offsetY = 0;
  if (canvasRatio > imgRatio) {
    renderW = windowWidth;
    renderH = windowWidth / imgRatio;
    offsetY = (windowHeight - renderH) / 2;
  } else {
    renderW = windowHeight * imgRatio;
    renderH = windowHeight;
    offsetX = (windowWidth - renderW) / 2;
  }
  image(img, offsetX, offsetY, renderW, renderH);
}

function drawNavigationArrows() {
  push();
  fill(255, 180);
  noStroke();
  triangle(40, windowHeight/2, 80, windowHeight/2 - 30, 80, windowHeight/2 + 30);
  triangle(windowWidth - 40, windowHeight/2, windowWidth - 80, windowHeight/2 - 30, windowWidth - 80, windowHeight/2 + 30);
  pop();
}

function resetWholeGame() {
  gameState = "START_MENU"; 

  if (crySound && typeof crySound.stop === 'function') crySound.stop();
  if (stampSound && typeof stampSound.stop === 'function') stampSound.stop();
  if (hitSound && typeof hitSound.stop === 'function') hitSound.stop();

  currentIdx = 0;
  currentEndIdx = 0;
  revealedLength = 0;
  lastTypeTime = millis();
  imgAlpha = 0; 
  isStamped = false;
  shakeDuration = 0;

  isCleared = false;
  fadeAlpha = 0;
  isGameOver = false;
  timeLeft = 300000;
  timerStarted = false;

  initItems();
  initSparkles();
  updatePositions();
  inventory = [];
  currentRoom = 0;
  currentDialogueIndex = -1;
  currentNpcIndex = -1;
  enteredCode = "";
  showLockPanel = false;
  showFailBanner = false;
  showPotOptions = false;
  showDoorOptions = false;
  showStatueOptions = false;
  activeZoomNote = null;
  activeSparkle = null;

  currentScriptIdx = 0;
  transitionAlpha = 0;
  isTransitioning = false;
  nextAction = "";
}


function keyPressed() {
  if (gameState === "BAD_ENDING" || gameState === "HAPPY_ENDING") {
    if (keyCode === ENTER) {
      handleEndingNext();
      return false;
    }
  }

  if (gameState === "STORY_INTRO" && keyCode === ENTER) {
    handleNextScript();
    return;
  }

  if (gameState === "GAME_PLAY") {
    if (activeSparkle !== null && keyCode === ENTER) {
      if (sparkleRevealedLength < activeSparkle.message.length) { sparkleRevealedLength = activeSparkle.message.length; } 
      else { activeSparkle = null; }
      return;
    }

    if (showFailBanner && keyCode === ENTER) {
      showFailBanner = false;
      return;
    }

    if (showPotOptions || showDoorOptions || showStatueOptions || activeZoomNote !== null) return;

    if (showLockPanel && currentRoom === 0) {
      if (keyCode >= 48 && keyCode <= 57) { 
        if (enteredCode.length < 4) enteredCode += (keyCode - 48);
      } else if (keyCode >= 96 && keyCode <= 105) { 
        if (enteredCode.length < 4) enteredCode += (keyCode - 96);
      } else if (keyCode === BACKSPACE || key === 'c' || key === 'C') {
        enteredCode = ""; 
      } else if (keyCode === ENTER || key === 'e' || key === 'E') {
        verifySecretCode(); 
      }
      return;
    }

    if (currentDialogueIndex >= 0 && keyCode === ENTER) handleRoomDialogue();
    if (currentNpcIndex >= 0 && keyCode === ENTER) handleNpcDialogue();
  }
}

function mousePressed() {
  // 1. START_MENU 상태일 때 처리
  if (gameState === "START_MENU") {
    // 이어하기 버튼 클릭
    if (hasSavedGame && mouseX > windowWidth - 160 && mouseX < windowWidth - 20 && mouseY > 20 && mouseY < 65) {
  
      initItems();
      initSparkles();
      loadGameData();
      return;
    }

    let bHalfW = btnImgW / 2;
    let bHalfH = btnImgH / 2;

    // 방법 보기 버튼 클릭
    if (mouseX > (windowWidth / 2 - 150) - bHalfW && mouseX < (windowWidth / 2 - 150) + bHalfW &&
        mouseY > (windowHeight / 2 + 200) - bHalfH && mouseY < (windowHeight / 2 + 200) + bHalfH) {
      gameState = "HOW_TO_PLAY";
      howToStep = 0;
      return;
    }

    // 게임 시작 버튼 클릭
    if (mouseX > (windowWidth / 2 + 150) - bHalfW && mouseX < (windowWidth / 2 + 150) + bHalfW &&
        mouseY > (windowHeight / 2 + 200) - bHalfH && mouseY < (windowHeight / 2 + 200) + bHalfH) {
      gameState = "STORY_INTRO";
      currentScriptIdx = 0;
      revealedLength = 0;
      isTransitioning = true;
      nextAction = "FADE_IN";
      transitionAlpha = 255;
      return;
    }
  }  
  // 2. HOW_TO_PLAY 상태일 때 처리
  else if (gameState === "HOW_TO_PLAY") {
    if (mouseX > windowWidth - 340 && mouseX < windowWidth - 260 && mouseY > 40 && mouseY < 80) {
      howToStep++;
      if (howToStep >= totalHowToSteps) {
        gameState = "START_MENU"; 
      }
    }
    return;
  }
  // 3. STORY_INTRO 상태일 때 처리
  else if (gameState === "STORY_INTRO") {
    if (mouseX > windowWidth - 125 && mouseX < windowWidth - 35 && mouseY > 20 && mouseY < 60) {
      gameState = "GAME_PLAY"; 
      currentRoom = 0; 
      timeLeft = 300000; 
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
      isTransitioning = false;
      transitionAlpha = 0;
      return;
    }
    handleNextScript();
    return;
  }
  // 4. 엔딩 및 게임오버 처리
  else if (gameState === "BAD_ENDING" || gameState === "HAPPY_ENDING") {
    if (!isStamped) {
      handleEndingNext();
    } 
    else {
      let btnW = 180; let btnH = 55;
      let btnY = windowHeight / 2 + 110;
      let btnX1 = windowWidth / 2 - 110;
      let btnX2 = windowWidth / 2 + 110;

      if (mouseX > btnX1 - btnW/2 && mouseX < btnX1 + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
        resetWholeGame();
      }
      if (mouseX > btnX2 - btnW/2 && mouseX < btnX2 + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
        gameState = "CREDITS";
      }
    }
    return;
  }
  else if (isGameOver) {
    resetWholeGame();
    return;
  }
  // 5. GAME_PLAY 상태일 때 처리
  else if (gameState === "GAME_PLAY") {
    // 저장 팝업창 활성화 시 최우선 처리
    if (showSavePopup) {
      let btnYMin = windowHeight / 2 + 10;
      let btnYMax = windowHeight / 2 + 70;
      
      // 동의 (저장하고 나가기) 버튼 클릭
      if (mouseX > windowWidth / 2 - 220 && mouseX < windowWidth / 2 - 20 && mouseY > btnYMin && mouseY < btnYMax) {
        saveGameData();     
        showSavePopup = false;
        gameState = "START_MENU"; 
        hasSavedGame = true;      
      }
      // 게임 계속하기 버튼 클릭
      else if (mouseX > windowWidth / 2 + 20 && mouseX < windowWidth / 2 + 220 && mouseY > btnYMin && mouseY < btnYMax) {
        showSavePopup = false;    
      }
      return; 
    }

    // 우측 상단 '게임 저장' 버튼 클릭
    if (mouseX > windowWidth - 120 && mouseX < windowWidth - 20 && mouseY > 20 && mouseY < 65) {
      showSavePopup = true;
      return;
    }
    
    // 인벤토리 바 클릭 처리
    if (mouseY > windowHeight - 90 && mouseY < windowHeight - 10) {
      for (let i = 0; i < inventory.length; i++) {
        let slotX = 200 + 90 * i;
        if (mouseX > slotX - 35 && mouseX < slotX + 35) {
          if (inventory[i].name.includes("쪽지") || inventory[i].name === "비녀" || inventory[i].name === "옷더미" || inventory[i].name === "연서") {
            if (paperSound) paperSound.play(); 
            activeZoomNote = inventory[i]; 
            return;
          } else {
            let releasedItem = inventory.splice(i, 1)[0]; 
            releasedItem.room = currentRoom; 
            releasedItem.x = mouseX; 
            releasedItem.y = mouseY - 140; 
            releasedItem.xRatio = mouseX / windowWidth;
            releasedItem.yRatio = (mouseY - 140) / windowHeight;
            releasedItem.isCollected = false; 
            return;
          }
        }
      }
      return; 
    }

    if (activeSparkle !== null) {
      if (sparkleRevealedLength < activeSparkle.message.length) { sparkleRevealedLength = activeSparkle.message.length; } 
      else { activeSparkle = null; }
      return;
    }

    if (activeZoomNote !== null) {
      activeZoomNote = null;
      if (paperSound) paperSound.play(); 
      return; 
    }

    if (showFailBanner) {
      showFailBanner = false;
      return;
    }

    // 방0 자물쇠 입력 패널 처리
    if (currentRoom === 0 && showLockPanel && !showPotOptions && !showDoorOptions) {
      let panelX = windowWidth / 2;
      let panelY = windowHeight / 2 - 40;
      let panelW = 320; let panelH = 420;

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

      let clickedInsideButton = false;

      for (let i = 0; i < buttons.length; i++) {
        let col = i % 3;
        let row = floor(i / 3);
        let btnX = startX + col * btnSpacingX;
        let btnY = startY + row * btnSpacingY;

        if (mouseX > btnX - btnSize/2 && mouseX < btnX + btnSize/2 &&
            mouseY > btnY - btnSize/2 && mouseY < btnY + btnSize/2) {

          clickedInsideButton = true;

          if (buttons[i] === "E") {
            if (dialSound) dialSound.play(); 
            verifySecretCode(); 
          } else if (buttons[i] === "C") {
            enteredCode = ""; 
          } else {
            if (enteredCode.length < 4) {
              enteredCode += buttons[i];
            }
          }
          return; 
        }
      }

      if (!clickedInsideButton) {
        if (mouseX < panelX - panelW/2 || mouseX > panelX + panelW/2 ||
            mouseY < panelY - panelH/2 || mouseY > panelY + panelH/2) {
          showLockPanel = false;
          enteredCode = "";
          return;
        }
      }
      return;
    }

    // 항아리 선택지 처리
    if (showPotOptions) {
      if (mouseX > windowWidth/2 - 270 && mouseX < windowWidth/2 - 50 && mouseY > windowHeight/2 - 30 && mouseY < windowHeight/2 + 30) {
        showPotOptions = false; if (breakSound) breakSound.play(); if (manSound) manSound.play();
        timeLeft = max(0, timeLeft - 15000); 

        for (let i = 0; i < items.length; i++) {
          if (items[i].name === "항아리") items[i].isCollected = true;
          if (items[i].name === "깨진 항아리") items[i].room = 3;
          if (items[i].name === "쥐구멍") items[i].room = 3;
        }
        currentDialogueIndex = 1; revealedLength = 0; lastTypeTime = millis();
      }
      if (mouseX > windowWidth/2 + 50 && mouseX < windowWidth/2 + 270 && mouseY > windowHeight/2 - 30 && mouseY < windowHeight/2 + 30) {
        showPotOptions = false; currentDialogueIndex = -1; 
      }
      return; 
    }

    // 사물함 선택지 처리
    if (showDoorOptions) {
      if (mouseX > windowWidth/2 - 270 && mouseX < windowWidth/2 - 50 && mouseY > windowHeight/2 - 30 && mouseY < windowHeight/2 + 30) {
        showDoorOptions = false; if (doorSound) doorSound.play(); 
        for (let i = 0; i < items.length; i++) {
          if (items[i].name === "사물함") { items[i].img = char2; items[i].name = "열린 사물함"; items[i].yRatio = 0.37; updatePositions(); }
          if (items[i].name === "첫 번째 쪽지") items[i].room = 3; 
        }
        currentDialogueIndex = 1; revealedLength = 0; lastTypeTime = millis();
      }
      if (mouseX > windowWidth/2 + 50 && mouseX < windowWidth/2 + 270 && mouseY > windowHeight/2 - 30 && mouseY < windowHeight/2 + 30) {
        showDoorOptions = false; currentDialogueIndex = -1; 
      }
      return; 
    }

    // 동상 선택지 처리
    if (showStatueOptions) {
      let btnYMin = windowHeight / 2 - 30; let btnYMax = windowHeight / 2 + 30;
      let hasHairpin = inventory.some(item => item.name === "비녀");

      if (hasHairpin) {
        if (mouseX > windowWidth / 2 - 340 && mouseX < windowWidth / 2 - 140 && mouseY > btnYMin && mouseY < btnYMax) {
          showStatueOptions = false;
          if (paperSound) paperSound.play();
          dialogueLines = ["< 무사히 종이를 꺼냈다. >", "뭐라고 쓰여져 있는거지?", "< 쪽지에는 七이 쓰여져있다. >"];
          currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
        }
        else if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 && mouseY > btnYMin && mouseY < btnYMax) {
          showStatueOptions = false;
          dialogueLines = ["손가락으로 꺼내기는 요원해 보인다. 다른 방법을 찾아보자."];
          currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
        }
        else if (mouseX > windowWidth / 2 + 140 && mouseX < windowWidth / 2 + 340 && mouseY > btnYMin && mouseY < btnYMax) {
          showStatueOptions = false;
          dialogueLines = ["도끼로 꺼내기는 요원해 보인다. 다른 방법을 찾아보자."];
          currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
        }
      } else {
        if (mouseX > windowWidth / 2 - 220 && mouseX < windowWidth / 2 - 20 && mouseY > btnYMin && mouseY < btnYMax) {
          showStatueOptions = false;
          dialogueLines = ["손가락으로 꺼내기는 요원해 보인다. 다른 방법을 찾아보자."];
          currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
        }
        else if (mouseX > windowWidth / 2 + 20 && mouseX < windowWidth / 2 + 220 && mouseY > btnYMin && mouseY < btnYMax) {
          showStatueOptions = false;
          dialogueLines = ["도끼로 꺼내기는 요원해 보인다. 다른 방법을 찾아보자."];
          currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
        }
      }
      return;
    }

    if (currentDialogueIndex >= 0) { handleRoomDialogue(); return; }
    if (currentNpcIndex >= 0) { handleNpcDialogue(); return; }

    // 방 이동 화살표 처리
    if (mouseY > windowHeight/2 - 40 && mouseY < windowHeight/2 + 40) {
      if (mouseX > 20 && mouseX < 90) { currentRoom = (currentRoom - 1 + totalRooms) % totalRooms; return; }
      if (mouseX > windowWidth - 90 && mouseX < windowWidth - 20) { currentRoom = (currentRoom + 1) % totalRooms; return; }
    }

    // 반짝이 오브젝트 클릭 처리
    for (let i = 0; i < sparkles.length; i++) {
      let sp = sparkles[i];
      if (sp.room === currentRoom) {
        if (dist(mouseX, mouseY, sp.x, sp.y) < 25) {
          activeSparkle = sp; sparkleRevealedLength = 0; sparkleLastTypeTime = millis(); return; 
        }
      }
    }

    // 비단치마 클릭 처리
    let skirtItem = items.find(it => it.name === "비단치마");
    if (skirtItem && skirtItem.room === currentRoom && !skirtItem.isCollected) {
      let boxW = skirtItem.size;
      let boxH = skirtItem.size * 1.5;
      if (mouseX > skirtItem.x - boxW/2 && mouseX < skirtItem.x + boxW/2 &&
          mouseY > skirtItem.y - boxH/2 && mouseY < skirtItem.y + boxH/2) {
        dialogueLines = [
          "이 천은 설마…",
          "역시. 마님이 즐겨 입으시던 치마가 맞았네.",
          "마님이 이 치마를 얼마나 좋아하셨는지… 매번 같은 옷만 입으시니 남들이 무시한다고 향단이가 뭐라 해도 듣는 척도 안 하셨지.",
          "하지만 이 치마를 그토록 애정하셨던 것도 이해가 돼.",
          "이 치마를 입은 마님는 눈부시게 아름다우시니까.",
          "참… 한시가 급한데 내가 지금 뭐하는 거람.",
          "어라? 치마에서 뭐가 떨어진 거야?", 
          "비녀…? 그런데 마님의 비녀는 아닌 것 같아.",
          "이런 비녀를 쓰시는 건 본 적도 없을 뿐더러… 비녀의 색이 마님과 톤구로(啍球露)다!"
        ];
        currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis(); 
        return; 
      }
    }

    // 일반 아이템들 클릭 처리
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.room === currentRoom && !item.isCollected && item.name !== "비단치마") {

        if (item.name === "옷장") {
          if (dist(mouseX, mouseY, item.x, item.y) < item.size / 2) {
            let imgH = item.size * (item.img.height / item.img.width);
            let topY = item.y - imgH / 2;
            let boundaryY = topY + imgH * 0.66; 
            if (mouseY < boundaryY) { 
              continue; 
            } else {
              let wardNote = items.find(it => it.name === "방2 옷장 쪽지");
              if (wardNote && !wardNote.isCollected) {
                if (paperSound) paperSound.play();
                wardNote.isCollected = true; inventory.push(wardNote); activeZoomNote = wardNote; 
              }
              return;
            }
          }
        }

        if (item.name === "자물쇠 문") {
          let imgH = item.size * (item.img.height / item.img.width);
          if (mouseX > item.x - item.size/2 && mouseX < item.x + item.size/2 &&
              mouseY > item.y - imgH/2 && mouseY < item.y + imgH/2) {
            showLockPanel = true; 
            enteredCode = "";     
            return;
          }
        }

        if (item.name !== "옷장" && item.name !== "자물쇠 문") {
          if (dist(mouseX, mouseY, item.x, item.y) < item.size / 2) {

            if (item.name === "난초화") {
              dialogueLines = [
                "보기 좋은 수묵화군. …어라?",
                "이것은… 패설(稗說)이 아니냐! 조… 조금만 읽어볼까?",
                "음? 사이에 끼워져 있던 건가? 이건…. 이건 간찰이 아닌가?",
                "이건… 연서다! 연서야! 그런데 도대체 누가…",
                "[  「 그대를 본 지 사흘이 겨우 지났는데 벌써 삼 주 남짓이 지난 듯 느껴지니, 저는 어찌 당신을 기다려야 좋겠습니까? 」 ]",
                "[  「 도기 한 그릇 채 만들어지기도 전에 당신이 그리워지는데 제가 어떻게 당신을 기다려야 좋겠습니까? 」 ]",
                "[  「 부디 박힌 돌에 시선을 나누어 주지 마시옵고, 이 글로나마 저를 그려주시기 바랍니다. 」 ]",
                "[  「 소청하건대 이번 십오야엔 반드시 제 꿈에 나오시어 근황이라도 짧게 일러주고 가소서. 」 ]",
                "글은 거의 모르지만… 주석(柱石)…? 설마, 다른 여인이 나으리께 보낸 연서인 것인가?",
                "< 나으리의 외도 증거 - 연서를 획득했다. >"
              ];
              currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
              return;
            }

            if (item.name === "요강") {
              let hasAxe = inventory.some(it => it.name === "도끼");
              if (!hasAxe) {
                dialogueLines = ["좋지 않은 냄새가 난다. 내 손으로는 만질 수 없다."];
              } else {
                dialogueLines = [
                  "내, 내 도끼가!",
                  "< 손이 미끄러져서 도끼로 요강을 깨뜨려버렸다. >"
                ];
                timeLeft = max(0, timeLeft - 15000); 
              }
              currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
              return;
            }

            if (item.name === "이불") {
              let axeItem = items.find(it => it.name === "도끼");
              if (findSound) findSound.play();
              if (axeItem && axeItem.isCollected) {
                dialogueLines = ["부드러운 이불이야."];
              } else {
                dialogueLines = [
                  "부드러운 이불이야.",
                  "음? 도끼...?",
                  "왜 이불 사이에 있는지는 모르겠지만, 큰 수확이군."
                ];
              }
              currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
              return;
            }

            if (item.name === "서랍") {
              if (mouseY < item.y) { 
                let hasHairpin = inventory.some(it => it.name === "비녀");
                if (hasHairpin) {
                  if (doorSound) doorSound.play(); 
                  dialogueLines = ["< 잠겨 있다. 비녀를 써서 열어 볼까? >","< 비어 있다. >"];
                } else { dialogueLines = ["< 열 수 없다. >"]; }
              } else { 
                if (drawerOpen) drawerOpen.play(); dialogueLines = ["< 비어 있다. >"];
              }
              currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis(); return;
            }

            if (item.isGizmo) {
              if (item.name === "쥐구멍") {
                if (mouse) mouse.play(); npcDialogueLines = item.ratDialogue; currentNpcIndex = 0; revealedLength = 0; lastTypeTime = millis(); return;
              } else if (item.name === "옷더미") {
                if (findSound) findSound.play(); dialogueLines = item.dialogue; currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis(); return;
              } else {
                dialogueLines = item.dialogue; currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis(); return;
              }
            }
            if (item.name.includes("쪽지")) {
              if (paperSound) paperSound.play(); activeZoomNote = item; dialogueLines = item.dialogue; currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis(); return;
            }
          }
        }
      }
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updatePositions();
}
