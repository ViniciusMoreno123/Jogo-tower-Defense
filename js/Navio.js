class Navio {
    constructor(x, y, lar, alt, navioPos, navioAnim){
        this.estatriste = false;
        this.body = Bodies.rectangle(x,y,lar,alt);
        this.lar = lar;
        this.alt = alt;
        this.velocidade = 0.05;
        this.image = loadImage("./assets/boat.png");
        this.animacao = navioAnim;
        this.navioPosicao = navioPos;
        World.add(world,this.body);
    }

    animar(){
        this.velocidade += 0.05;
    }

    remover(index){
        this.animacao = navioqAnimacao;
        this.velocidade = 0.05;
        this.lar = 300;
        this.alt = 300;
        this.estatriste = true;
    
        setTimeout(()=>{
            Matter.World.remove(world,navios[index].body);
            delete navios[index];
            
        }, 2000);        
        
}
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var indice = floor(this.velocidade % this.animacao.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animacao[indice], 0, this.navioPosicao, this.lar, this.alt);
        pop();
    }

   
}