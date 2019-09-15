// Now lets get a dijkstra

let curAlg = ()=>{};
let algData = {};

function start(){
    algData = {};
}

function step(){
    curAlg();
}
function reset(){
    
}

function dijkstras(){
    if (algData["started"] === undefined){
        // Do dijkstra-setup
        // Get target + source node
        algData["start"] = grid.querySelector(".box[data-tile=\"start\"]");
        algData["goal"] = grid.querySelector(".box[data-tile=\"goal\"]");
        algData["open"] = new BinaryHeap((x)=>{
            return x.dataset.weight ? x.dataset.weight : Infinity;
        });
        algData["start"].dataset.weight = 0;
        algData["open"].push(algData["start"]);
    }

    // Do a dijkstra iter

}
