class BaladoCanhao {
    constructor(x,y){
        var options = {
            isStatic: true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        this.rastro = [];
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();
        if (this.body.velocity.x > 0 && pos.x >10){
        var posicao = [pos.x,pos.y];
        this.rastro.push(posicao);
        }
        for(var i = 0; i <this.rastro.length; i++){
        image(this.image,this.rastro[i][0],this.rastro[i][1],5,5);
        }
    }

    Bala(){
    var nvAngulo = canhao.angulo-28;
    nvAngulo = nvAngulo*(3.14/180);
    var velocidade = p5.Vector.fromAngle(nvAngulo);
    velocidade.mult(0.5);
       Matter.Body.setStatic(this.body,false);
   Matter.Body.setVelocity(this.body,{x:velocidade.x*(180/3.14),y:velocidade.y*(180/3.14)});
    }
    remover(index){
     Matter.Body.setVelocity(this.body,{x:0,y:0})
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balas[index];
            
        }, 1000);
        
        
       
    }
}