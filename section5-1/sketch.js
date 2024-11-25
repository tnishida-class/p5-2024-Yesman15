// テキスト「関数を使う」
// 練習問題：このプログラムを改造してEUの旗を描いてみよう
function setup(){
  createCanvas(200, 200);
  background(0,51,160);
  for(let i = 0; i < 12; i++){
    fill(255,220,0)
    stroke(255,220.0)
    let theta = TWO_PI * i / 12;
    let x = 100 + cos(theta) * 50;
    let y = 100 + sin(theta) * 50;
    star(x, y, 10);
  }
}

function star(cx,cy,r){
 beginShape();
 for(var i=0; i<5;i++){
   let theta = TWO_PI * i * 2 / 5 - HALF_PI;
   let x = cx + cos(theta) * r;
   let y = cy + sin(theta) * r;
  vertex(x,y);
 }
 endShape(CLOSE);
}

// ヒント：section5-2 にある star 関数をここにコピーして、 draw 内で ellipse の代わりに使おう
