const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const table = document.getElementById("Grid");
const button = document.getElementById('flag');
const reset = document.getElementById('reset');
const count = document.getElementById('counter')

let firstClick; 
let flag = false;
// counter for number of cells with class of visible
let visibleCounter 
//counter displayed on screen
let counter 
let lastGrid = { rows: 9, cols: 9, mines: 10 }

function createGrid(rows, cols, mines) {
    firstClick = true
    lastGrid = {rows, cols, mines}
    visibleCounter = rows * cols - mines;
    counter = mines
    table.innerHTML = '';
    table.classList.add('hidden')

    for (let i = 0; i < rows; i++){
        const row = table.insertRow(i);
        for (let j = 0; j < cols; j++){
            const cell = row.insertCell(j)
            cell.oncontextmenu = (event) => onRightClick(event);
            cell.onclick = (event) => onClick(event, rows, cols, mines);
        }
    }
    count.innerHTML = counter
    addMines(rows, cols, mines);
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            generateNumber(i, j, rows, cols)
        }
    }
}

function findAdjacentCells(row, col, numRows, numCols) {
    let arr = []
      for (let i = row - 1; i < row + 2; i++){
        if (i > -1 && i < numRows) {
            for (let j = col - 1; j < col + 2; j++){
                if (j > -1 && j < numCols) {
                    if (i != row || j != col) {
                      arr.push({i,j})
                    }
                }
            }
        }
      }
    return arr
}

function addMines(rows, cols, mines) {
    for (let i = 0; i < mines; i++) {
        let cell = generateRandomCell(rows, cols)
        cell.innerHTML = "*";
    }   
}

function generateRandomCell(rows, cols) {
    let cell
    function innerGenerateCell() {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);
        const cell = table.rows[row].cells[col];
        return cell
    }
    cell = innerGenerateCell();
    if (cell.innerHTML =='*') {
        return generateRandomCell(rows, cols)
    } else {
        return cell
    }  
}


function generateNumber(row, col, rows, cols) {
    if (table.rows[row].cells[col].innerHTML != '*') {
        let count = 0;
        for (let i = row - 1; i < row + 2; i++){
            if (0 <= i && i < rows) {
                for (let j = col - 1; j < col + 2; j++){
                    if (-1 < j && j < cols) {
                        if (j != col || i != row) {
                            let cell = table.rows[i].cells[j]
                            if (cell.innerHTML == '*') {
                                count++
                            }
                        }
                    }
                }
            }
        }
        table.rows[row].cells[col].innerHTML = count
        let item = table.rows[row].cells[col]
        switch (count) {
            case 0:
                item.classList.add('zero');
                break;
            case 1:
                item.classList.add('one');
                break;
            case 2:
                item.classList.add('two');
                break;
            case 3:
                item.classList.add('three');
                break;
            case 4:
                item.classList.add('four');
                break;
            case 5:
                item.classList.add('five');
                break;  
        }
    }
}

function makeAdjacentZerosVisible(row, col, rows, cols) {
    let adjacentArr = findAdjacentCells(row, col, rows, cols)
    for (let k = 0; k< adjacentArr.length; k++) {
        let { i, j } = adjacentArr[k]
         if (!table.rows[i].cells[j].classList.contains('visible') && table.rows[i].cells[j].innerHTML == 0) {
            table.rows[i].cells[j].classList.add('visible');
            visibleCounter--
            if (table.rows[i].cells[j].innerHTML == 0) {
                makeAdjacentZerosVisible(i, j, rows, cols)
                makeSurroundingCellsVisible(i, j, rows, cols)
            }
        }
    }
}

function makeSurroundingCellsVisible(row, col, rows, cols) {
    let adjacentArr = findAdjacentCells(row, col, rows, cols)
    for (let k = 0; k < adjacentArr.length; k++){
        let { i, j } = adjacentArr[k];
        if (table.rows[i].cells[j].innerHTML != 0 && !table.rows[i].cells[j].classList.contains ('visible')) {
            table.rows[i].cells[j].classList.add('visible')
            visibleCounter--
        }
    }
}

easy.onclick = ()=> createGrid(9, 9, 10);

medium.onclick = ()=> createGrid(16, 16, 40);

hard.onclick = ()=> createGrid(16, 30, 99);

reset.onclick = () => createGrid(lastGrid.rows, lastGrid.cols, lastGrid.mines);

function onClick(event, rows, cols, mines) {
if (!event.target.classList.contains('visible')) {
    let rowIndex = event.target.parentElement.rowIndex;
    let cellIndex = event.target.cellIndex;
    if (!flag) {
        if (!event.target.classList.contains('flagged')) {
            if (event.target.innerHTML != '*') {
                firstClick = false;
                if (event.target.innerHTML == 0) {
                    makeSurroundingCellsVisible(rowIndex, cellIndex, rows, cols)
                } 
                    event.target.classList.add("visible");
                    visibleCounter--;
                    makeAdjacentZerosVisible(rowIndex, cellIndex, rows, cols);
                } else {
                    if (firstClick) {
                        firstGridBombReset(rowIndex, cellIndex, rows ,cols, mines)
                    } else {
                        event.target.classList.add('bomb')
                        alert('You have lost.')
                        table.classList.remove('hidden')
                    }
                }
            }
        } else {
            onRightClick(event)
        }
    }
    if (visibleCounter == 0) {
        alert('Congratulations!! You have won.')
        table.classList.remove('hidden')
    }
}
function firstGridBombReset(row, col, rows, cols, mines) {
    createGrid(rows, cols, mines)
    if (table.rows[row].cells[col].innerHTML == '*') {
        firstGridBombReset(row, col, rows, cols, mines)
    }
    firstClick = false;
    if (table.rows[row].cells[col].innerHTML == 0) {
      makeSurroundingCellsVisible(row, col, rows, cols);
    }
    table.rows[row].cells[col].classList.add("visible");
    visibleCounter--;
    makeAdjacentZerosVisible(row, col, rows, cols);
}

function onRightClick(event) {
    if (!event.target.classList.contains('visible')) {
        if (!event.target.classList.contains('flagged')) {
            event.target.classList.add("flagged");
            counter--
        } else {
            event.target.classList.remove("flagged");
            counter++
        }
        count.innerHTML = counter
    }
}
            
button.onclick = function () {
    if (flag) {
        flag = false;
        button.classList.remove('active')
    } else {
        flag = true
        button.classList.add('active')
    }
}
createGrid(9, 9, 10)