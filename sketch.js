var engine, world, ground;
var fundoimg;
var dftorre, torreimg;
var torreangulo;
var canhao;
var balas = [];
var navio;
var navios = [];

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//Códigos de Revisão
//Exemplo de matriz
var matriz1 = [1,2,3,4,5];
//console.log(matriz1[2]);

//Matriz com diferentes tipos de dados
var matriz2 = ["Vinicius", 53, true];
//console.log(matriz2[2]);

//Matriz feita de matrizes
var matriz3 = [[1,2],[3,4],[5,6]];
//console.log(matriz3[0][1]+" "+matriz3[2][1]);

//Como colocar e tirar elementos da matriz
matriz2.push("Melissa");
matriz2.push(27);
//console.log(matriz2);
matriz2.pop();
matriz2.pop();
//console.log(matriz2);

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
  angleMode(DEGREES);
 torreangulo = 15;
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
  for(var bola = 0;bola< balas.length;bola++){
   balasMostrar(balas[bola],bola);
  }
  
  

 
mostrarPiratas();
}
function keyReleased(){
if (keyCode ===DOWN_ARROW){
balas[balas.length-1].Bala();
}
}
function keyPressed(){
if (keyCode === DOWN_ARROW){
  var baladoCanhao = new BaladoCanhao(canhao.x,canhao.y);

  balas.push(baladoCanhao);
}
}
function balasMostrar(bala,i){
if (bala){
  bala.display();
}
}
function mostrarPiratas(){
  if (navios.length > 0){
    if (navios[navios.length-1].body.position.x<width-300 || navios[navios.length-1]  === undefined){
    var posicoes = [-40,-60,70,20];
    var posicao = random(posicoes);
    var  navio = new Navio(width,height-60,170,170,posicao);
  navios.push(navio);
    
    }
   for(var i = 0; i < navios.length; i++){
     if (navios[i]){
      Matter.Body.setVelocity(navios[i].body, {x:-0.9, y:0});
      navios.display();
     }
   }
  }else{
    var navio = new Navio(width,height-60,170,170,-60);
  navios.push(navio);
  }
}








