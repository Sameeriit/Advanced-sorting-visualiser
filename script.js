myCanvas.width = 500;
myCanvas.height = 300;
const n = 20;
const array=[];

const stringHeight = myCanvas.height * 0.45;

const socks = [];
const margin = 30;
const availableSpacing = myCanvas.width - 2*margin;
const spacing = availableSpacing/n;



// genrate of random length of socks from 0 to 1;
for(let i = 0; i < n; i++){
    array[i] = Math.random();

}
//generation of socks
for(let i = 0; i < array.length; i++){
    const x = i *spacing+spacing/2 +margin; 
    const y = stringHeight;
    const height = myCanvas.height * 0.4 *array[i];
    socks[i] = new Sock(x,y,height);
    
}
// calling here bubbleSort .
const moves = bubbleSort(array);

// drawing socks here
const ctx = myCanvas.getContext("2d");

animate();

function animate(){

    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    ctx.beginPath();
    ctx.moveTo(0,stringHeight);
    ctx.lineTo(myCanvas.width,stringHeight);
    ctx.stroke();


    let change = false; // if atleast one socks change 
    for(let i = 0; i <socks.length; i++){
        
        change = socks[i].draw(ctx) || change;
    }
 
    // if there is no any change and we have move then here we go...!
    if( !change && moves.length > 0){
        const nextMove = moves.shift();
        if(nextMove.type === "swap"){
            const[i,j] = nextMove.indices;
            socks[i].moveTo(socks[j].loc);
            socks[j].moveTo(socks[i].loc);
            [socks[i],socks[j]] = [socks[j],socks[i]];

        }
       
    }
    requestAnimationFrame(animate);
}


function bubbleSort(array){
    const moves = [];   // for filiping the bird over the rope
    do{

        var swapped = false;
        for(let i = 1; i < array.length; i++){
            moves.push({
                indices:[i-1,i],
                type: "comparison"
            });
            if(array[i - 1] > array[i]){
                swapped = true;
                [array[i-1],array[i]] = [array[i],array[i-1]];
                moves.push({
                    indices:[i-1,i],
                    type: "swap"
                });
            }
        }

    }while(swapped);
    return moves;
}

