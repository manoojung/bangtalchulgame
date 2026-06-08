let dialogueLines = [];
let currentDialogueIndex = -1;
let npcDialogueLines = [];
let currentNpcIndex = -1;
let activeZoomNote = null;
let showPotOptions = false;
let showDoorOptions = false;
let showStatueOptions = false;

function drawDialogueBox() {
  push();
  let currentText = dialogueLines[currentDialogueIndex];

  if (currentText.includes("stress") || currentText.includes("스트레스")) {
    if (currentText !== lastTextChecked) {
      lastTextChecked = currentText;
      timeLeft = min(maxTime, timeLeft + 10000); 
    }

    rectMode(CENTER);
    fill(255, 225); 
    stroke(0, 50);
    strokeWeight(1);
    let boxW = 460;
    let boxH = 130;
    rect(windowWidth / 2, windowHeight / 2, boxW, boxH, 12);

    if (revealedLength < currentText.length) {
      if (millis() - lastTypeTime > typeSpeed) {
        revealedLength++;
        lastTypeTime = millis();
      }
    }
    let displayText = currentText.substring(0, revealedLength);

    fill(0);
    noStroke();
    textSize(22);
    textAlign(CENTER, CENTER);
    text(displayText, windowWidth / 2, windowHeight / 2 - 10);

    if (revealedLength === currentText.length && !showPotOptions && !showDoorOptions && !showStatueOptions) {
      textAlign(CENTER, CENTER);
      textSize(13);
      fill(80, 150 + sin(frameCount * 0.1) * 105); 
      text("▶ 클릭 또는 Enter", windowWidth / 2, windowHeight / 2 + boxH / 2 - 25);
    }
    pop();
    return; 
  }

  if (currentText !== lastTextChecked) {
    lastTextChecked = currentText;
  }

  let boxW = min(1000, windowWidth * 0.8);
  let boxH = boxW * 0.4;
  let boxX = windowWidth / 2 - boxW / 2;
  let boxY = windowHeight - boxH - 120; 

  rectMode(CORNER);
  image(dia, boxX, boxY, boxW, boxH);

  if (revealedLength < currentText.length) {
    if (millis() - lastTypeTime > typeSpeed) {
      revealedLength++;
      lastTypeTime = millis();
    }
  }
  let displayText = currentText.substring(0, revealedLength);

  fill(0); 
  noStroke();
  textSize(boxW * 0.026); 
  textAlign(LEFT, TOP);
  text(displayText, boxX + (boxW * 0.08), boxY + (boxH * 0.55), boxW - (boxW * 0.16), boxH - (boxH * 0.6)); 

  if (revealedLength === currentText.length && !showPotOptions && !showDoorOptions && !showStatueOptions) {
    textAlign(RIGHT, BOTTOM);
    textSize(boxW * 0.02); 
    fill(0, 150 + sin(frameCount * 0.1) * 105); 
    text("▶ 클릭 또는 Enter", boxX + boxW - (boxW * 0.08), boxY + boxH - (boxH * 0.15));
  }
  pop();
}

function drawZoomedNote() {
  push();
  fill(0, 180); 
  rect(0, 0, windowWidth, windowHeight);
  imageMode(CENTER);

  if (activeZoomNote.name === "비녀") {
    let hairpinH = windowHeight * 0.35; 
    let hairpinW = hairpinH * (activeZoomNote.img.width / activeZoomNote.img.height);
    image(activeZoomNote.img, windowWidth / 2, windowHeight / 2 - 30, hairpinW, hairpinH);
    fill(255, 230, 100); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(activeZoomNote.content, windowWidth / 2, windowHeight / 2 + hairpinH / 2 + 50);
  } 
  else if (activeZoomNote.name === "외도증거_옷더미" || activeZoomNote.name === "옷더미") {
    let clothH = windowHeight * 0.45; 
    let clothW = clothH * (activeZoomNote.img.width / activeZoomNote.img.height);
    image(activeZoomNote.img, windowWidth / 2, windowHeight / 2 - 30, clothW, clothH);
    fill(255, 230, 100); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text("나으리의 외도증거", windowWidth / 2, windowHeight / 2 + clothH / 2 + 50);
  } 
  else if (activeZoomNote.name === "외도증거_연서") {
    let noteH = windowHeight * 0.45;
    let noteW = noteH * (activeZoomNote.img.width / activeZoomNote.img.height);
    image(activeZoomNote.img, windowWidth / 2, windowHeight / 2 - 30, noteW, noteH);
    fill(255, 230, 100); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text("나으리의 외도 증거 - 연서", windowWidth / 2, windowHeight / 2 + noteH / 2 + 50);
  }
  else {
    let noteW = windowHeight * 0.5;
    let noteH = noteW * (char8.height / char8.width);
    image(char8, windowWidth / 2, windowHeight / 2, noteW, noteH);
    fill(40, 30, 20); 
    noStroke();
    textAlign(CENTER, CENTER);
    if (activeZoomNote.content && activeZoomNote.content.includes("\n")) {
      textSize(noteW * 0.045); 
      textLeading(noteW * 0.08);
      text(activeZoomNote.content, windowWidth / 2, windowHeight / 2);
    } else if (activeZoomNote.content) {
      textSize(noteW * 0.18);
      text(activeZoomNote.content, windowWidth / 2, windowHeight / 2);
    }
  }
  fill(255);
  textSize(20);
  textAlign(CENTER, BOTTOM);
  text("▲ 화면을 클릭하면 창을 닫습니다", windowWidth / 2, windowHeight - 100);
  pop();
}

function drawNpcDialogueBox() {
  push();
  let currentScript = npcDialogueLines[currentNpcIndex];

  if (currentScript.name === "서생원" && char7) {
    imageMode(CENTER);
    image(char7, windowWidth - 520, windowHeight * 0.5, 180, 180 * (char7.height / char7.width));
  }

  let boxW = windowWidth * 0.8; 
  let boxH = windowHeight * 0.22;
  let boxX = (windowWidth - boxW) / 2; 
  let boxY = windowHeight * 0.62;

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

  if (revealedLength < currentScript.text.length) {
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

  if (revealedLength === currentScript.text.length) {
    textAlign(RIGHT, BOTTOM); 
    textSize(boxH * 0.1; 
    fill(255, 150 + sin(frameCount * 0.1) * 105);
    text("▶ 클릭 또는 Enter", boxX + boxW - paddingX, boxY + boxH - paddingY / 2);
  }
  pop();
}

function handleRoomDialogue() {
  if (!dialogueLines || dialogueLines.length === 0 || currentDialogueIndex === -1) return;
  let currentText = dialogueLines[currentDialogueIndex];
  if (revealedLength < currentText.length) {
    revealedLength = currentText.length;
    return;
  }
  if (currentDialogueIndex === 0) {
    if (dialogueLines[0] === "< 안에 무언가가 들어있을 것만 같은 느낌이 든다. >") { showPotOptions = true; return; }
    if (dialogueLines[0] === "..낡은 문이다.") { showDoorOptions = true; return; }
  }
  if (dialogueLines[currentDialogueIndex] === "< 동상의 입에 쪽지가 있다. 꺼내야 할 것 같다. >") {
    showStatueOptions = true;
    return;
  }
    
  if (dialogueLines[0] === "이 천은 설마…") {
    if (currentDialogueIndex === 6 && metalClang) {
      metalClang.play(); 
    }
  }
  if (dialogueLines[currentDialogueIndex] === "어라? 치마에서 뭐가 떨어진 거야?") {
    let hairpin = items.find(it => it.name === "비녀");
    if (hairpin && !hairpin.isCollected) {
      hairpin.isCollected = true;
      inventory.push(hairpin);    
      activeZoomNote = hairpin;   
      if (doorSound) doorSound.play(); 
    }
  }

  currentDialogueIndex++;
  revealedLength = 0;

  if (currentDialogueIndex < dialogueLines.length) {
    lastTypeTime = millis();

    if (dialogueLines[0] === "보기 좋은 수묵화군. …어라?") {
      if (currentDialogueIndex === 1 || currentDialogueIndex === 2) {
        if (paperFallSmall) paperFallSmall.play(); 
      }
    }
    if (dialogueLines[0] === "내, 내 도끼가!") {
      if (currentDialogueIndex === 1 && breakSound) breakSound.play(); 
    }
    return;
  }

  let finishedDialogue = dialogueLines;
  currentDialogueIndex = -1; 
  lastTextChecked = ""; 

  if (finishedDialogue[0] === "으윽... 안 돼... ") {
    timerStarted = true;
    timeLeft = 300000; 
  }

  if (finishedDialogue[0] === "내, 내 도끼가!") {
    npcDialogueLines = [
      { name: "일꾼들", text: "창고 안에서 무슨 소음이 나지 않았나? 누굴 가둬 놓았다더니 말썽을 피우나 보군." }
    ];
    currentNpcIndex = 0;
    revealedLength = 0;
    lastTypeTime = millis();
    if (crowdSound) crowdSound.play();
  }

  if (finishedDialogue[0] === "보기 좋은 수묵화군. …어라?") {
    let loveLetter = items.find(it => it.name === "연서");
    if (loveLetter && !loveLetter.isCollected) {
      loveLetter.isCollected = true;
      inventory.push(loveLetter);
    }
    activeZoomNote = {
      name: "외도증거_연서",
      img: char8
    };
  }

  if (finishedDialogue[0] === "부드러운 이불이야." && finishedDialogue.length > 1) {
    let axeItem = items.find(it => it.name === "도끼");
    if (axeItem && !axeItem.isCollected) {
      axeItem.isCollected = true;
      inventory.push(axeItem);
    }
  }

  for (let item of items) {
    if (item.name === "첫 번째 쪽지" && item.room === 3 && !item.isCollected) {
      item.isCollected = true; inventory.push(item); activeZoomNote = null; 
    }
  }
  if (finishedDialogue[0] === "여성용 저고리 같은데.. 마님께는 좀 작아보여.") {
    let secondNote = items.find(item => item.name === "두 번째 쪽지");
    if (secondNote && !secondNote.isCollected) {
      if (paperSound) paperSound.play();
      activeZoomNote = secondNote; dialogueLines = secondNote.dialogue;  
      currentDialogueIndex = 0; revealedLength = 0; lastTypeTime = millis();
      return;
    }
  }

  if (finishedDialogue[0] === "< 옷가지 사이에서 쪽지를 발견했다. >") {
    let secondNote = items.find(item => item.name === "두 번째 쪽지");
    if (secondNote && !secondNote.isCollected) { 
      secondNote.isCollected = true; 
      inventory.push(secondNote); 
    }

    let clothPile = items.find(item => item.name === "옷더미");
    if (clothPile && !clothPile.isCollected) {
      clothPile.isCollected = true;
      inventory.push(clothPile);
    }

    activeZoomNote = {
      name: "외도증거_옷더미",
      img: char6
    };
  }
  if (finishedDialogue[0] === "이 천은 설마…") {
    let skirtItem = items.find(it => it.name === "비단치마");
    if (skirtItem) skirtItem.isCollected = true;
  }
  if (finishedDialogue[0] === "< 무사히 종이를 꺼냈다. >") {
    let mapNote = items.find(item => item.name === "쪽지" && item.room === 2); 
    if (mapNote) {
      mapNote.isCollected = true; 
    }
    let statueNoteData = items.find(item => item.name === "방2 동상 쪽지");
    if (statueNoteData) {
      statueNoteData.isCollected = true;
      if (!inventory.some(it => it.name === "방2 동상 쪽지")) {
        inventory.push(statueNoteData); 
      }
      activeZoomNote = statueNoteData; 
    }
    let statueItem = items.find(item => item.name === "동상");
    if (statueItem) {
      statueItem.name = "쪽지 꺼낸 동상"; 
      statueItem.dialogue = ["동상의 입안은 이제 텅 비어 있다."];
    }
  }
}

function handleNpcDialogue() {
  if (revealedLength < npcDialogueLines[currentNpcIndex].text.length) {
    revealedLength = npcDialogueLines[currentNpcIndex].text.length;
    return;
  }
  let finishedSpeaker = npcDialogueLines[currentNpcIndex].name;
  currentNpcIndex++;
  revealedLength = 0;

  if (currentNpcIndex >= npcDialogueLines.length) {
    currentNpcIndex = -1;
    if (finishedSpeaker === "서생원") {
      dialogueLines = [
        "치주? 치주가 뭐지… 으악!",
        "쥐가 강제로 내 입에 치주를 밀어넣었다.",
        "치주는 맛있었다.",
        "<스트레스 감소 - 시간 연장(10초)>" 
      ];
      currentDialogueIndex = 0;
      revealedLength = 0;
      lastTypeTime = millis();
    } else if (finishedSpeaker === "일꾼들") {
      let urinalItem = items.find(it => it.name === "요강");
      if (urinalItem) urinalItem.isCollected = true;
    }
  } else {
    lastTypeTime = millis();
  }
}

function drawPotOptionsBox() {
  push(); rectMode(CENTER); textAlign(CENTER, CENTER); textSize(22);
  fill(0, 220); stroke(255); strokeWeight(2);
  rect(windowWidth / 2 - 160, windowHeight / 2, 220, 60, 10);
  fill(255); noStroke(); text("항아리 깨기", windowWidth / 2 - 160, windowHeight / 2);
  fill(0, 220); stroke(255); strokeWeight(2);
  rect(windowWidth / 2 + 160, windowHeight / 2, 220, 60, 10);
  fill(255); noStroke(); text("그대로 두기", windowWidth / 2 + 160, windowHeight / 2);
  pop();
}

function drawDoorOptionsBox() {
  push(); rectMode(CENTER); textAlign(CENTER, CENTER); textSize(22);
  fill(0, 220); stroke(255); strokeWeight(2);
  rect(windowWidth / 2 - 160, windowHeight / 2, 220, 60, 10);
  fill(255); noStroke(); text("벽장 열기", windowWidth / 2 - 160, windowHeight / 2);
  fill(0, 220); stroke(255); strokeWeight(2);
  rect(windowWidth / 2 + 160, windowHeight / 2, 220, 60, 10);
  fill(255); noStroke(); text("그대로 두기", windowWidth / 2 + 160, windowHeight / 2);
  pop();
}

function drawStatueOptionsBox() {
  push(); rectMode(CENTER); textAlign(CENTER, CENTER); textSize(18);
  let hasHairpin = inventory.some(item => item.name === "비녀");
  let btnY = windowHeight / 2;

  if (hasHairpin) {
    fill(0, 220); stroke(255); strokeWeight(2);
    rect(windowWidth / 2 - 240, btnY, 200, 60, 10);
    fill(255); noStroke(); text("비녀로 꺼내기", windowWidth / 2 - 240, btnY);

    fill(0, 220); stroke(255); strokeWeight(2);
    rect(windowWidth / 2, btnY, 200, 60, 10);
    fill(255); noStroke(); text("손으로 꺼내기", windowWidth / 2, btnY);

    fill(0, 220); stroke(255); strokeWeight(2);
    rect(windowWidth / 2 + 240, btnY, 200, 60, 10);
    fill(255); noStroke(); text("도끼로 꺼내기", windowWidth / 2 + 240, btnY);
  } else {
    fill(0, 220); stroke(255); strokeWeight(2);
    rect(windowWidth / 2 - 120, btnY, 200, 60, 10);
    fill(255); noStroke(); text("손으로 꺼내기", windowWidth / 2 - 120, btnY);

    fill(0, 220); stroke(255); strokeWeight(2);
    rect(windowWidth / 2 + 120, btnY, 200, 60, 10);
    fill(255); noStroke(); text("도끼로 꺼내기", windowWidth / 2 + 120, btnY);
  }
  pop();
}

function drawSavePopupBox() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // 팝업창 배경 (어두운 투명창에 갈색 테두리)
  fill(0, 220);
  stroke(140, 110, 80);
  strokeWeight(3);
  rect(windowWidth / 2, windowHeight / 2, 360, 180, 15);

  // 안내 텍스트
  noStroke();
  fill(255);
  textSize(18);
  text("게임 진행 상황을 저장하시겠습니까?", windowWidth / 2, windowHeight / 2 - 30);
  
  textSize(13);
  fill(180);
  text("(저장 시 이전 기록은 덮어씌워집니다)", windowWidth / 2, windowHeight / 2 - 5);

  // 버튼 배치 좌표
  let btnY = windowHeight / 2 + 40;
  let btnW = 90;
  let btnH = 35;

  // [예] 버튼 (마우스 올리면 색상 변경)
  let yesX = windowWidth / 2 - 60;
  if (mouseX > yesX - btnW/2 && mouseX < yesX + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
    fill(100, 180, 100);
  } else {
    fill(60, 120, 60);
  }
  rect(yesX, btnY, btnW, btnH, 5);
  fill(255);
  textSize(15);
  text("예 (Y)", yesX, btnY);

  // [아니오] 버튼
  let noX = windowWidth / 2 + 60;
  if (mouseX > noX - btnW/2 && mouseX < noX + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
    fill(180, 100, 100);
  } else {
    fill(120, 60, 60);
  }
  rect(noX, btnY, btnW, btnH, 5);
  fill(255);
  text("아니오 (N)", noX, btnY);

  pop();
}

function saveGameData() {
  // 원본 아이템 배열 중 변경된 상태값(수집 여부, 변경된 이름, 바뀐 룸 번호 등)만 압축 추출
  let itemsState = items.map(it => {
    return { name: it.name, room: it.room, isCollected: it.isCollected };
  });

  // 인벤토리에 들어있는 아이템들의 이름만 추출
  let inventoryNames = inventory.map(it => it.name);

  let saveObj = {
    currentRoom: currentRoom,
    timeLeft: timeLeft,
    timerStarted: timerStarted, // 타이머 구동 유무 상태 추가 백업
    itemsState: itemsState,
    inventoryNames: inventoryNames
  };

  // 브라우저 로컬 저장소에 문자열 형태로 보관합니다.
  localStorage.setItem("dolsoe_save_data", JSON.stringify(saveObj));
}

function loadGameData() {
  let rawData = localStorage.getItem("dolsoe_save_data");
  if (!rawData) return;

  let saveObj = JSON.parse(rawData);

  // 1. 방 정보 및 타이머 복구
  currentRoom = saveObj.currentRoom;
  timeLeft = saveObj.timeLeft;
  if (saveObj.timerStarted !== undefined) {
    timerStarted = saveObj.timerStarted;
  }

  // 2. 맵 아이템 상태들 복구
  if (saveObj.itemsState) {
    saveObj.itemsState.forEach(savedIt => {
      // '쪽지 꺼낸 동상'으로 저장되었든 원래 이름으로 저장되었든 '동상' 오브젝트를 원본 배열에서 매칭
      let realItem = items.find(it => it.name === savedIt.name || (savedIt.name === "쪽지 꺼낸 동상" && it.name === "동상"));
      if (realItem) {
        realItem.room = savedIt.room;
        realItem.isCollected = savedIt.isCollected;
        
        // 동상에서 이미 쪽지를 뺀 상태로 저장되었다면 이름과 텍스트 스크립트 상태를 그대로 전이시킴
        if (savedIt.name === "쪽지 꺼낸 동상") {
          realItem.name = "쪽지 꺼낸 동상";
          realItem.dialogue = ["동상의 입안은 이제 텅 비어 있다."];
        }
      }
    });
  }

  // 3. 인벤토리 복구
  inventory = [];
  if (saveObj.inventoryNames) {
    saveObj.inventoryNames.forEach(name => {
      // '쪽지 꺼낸 동상' 상호작용 후 획득한 방2 동상 쪽지나 기타 아이템들을 순서대로 인벤토리에 복원
      let fullItem = items.find(it => it.name === name);
      if (fullItem) {
        inventory.push(fullItem);
      }
    });
  }
  
  // UI 상태 초기화 후 인게임 화면으로 완전 전환시킴
  showSavePopup = false;
  currentDialogueIndex = -1;
  currentNpcIndex = -1;
  if (typeof updatePositions === "function") {
    updatePositions();
  }
}
