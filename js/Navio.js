class Navio {
    constructor(x, y, l, a, navioPos){
        this.body = Bodies.rectangle(x,y,l,a);
        this.l = l;
        this.a = a;
        this.navioPos = navioPos;
        this.image = loadImage("./assets/boat.png");
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.navioPos, this.l, this.a);
        pop();
    }
}