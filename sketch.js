var engine, world, ground;
var fundoimg;
var dftorre, torreimg;
var torreangulo;
var canhao;


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;



function preload() {
  fundoimg = loadImage("./assets/background.gif");
  torreimg = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }
  
  ground = Bodies.rectangle(0, height-1, width-2, 1, options);
  World.add(world,ground);

  dftorre = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world,dftorre);
 torreangulo = 20;
 canhao = new Canhao(180,110,130,100,torreangulo);
}

function draw() {
  background(189);
  image(fundoimg, 0, 0, 1200, 600);
 
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width*2, 1); 
  push();
  imageMode(CENTER);
  image(torreimg, dftorre.position.x, dftorre.position.y, 160, 310);
  pop();
  


  canhao.display();
}
