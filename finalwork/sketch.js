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
  background(160, 192, 255); // 背景色

  // 1秒ごとにランダムな図形を生成
  if (frameCount % 60 === 0) {
    generateShape();
  }

  // 図形を更新＆描画
  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];

    // 図形がカーソルに触れた場合、カーソルの色や形を変化させる
    if (dist(mouseX, mouseY, shape.x, shape.y) < shape.size / 2) {
      // カーソルのサイズを少し大きく
      cursorShape.size *= 1.05;  
      
      // カーソルの頭の形を図形に応じて変化
      if (shape.type === "circle") {
        cursorShape.headShape = "circle";  // 図形が円なら頭は円
        cursorShape.color = color(random(255), 0, 0); // 赤色に変化
      } else if (shape.type === "square") {
        cursorShape.headShape = "square";  // 図形が四角なら頭は四角
        cursorShape.color = color(0, random(255), 0); // 緑色に変化
      } else if (shape.type === "triangle") {
        cursorShape.headShape = "triangle";  // 図形が三角形なら頭は三角形
        cursorShape.color = color(0, 0, random(255)); // 青色に変化
      }

      // 触れるたびに図形は消去し、カーソルに関連して重なる
      shapes.splice(i, 1);  // 図形を消去
    } else {
      // 図形がまだ消えていない場合、描画する
      fill(shape.color);
      noStroke();
      drawShape(shape);
    }
  }

  // 棒人間型カーソルを描画
  drawStickFigure(cursorShape);

  // カーソル位置更新
  cursorShape.x = mouseX;
  cursorShape.y = mouseY;
}

// ランダムな図形を生成
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

// 図形を描画する
function drawShape(shape) {
  if (shape.type === "circle") {
    ellipse(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.type === "square") {
    rectMode(CENTER);
    rect(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.type === "triangle") {
    triangle(
      shape.x, shape.y - shape.size / 2, // 上頂点
      shape.x - shape.size / 2, shape.y + shape.size / 2, // 左下頂点
      shape.x + shape.size / 2, shape.y + shape.size / 2 // 右下頂点
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
