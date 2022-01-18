class Navio {
    constructor(x, y, lar, alt, navioPos){
        
        this.body = Bodies.rectangle(x,y,lar,alt);
        this.lar = lar;
        this.alt = alt;

        this.image = loadImage("./assets/boat.png");
        this.navioPosicao = navioPos;
        World.add(world,this.body);
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.navioPosicao, this.lar, this.alt);
        pop();
    }
}