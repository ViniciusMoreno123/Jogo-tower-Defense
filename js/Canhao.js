class Canhao {
    constructor(x, y, lar, alt, angulo){
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.angulo = angulo;
        this.base = loadImage("./assets/cannonBase.png");
        this.cano = loadImage("./assets/canon.png");
    }
    display(){
        push();
        imageMode(CENTER);
        image(this.cano,this.x,this.y,this.lar,this.alt);
        



        pop();

        image(this.base,70,20,200,200);
        noFill();

    }
}
