class Sock{
    constructor(x,y,height){

        this.width = 10;
        this.loc ={x,y};
        this.height = height ;
        this.queue = [];
        this.particles = [];

        const left = x-this.width/2;
        const right = x+this.width/2;
        const bottom = y+this.height;


        this.particles.push(new particle(this.loc,true));
        this.particles.push(new particle({x:left,y:bottom},true));
        this.particles.push(new particle({x:right,y:bottom},true));
    }

    moveTo(newLoc,frameCount = 60){
        for(let i = 1; i <frameCount; i++){
            const t = i / frameCount;
            // usong linearInterpolation
            this.queue.push(vLerp(this.loc,newLoc,t));
        }
    }

    draw(ctx){
        let change = false;
        if(this.queue.length > 0){
            this.loc = this.queue.shift();
            change = true;
        }

        const {x,y} = this.loc;
        const left = x-this.width/2;
        const right = x+this.width/2;
        const bottom = y+this.height;

        ctx.beginPath();
        ctx.rect(left, y,this.width,this.height);
        ctx.stroke();
        //drowing the particles
        for(let i = 0; i < this.particles.length;i++){
            this.particles[i].draw(ctx);
        }
        return change;
    }
}