$.getJSON('https://ipapi.co/json/', function(data) {
  user.push(data.ip);
})

$( window ).on( "scroll", function(e) {
  e.preventDefault();
});

$('#about').click(function(){
  $('#about-page').toggle();

});

let user = [];
let detector, poses, video, scaleW, scaleH, about, spaghettiMonster, lwss2, lwss, p3, loafer, gol, spider;
let button, buttonX, buttonY;
let ready = false;
let circle;

var inc = .01;
var scl = 8;
var cols, rows;

var zoff = 0;
var fr;
let selfReady = false;

function preload(){
  about = loadImage('assets/about.png');
  spaghettiMonster = loadImage('assets/spaghetti_monster.png');
  lwss2 = loadImage('assets/lwss2.png');
  lwss = loadImage('assets/lwss.png');
  p3 = loadImage('assets/25P3H1V0.1.png');
  loafer = loadImage('assets/loafer2.png');
  gol = loadImage('assets/gol.png');
  spider = loadImage('assets/spider.png');
}

async function init(){
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.PoseNet,
    detectorConfig
  );
}

async function videoReady(){
  await getPoses();
}

async function setup(){
  createCanvas((window.innerWidth * 1.5), (window.innerHeight * 1.5));
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();
  scaleW = width/640;
  scaleH = height/480;

  xDifference = width - window.innerWidth;
  yDifference = height - window.innerHeight;

  window.scroll({top:yDifference/2,left:xDifference/2, behavior:'instant'});
  await init();
  background(128, 128, 128);
  image(about, window.innerWidth/2, window.innerHeight/2, 500, 350);
  setTimeout(siteReady, 5000);
  image(spaghettiMonster, random(width), random(height), 133, 600);
  image(lwss, random(width), random(height), 25, 25);
  image(lwss2, random(width), random(height), 25, 25);
  image(p3, random(width), random(height), 100, 40);
  image(loafer, random(width), random(height), 50, 50);
  image(gol, random(width), random(height), 200, 50);
  image(lwss, random(width), random(height), 25, 25);
  image(lwss2, random(width), random(height), 25, 25);
  image(p3, random(width), random(height), 100, 35);
  image(loafer, random(width), random(height), 50, 50);
  image(gol, random(width), random(height), 200, 50);
  image(spider, random(width), random(height), 80, 20);

  cols = floor(width / scl);
  rows = floor(height / scl);
  // button = createButton("flow");
  // button.position(random(width), random(height));
  // buttonX = button.elt.offsetLeft;
  // buttonY = button.elt.offsetTop;
}

async function getPoses(){
    poses = await detector.estimatePoses(video.elt);
    setTimeout(getPoses, 0);
}

function siteReady(){
  ready = true;
  clear();
  image(spaghettiMonster, random(width), random(height), 133, 600);
  image(lwss, random(width), random(height), 25, 25);
  image(lwss2, random(width), random(height), 25, 25);
  image(p3, random(width), random(height), 100, 35);
  image(loafer, random(width), random(height), 50, 50);
  image(gol, random(width), random(height), 200, 50);
  image(lwss, random(width), random(height), 25, 25);
  image(lwss2, random(width), random(height), 25, 25);
  image(p3, random(width), random(height), 100, 35);
  image(loafer, random(width), random(height), 50, 50);
  image(gol, random(width), random(height), 200, 50);
  image(spider, random(width), random(height), 80, 20);
  circle = createImg('assets/flow.png', "");
  circle.position(random(width), random(height));
  circle.size(300, 300);
}

function draw(){
  image(video, width-640, height-480, 160, 120);
  if(ready){
    surveill();
  }
}

function surveill(){
  if (poses && poses.length > 0) {
    let rightWristX = poses[0].keypoints[10].x * scaleW;
    let rightWristY = poses[0].keypoints[10].y * scaleH;
    fill(255, 0, 0)
    text(user[0], rightWristX, rightWristY);

    if (rightWristY < (height/2) && rightWristX < (width/2)){
      window.scroll({top:0,left:0,behavior:'smooth'});
    }
    if (rightWristY < (height/2) && rightWristX > (width/2)){
      window.scroll({top:0,left:xDifference,behavior:'smooth'});
    }
    if (rightWristY > (height/2) && rightWristX < (width/2)){
      window.scroll({top:yDifference,left:0,behavior:'smooth'});
    }
    if (rightWristY > (height/2) && rightWristX > (width/2)){
      window.scroll({top:yDifference/2,left:xDifference/2,behavior:'smooth'});
    }

    if (rightWristY > circle.y && rightWristY < (circle.y + circle.height) && rightWristX > circle.x && rightWristX < (circle.x + circle.width)){
      // noLoop();
      console.log("hi")
      flow();
    }
  } 

}

function flow(){
  var yoff = 0;
  // background(255);

  stroke(0, 0, 255);

  for (var y = 0; y < rows; y++){
    var xoff = 0;
    for (var x = 0; x < cols; x++){
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var r = noise(xoff, yoff) * 255;
      var v = p5.Vector.fromAngle(angle);
      xoff += inc;
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(.5);
      line(0, 0, scl, 0);
      pop();
    }
    yoff += inc;
    
    zoff += 0.0002;
  }
}
