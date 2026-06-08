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
    textSize(boxH * 0.1); 
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
    if (dialogueLines[0] === "< 동상의 입에 쪽지가 있다. 꺼내야 할 것 같다. >") { showStatueOptions = true; return; }
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
