// We want a grid to fill all of the available screen space
// 
let grid;
let boxsize = 16;
let boxmargin = 2;
let currentTile = "wall";
let gridSize;
let dragging = false;

function getGridSize(){
    // Returns [w, h] in blocks
    let w = grid.offsetWidth;
    let h = grid.offsetHeight;
    console.log("Grid size", w, h);
    columns = Math.floor(w / boxsize);
    rows = Math.floor(h / boxsize);
    return [columns, rows];
}
function handle_block_click(ev){
    let box = ev.target;
    let row = box.dataset.row;
    let col = box.dataset.column;
    console.log(`Clicked on row ${row}, col ${col}`);
    if (currentTile == "erase"){
        box.dataset.tile = "";
    }
    else if (box.dataset.tile == ""){
        box.dataset.tile = currentTile;
    }
}

function get_neighbors(box){
    // Returns a list of box elements
    col = parseInt(box.dataset.column);
    row = parseInt(box.dataset.row);
    console.assert(col !== undefined, "Malformed box element", box)
    console.assert(row !== undefined, "Malformed box element", box)
    // Do a check of which boxes can be found
    let neighbors = [
        get_box_by_coords(col, row-1),
        get_box_by_coords(col, row+1),
        get_box_by_coords(col-1, row),
        get_box_by_coords(col+1, row),
    ].filter(box=> box != null);
    return neighbors;
    
}

function change_current_tile(tile){
    currentTile = tile;
}

function generate_box(col, row){
    // Generates a div with attached event handlers
    let box = document.createElement("div");
    box.style.gridArea = `${row+1} / ${col+1}`;
    box.dataset.column = col;
    box.dataset.row = row;
    box.dataset.tile = "";
    box.classList.add("box");
    box.addEventListener("click", handle_block_click);
    box.addEventListener("mouseover", (ev)=>{
        if (dragging)
            handle_block_click(ev)
    });
    return box;
}

function get_box_by_coords(r, c){
    return grid.querySelector(`.box[data-row="${r}"][data-column="${c}"]`)
}

function generate_populate_grid(){
    // Get h,w of grid
    gridSize = getGridSize();
    // Set the rows/columns of the grid
    cstring = `repeat( ${gridSize[0]}, ${boxsize - boxmargin}px)`;
    grid.style.gridTemplateColumns = cstring;
    pstring = `repeat( ${gridSize[1]}, ${boxsize - boxmargin}px)`;
    grid.style.gridTemplateRows = pstring;
    // Now get some boxes going
    for(let r = 0; r < gridSize[1]; r++){
        for(let c = 0; c < gridSize[0]; c++){
            let box = generate_box(c, r);
            grid.appendChild(box);
        }
    }
    // Place goal and starting-point
    get_box_by_coords(10, 8).dataset.tile = "start";
    get_box_by_coords(10, gridSize[0]-8).dataset.tile = "goal";
}


document.addEventListener("DOMContentLoaded", ()=>{
    grid = document.getElementById("grid")
    generate_populate_grid();
    grid.addEventListener("mousedown", ()=>{dragging = true;});
    grid.addEventListener("mouseup", ()=>{dragging = false;});

})
