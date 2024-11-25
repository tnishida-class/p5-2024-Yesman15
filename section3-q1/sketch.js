// 練習問題「心臓の鼓動のように大きくなったり小さくなったりする円」
let size =50;
let count;
let cycle;
let increament;

function setup(){
  createCanvas(200, 200);
  count = 0;
  cycle = 100;
  increament = 1;
}
function draw(){
  background(160, 192, 255);
  count = (count + increament) % cycle;
  if(keyIsPressed){
  increament = 2;
} else {
  increament = 1;
   }
   if(count < cycle/2) {
    size = count+50;
  } else{
    size = (cycle-count) + 50;
  }
  ellipse(width / 2, height / 2, size);
}