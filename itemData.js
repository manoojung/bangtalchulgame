let items = [];
let inventory = [];

// 틀은 AI 를 활용함
function initItems() {
  items = [
    { name: "자물쇠 문", room: 0, img: imgLockDoor, xRatio: 0.5, yRatio: 0.49, sizeRatio: 0.75, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "이불", room: 1, img: imgBlanket, xRatio: 0.25, yRatio: 0.72, sizeRatio: 0.35, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "요강", room: 1, img: imgUrinal, xRatio: 0.5, yRatio: 0.77, sizeRatio: 0.2, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "난초화", room: 1, img: imgOrchid, xRatio: 0.65, yRatio: 0.38, sizeRatio: 0.3, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "연서", room: -1, img: char8, sizeRatio: 0.4, size: 0, isCollected: false, isGizmo: false, content: "", dialogue: [], isEvidence: true },
    { name: "도끼", room: -1, img: imgAxe, sizeRatio: 0.3, size: 0, isCollected: false, isGizmo: false, content: "" },

    { name: "사물함", room: 3, img: char1, xRatio: 0.5, yRatio: 0.45, sizeRatio: 0.55, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["..낡은 문이다.", "조심스럽게 문을 열어보았다..", "안에는 텅 비어있는 줄 알았는데.. 무언가 들어있다."] },
    { name: "첫 번째 쪽지", room: -1, img: char8, xRatio: 0.5, yRatio: 0.4, sizeRatio: 0.1, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false, content: "五", dialogue: ["< 五 라고 적힌 쪽지가 들어있다. >"] },
    { name: "두 번째 쪽지", room: -1, img: char8, xRatio: 0.32, yRatio: 0.72, sizeRatio: 0.1, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false, content: "뒤앞글자만봐\n글고릴라답\n자원숭이은\n만침팬지사\n봐타마린야", dialogue: ["< 옷가지 사이에서 쪽지를 발견했다. >"] },
    { name: "쥐구멍", room: -1, img: char5, xRatio: 0.75, yRatio: 0.72, sizeRatio: 0.15, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, ratDialogue: [{ name: "서생원", text: "(찍찍! 찍!) 나 서생원인데 항아리를 치워 주어서 드디어 나갈 수 있게 됐네. " }, { name: "서생원", text: "고맙소! 보답으로 치즈를 드리겠소. " }] },
    { name: "옷더미", room: 3, img: char6, xRatio: 0.32, yRatio: 0.72, sizeRatio: 0.5, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["여성용 저고리 같은데.. 마님께는 좀 작아보여.", "가내에 이런 비단 옷을 입을 사람은 마님 뿐일텐데, 마님은 붙는 옷은 불편하다면서 입지 않으셔.", "결정적으로.. 비단의 색이 이전에 보았던 비녀와 같이 마님과는 '톤구로'다!"], isEvidence: true },
    { name: "항아리", room: 3, img: char3, xRatio: 0.75, yRatio: 0.7, sizeRatio: 0.35, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["< 안에 무언가가 들어있을 것만 같은 느낌이 든다. >", "으아아악!!!", "허억.. 깨버렸구먼.. 응?", "쥐구멍? 숨겨져 있는 줄 몰랐네.", "< ..어쩐지 악취가 올라오는 것 같다 >"] },
    { name: "깨진 항아리", room: -1, img: char4, xRatio: 0.75, yRatio: 0.7, sizeRatio: 0.35, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["< 이미 산산조각이 났다. >"] },
    { name: "옷묶음", room: 3, img: char9, xRatio: 0.61, yRatio: 0.7, sizeRatio: 0.35, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["이건 마님의 옷이 맞군."] },
    { name: "신발", room: 3, img: char10, xRatio: 0.9, yRatio: 0.8, sizeRatio: 0.25, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["< 마님이 이 신을 신고 걸으셨던 모습을 떠올린다. >"] },
    { name: "책", room: 3, img: char11, xRatio: 0.5, yRatio: 0.8, sizeRatio: 0.32, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: [" ...내가 읽기엔 무리군."] },
    { name: "벽화", room: 3, img: char13, xRatio: 0.3, yRatio: 0.38, sizeRatio: 0.3, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["멋있는 그림이군."] },
    { name: "부채", room: 3, img: char14, xRatio: 0.1, yRatio: 0.78, sizeRatio: 0.3, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["마님이 여름에 사용했던 부채가 틀림없군."] },

    { name: "옷장", room: 2, img: imgWardrobe, xRatio: 0.4, yRatio: 0.6, sizeRatio: 0.5, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "비단치마", room: 2, img: imgSkirt, xRatio: 0.4, yRatio: 0.55, sizeRatio: 0.25, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "서랍", room: 2, img: imgDrawer, xRatio: 0.6, yRatio: 0.65, sizeRatio: 0.3, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },
    { name: "동상", room: 2, img: imgStatue, xRatio: 0.6, yRatio: 0.48, sizeRatio: 0.4, x: 0, y: 0, size: 0, isCollected: false, isGizmo: true, dialogue: ["< 동상의 입에 쪽지가 있다. 꺼내야 할 것 같다. >"] }, 
    { name: "쪽지", room: 2, img: char8, xRatio: 0.6, yRatio: 0.45, sizeRatio: 0.03, x: 0, y: 0, size: 0, isCollected: false, isGizmo: false },

    { name: "비녀", room: -1, img: imgHairpin, sizeRatio: 0.2, size: 0, isCollected: false, isGizmo: false, content: "< 나으리의 외도 증거 - 비녀> ", isEvidence: true },
    { name: "방2 동상 쪽지", room: -1, img: char8, sizeRatio: 0.1, size: 0, isCollected: false, isGizmo: false, content: "七", dialogue: ["위기에서 벗어났다..", "무사히 쪽지를 꺼냈다.", "뭐라고 쓰여져 있는거지?", "< 쪽지에는 七이 쓰여져있다. >"] },
    { name: "방2 옷장 쪽지", room: -1, img: char8, sizeRatio: 0.1, size: 0, isCollected: false, isGizmo: false, content: "[ 하루에 네 번\n사랑을 말하고\n 여덟 번 웃고\n 여섯 번의 키스를 해줘\n라는 가사가 나오는 가요\n에서 위 가사가 나오는\n 횟수는? ]", dialogue: ["< 옷가지 사이에서 쪽지를 발견했다. >"] }
  ];
}

function drawRoomItems() {
  // 전체 아이템 순회
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    // 현재 방에 있고, 안 주운 아이템만 표시
    if (item.room === currentRoom && !item.isCollected) {
      push();
      if (item.img) {
        imageMode(CENTER);
        // 바율 유지 (AI 활용) 
        let imgH = item.size * (item.img.height / item.img.width); 
        image(item.img, item.x, item.y, item.size, imgH);
      }
      pop();
    }
  }
}

function drawInventoryBar() {
  push();
  rectMode(CENTER);
  fill('white'); 
  rect(windowWidth/2, windowHeight-50, windowWidth, 100); 

  for(let i = 0; i<16; i++){ 
    fill(0);
    stroke(0);
    rect(200 + 90*i , windowHeight-50, 70, 80);

    if (inventory[i]) {
      push();
      if (inventory[i].img) {
        imageMode(CENTER);
        // 이미지 비율 유지 (AI 활용) 
        let invH = 50 * (inventory[i].img.height / inventory[i].img.width);
        image(inventory[i].img, 200 + 90 * i, windowHeight-50, 50, invH);
      }
      pop();
    }
  }
  fill(0);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text("주머니", 80, windowHeight - 50);
  pop();
}
