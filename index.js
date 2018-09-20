/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let moves = 0;
let occupiedSquare = [];
let decided = false;
function initizialeVariable() {
    decided = false;
    turn = 'X';
    occupiedSquare = [];
    moves = 0;
}
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx, gridNum) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" id="' + (gridNum++)+ '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx, (colIdx*3+1));
        coldiv = '<div class="rowStyle cross">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    if (this.innerHTML == "0" || this.innerHTML == "X") {
        return;
    }
    console.log(this.id);
    occupiedSquare.push(Number(this.id));
    this.innerHTML = turn;
    moves += 1;
    check()
    if(!decided) {
        playComputerMove();
    }
}

function playComputerMove() {
    moves += 1;
    let remainingSquare = [1,2,3,4,5,6,7,8,9].filter(x => !occupiedSquare.includes(x));
    var rand = remainingSquare[Math.floor(Math.random() * remainingSquare.length)];
    document.getElementById(rand).innerHTML = turn;
    occupiedSquare.push(rand);
    check()
    // return rand;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function check() {
    if(win(turn)) {
        decided = true;
        alert('Winner: Player ' + turn);
        init();
    } else if (moves === GRID_LENGTH * GRID_LENGTH) {
        decided = true;
        alert("Draw");
        init()
    } else {
        turn = turn === "X" ? "O" : "X";
    }
}
function win(letter) {
    return checkWin(letter, 1,2,3)
            || checkWin(letter, 4,5,6)
            || checkWin(letter, 7,8,9)
            || checkWin(letter, 1,4,7)
            || checkWin(letter, 2,5,8)
            || checkWin(letter, 3,6,9)
            || checkWin(letter, 1,5,9)
            || checkWin(letter, 3,5,7);
}

function checkWin(player, n1, n2, n3) {
    let winningCondition = document.getElementById(n1).innerHTML === player
                            && document.getElementById(n2).innerHTML === player
                            && document.getElementById(n3).innerHTML === player;
    if (winningCondition) {
        return true;
    }
    return false;
}

function init() {
    initizialeVariable();
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}
init();