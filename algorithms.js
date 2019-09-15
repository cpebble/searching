// Now lets get a dijkstra

let curAlg = ()=>{};
let algData = {};

function start(){
    algData = {};
    curAlg = dijkstras;
}

function step(){
    curAlg();
}
function reset(){
    
}

function success(){
    alert("We dun it");
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
        algData["started"] = "true";
    }

    // Do a dijkstra iter
    //
    // Get lowest-weighted-node
    let current = algData["open"].pop();
    // Check if destination is reached
    if (current == algData["goal"]){
        success();
        return;
    }
    let current_weight = current.dataset.weight;
    // Consider all neighbours
    get_neighbors(current).forEach(box=>{
        // Unvisited
        if (box.dataset.tile == "visited")
            return
        // Calculate tentative distance through current node.
        let tentative_dist = current_weight + 1;
        // If lower than neighbor then update and reshake heap
        if (box.dataset.weight){
            // We have been here before. Update and reshake
            if(box.dataset.weight > tentative_dist){
                algData["open"].remove(box);
                box.dataset.weight = tentative_dist;
                algData["open"].push(box);
            }
        }
        else{
            // Just update and add
            box.dataset.weight = tentative_dist;
            algData["open"].push(box);
            box.dataset.tile = "open";
        }
        let current_dist = box.dataset.weight ? box.dataset.weight : Infinity

    });
    // Mark current visited
    current.dataset.tile = "visited";
    //
    // TODO:
    // If the smallest in heap is infty, then stop
}
