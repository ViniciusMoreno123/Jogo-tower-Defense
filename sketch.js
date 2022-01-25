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

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, ground;
var fundoimg;
var dftorre, torreimg;
var torreangulo;
var canhao;
var navio;
var balas = [];
var navios = [];
var pontos = 0;

var navioAnimacao = [];
var navioDados, navioImagem;
var navioQ,navioqDados;
var navioqAnimacao = [];
var bolaAnim = [];
var bolaDados,bolaImagem;

var somMusica,somCanhao,somRisada,somAgua;


var jogotriste = false;
var estaRindo = false;

function preload() {
  fundoimg = loadImage("./assets/background.gif");
  torreimg = loadImage("./assets/tower.png");
  navioDados = loadJSON("./assets/boat/boat.json");
  navioImagem = loadImage("./assets/boat/boat.png");
  navioqDados = loadJSON ("./assets/boat/brokenBoat.json");
  navioQ = loadImage("./assets/boat/brokenBoat.png");
  bolaImagem = loadImage("./assets/waterSplash/waterSplash.png");
  bolaDados = loadJSON ("./assets/waterSplash/waterSplash.json");
  somMusica = loadSound("./assets/background_music.mp3");
  somCanhao = loadSound("./assets/cannon_explosion.mp3");
  somRisada = loadSound("./assets/pirate_laugh.mp3");
  somAgua = loadSound("./assets/cannon_water.mp3");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }
  
  ground = Bodies.rectangle(0, height-1, width*2, 1, options);
  World.add(world,ground);

  dftorre = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world,dftorre);

  angleMode(DEGREES);
  torreangulo = 15;

  canhao = new Canhao(180,110,130,100,torreangulo);

  var navioFrames = navioDados.frames;
  var navioqFrames = navioqDados.frames;
  var bolaFrames = bolaDados.frames;

  for (var i = 0; i < navioFrames.length; i++){
    var pos = navioFrames[i].position;
    var img = navioImagem.get(pos.x, pos.y, pos.w, pos.h);
    navioAnimacao.push(img);
  }
for (var i = 0; i < navioqFrames.length; i++){
    var pos = navioqFrames[i].position;
    var img = navioQ.get(pos.x, pos.y, pos.w, pos.h);
    navioqAnimacao.push(img);
  }
  for (var i = 0; i < bolaFrames.length; i++){
    var pos = bolaFrames[i].position;
    var img = bolaImagem.get(pos.x, pos.y, pos.w, pos.h);
    bolaAnim.push(img);
  }
}

function draw() {
  background(189);
  image(fundoimg, 0, 0, 1200, 600);
  fill("black");
  textSize(40);
  textAlign(CENTER,CENTER);
  text("PONTUACÃO="+pontos,width-200,50)
  if(!somMusica.isPlaying()){
     somMusica.play();
     somMusica.setVolume(0.1);
 }
  
  
 
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width*2, 1); 

  push();
  imageMode(CENTER);
  image(torreimg, dftorre.position.x, dftorre.position.y, 160, 310);
  pop();

  mostrarPiratas();

  for(var bola = 0;bola< balas.length;bola++){
   balasMostrar(balas[bola],bola);
   detectorcolissao(bola);
  }
  canhao.display();
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
  bala.animar();
  if (bala.body.position.x >= width || bala.body.position.y >= height-50){
    bala.remover(i);
    if(bala.bolaTriste === true){
      somAgua.playMode("untilDone");
      somAgua.play();
      somAgua.setVolume(0.1);
    }
  }
}
}

function mostrarPiratas(){
  if (navios.length > 0){
    if (navios[navios.length-1] === undefined || 
      navios[navios.length-1].body.position.x < width-300){
    var posicoes = [-40,-60,-70,-20];
    var posicao = random(posicoes);
    var navio = new Navio(width,height-100,170,170,posicao, navioAnimacao);
  
    navios.push(navio);
    
    }
   
    for(var i = 0; i < navios.length; i++){
     if (navios[i]){ 
      Matter.Body.setVelocity(navios[i].body, {x:-0.9, y:0});
      navios[i].display();
      navios[i].animar();
      var colisao = Matter.SAT.collides(dftorre, navios[i].body);
      if(colisao.collided && !navios[i].estatriste){
      if(!estaRindo && !somRisada.isPlaying()){
        estaRindo = true;
      somRisada.play();
      somRisada.setVolume(0.1);

      }
        jogotriste = true;
        fimDeJogo();
      }
     }
   }
  } else {
    var navio = new Navio(width,height-60,170,170,-60, navioAnimacao);
    navios.push(navio);
  }
}

function keyReleased(){
  if (keyCode ===DOWN_ARROW){
    somCanhao.play();
    somCanhao.setVolume(0.1);
  balas[balas.length-1].Bala();
  }
  }

function detectorcolissao(index){
 for(var i = 0; i < navios.length; i++){
   if (balas[index] !== undefined && navios[i] !== undefined ){
    var colissao = Matter.SAT.collides(balas[index].body,navios[i].body);
    if (colissao.collided){
      pontos += 5;
      navios[i].remover(i);
      Matter.World.remove(world,balas[index].body);
      delete balas[index];
    }
   }
 }
}

function fimDeJogo(){
  swal({
    title: "Perdeu Playboy",
    text: "Valeu por jogar companheiro",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Jogar novamente"
  },
  function(estaConfirmado){
    if(estaConfirmado){
      location.reload();
    }
  }
  );
}



