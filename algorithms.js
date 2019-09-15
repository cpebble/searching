// Now lets get a dijkstra

let curAlg = ()=>{};
let algData = {};
let running = false
let interval;


let algorithms = {
    "dijkstra": {
        "start": dijkstras_setup,
        "algorithm": dijkstras,
        "success": dijkstras_success
    }
}

function start(){
    algData = {};
    curAlg = algorithms["dijkstra"];
    curAlg.start();
    interval = setInterval(()=>{
        step();
    }, 30);
}

function step(){
    curAlg.algorithm();
}
function reset(){
    
}

function success(goal){
    running = true;
    curAlg.success(goal);
    clearInterval(interval);
}

function dijkstras(){
    function relax(current, box){
        // Update weight
        // box.dataset.weight = current.dataset.weight;
        // set predexessor
        box.dataset.prevcol = current.dataset.column; 
        box.dataset.prevrow = current.dataset.row; 
        let tentative_dist = current_weight + 1;
        if (box.dataset.weight){
            // We have been here before. Update and reshake
            if(box.dataset.weight > tentative_dist){
                algData["open"].remove(box);
                // box.dataset.weight = tentative_dist;
                algData["open"].push(box);
            }
        }
        else{
            // Just update and add
            box.dataset.weight = tentative_dist;
            algData["open"].push(box);
            box.dataset.tile = "open";
        }
    }

    // Do a dijkstra iter
    //
    // Get lowest-weighted-node
    let current = algData["open"].pop();
    // Check if destination is reached
    let current_weight = current.dataset.weight;
    // Consider all neighbours
    get_neighbors(current).forEach(box=>{
        // Unvisited
        if (box.dataset.tile == "visited")
            return
        // Calculate tentative distance through current node.
        // If lower than neighbor then update and reshake heap
        relax(current, box);
        let current_dist = box.dataset.weight ? box.dataset.weight : Infinity

    });
    if (current == algData["goal"]){
        success(current);
        return;
    }
    // Mark current visited
    if (current != algData["start"])
        current.dataset.tile = "visited";

    // TODO:
    // If the smallest in heap is infty, then stop
}
function dijkstras_setup(){
    // Do dijkstra-setup
    // Get target + source node
    algData["start"] = grid.querySelector(".box[data-tile=\"start\"]");
    algData["goal"] = grid.querySelector(".box[data-tile=\"goal\"]");
    // Holds possible candidates
    algData["open"] = new BinaryHeap((x)=>{
        return x.dataset.weight ? x.dataset.weight : Infinity;
    });
    // Start box, added as first open
    algData["start"].dataset.weight = 0;
    algData["open"].push(algData["start"]);
    algData["started"] = "true";
    algData["path"] = [];
}
function dijkstras_success(goalbox){
    function get_predecessor(box){
        let col = box.dataset.prevcol;
        let row = box.dataset.prevrow;
        return get_box_by_coords(row, col);
    }
    // Find path
    //
    let current = goalbox;
    let path = [];
    while(get_predecessor(current) != algData["start"]){
        path.push(current);
        current = get_predecessor(current);
        current.dataset.tile = "path"
    }
}
