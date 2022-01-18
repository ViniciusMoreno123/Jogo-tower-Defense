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
        if(keyIsDown(RIGHT_ARROW)&& this.angulo <70){
        this.angulo +=1;
        
        }
        if(keyIsDown(LEFT_ARROW)&& this.angulo >-30){
            this.angulo -=1;
           }
        
        push();
        translate(this.x,this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(this.cano,0,0,this.lar,this.alt);
        



        pop();

        image(this.base,70,20,200,200);
        noFill();

    }
    remover(index){

    setTimeout(()=>{
        Matter.World.remove(world,navios[index].body);
        delete navios[index];
        
    }, 2000);
    
    
   
}
}
