// テキスト「キーボード操作に反応する」
let x, y;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height;
}

function draw(){
  background(160, 192, 255);
  ellipse(x, y-25, 50);
  if(keyIsDown(LEFT_ARROW)){
     x -= 5;
     if(keyIsDown("A".charCodeAt(0))){ x-= 10; }
  }
  if(keyIsDown(RIGHT_ARROW)){
     x += 5; 
    if(keyIsDown("A".charCodeAt(0))){ x+= 10; }
  }
}

// イベントハンドラを使用するパターン
// function keyPressed(){
//   if(keyCode == LEFT_ARROW){ x -= 5; }
//   else if(keyCode == RIGHT_ARROW){ x+= 5; }
//   else if(keyCode == DOWN_ARROW){ y += 5; }
//   else if(keyCode == UP_ARROW){ y -= 5; }
//   else if(key == "A"){ x += 10; }
// }

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
