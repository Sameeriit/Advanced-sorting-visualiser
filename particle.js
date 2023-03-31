class particle {
    constructor(loc,fixed = false){
        this.loc = loc;
        this.oldloc = loc;
        this.fixed = fixed;

    }
    // arived function which is only called by this particle
    #update(){
        if(this.fixed){
            return;
        }
        //
        const velocity = subtract(this.loc,this.oldloc);
        const newLoc = add(this.loc,velocity);
        this.oldloc = this.loc;
        this.loc = newLoc;
    }

    draw(ctx,radius = 5){
        this.#update(); // evry time we draw we also update this particle
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(this.loc.x,this.loc.y,radius,0,Math.PI*2);
        ctx.fill();
    }
}