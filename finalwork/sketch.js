// 最終課題を制作しよう

let shapes = [];  // 画面上の図形
let cursorShape = {};  // 棒人間型カーソル

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 棒人間型カーソルの初期設定
  cursorShape = {
    x: mouseX,
    y: mouseY,
    size: 30,
    color: color(0, 0, 255),  // 初期色
    headShape: "circle",  // 初期頭の形
  };
}

function draw() {
  background(160, 192, 255); 

  if (frameCount % 60 === 0) {
    generateShape();
  }

  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];

    if (dist(mouseX, mouseY, shape.x, shape.y) < shape.size / 2) {
      cursorShape.size *= 1.05;  
      
      if (shape.type === "circle") {
        cursorShape.headShape = "circle"; 
        cursorShape.color = color(random(255), 0, 0); 
      } else if (shape.type === "square") {
        cursorShape.headShape = "square";  
        cursorShape.color = color(0, random(255), 0); 
      } else if (shape.type === "triangle") {
        cursorShape.headShape = "triangle";  
        cursorShape.color = color(0, 0, random(255)); 
      }

      
      shapes.splice(i, 1);  
    } else {
      fill(shape.color);
      noStroke();
      drawShape(shape);
    }
  }

  // 棒人間型カーソルを描画
  drawStickFigure(cursorShape);

  cursorShape.x = mouseX;
  cursorShape.y = mouseY;
}

function generateShape() {
  let shape = {
    x: random(width),
    y: random(height),
    size: random(30, 60),
    color: color(random(255), random(255), random(255)),
    type: random(["circle", "square", "triangle"]),
  };
  shapes.push(shape);
}

function drawShape(shape) {
  if (shape.type === "circle") {
    ellipse(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.type === "square") {
    rectMode(CENTER);
    rect(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.type === "triangle") {
    triangle(
      shape.x, shape.y - shape.size / 2, 
      shape.x - shape.size / 2, shape.y + shape.size / 2, 
      shape.x + shape.size / 2, shape.y + shape.size / 2 
    );
  }
}

// 棒人間型カーソルを描画する
function drawStickFigure(cursor) {
  // 頭部の描画
  fill(cursor.color); // カーソルの頭部の色
  if (cursor.headShape === "circle") {
    ellipse(cursor.x, cursor.y - cursor.size / 3, cursor.size / 2, cursor.size / 2);
  } else if (cursor.headShape === "square") {
    rectMode(CENTER);
    rect(cursor.x, cursor.y - cursor.size / 3, cursor.size / 2, cursor.size / 2);
  } else if (cursor.headShape === "triangle") {
    triangle(
      cursor.x - cursor.size / 4, cursor.y - cursor.size / 3, // 左下頂点
      cursor.x + cursor.size / 4, cursor.y - cursor.size / 3, // 右下頂点
      cursor.x, cursor.y - cursor.size / 2 // 上頂点
    );
  }

  // 体（胴体部分）
  stroke(0);
  strokeWeight(4);
  line(cursor.x, cursor.y, cursor.x, cursor.y + cursor.size);
  
  // 手
  line(cursor.x - cursor.size / 2, cursor.y + cursor.size / 3, cursor.x + cursor.size / 2, cursor.y + cursor.size / 3);
  
  // 足
  line(cursor.x, cursor.y + cursor.size, cursor.x - cursor.size / 2, cursor.y + cursor.size*4/3);
  line(cursor.x, cursor.y + cursor.size, cursor.x + cursor.size / 2, cursor.y + cursor.size*4/3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // ウィンドウサイズ変更時にキャンバスをリサイズ
}
