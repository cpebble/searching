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

function generate_populate_grid(){
    gridSize = getGridSize();
    cstring = `repeat( ${gridSize[0]}, ${boxsize - boxmargin}px)`;
    grid.style.gridTemplateColumns = cstring;
    pstring = `repeat( ${gridSize[1]}, ${boxsize - boxmargin}px)`;
    grid.style.gridTemplateRows = pstring;
    for(let r = 0; r < gridSize[1]; r++){
        for(let c = 0; c < gridSize[0]; c++){
            let box = generate_box(c, r);
            grid.appendChild(box);
        }
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    grid = document.getElementById("grid")
    generate_populate_grid();
    grid.addEventListener("mousedown", ()=>{dragging = true;});
    grid.addEventListener("mouseup", ()=>{dragging = false;});

})
