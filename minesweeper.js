document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}
const boardSize = 6;

const gameBoard = _ => {
    for( let rows = 0; rows < boardSize; rows++){
      for( let cols = 0; cols < boardSize; cols++){
        board.cells.push({
          row: rows,
          col: cols,
          isMine: Math.floor(Math.random(1) < 0.3),
          isMarked: false,
          hidden: true,
          surroundingMines: 0
        })
      }
    }
}

function startGame () {
  gameBoard();
  board.cells.forEach(item => item.surroundingMines = countSurroundingMines(item))
  
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin) //Marks cell as '!'
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  board.cells.forEach(check => {
    if(check.isMine && !check.isMarked) return;
    else if(!check.isMine && check.hidden) return;
    lib.displayMessage('You win!')
  });
  
  console.log(board)
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let surrounding = lib.getSurroundingCells(cell.row, cell.col)
  let count = 0;

  surrounding.forEach((cell) => {
    if(cell.isMine) {
      count++
    }
  });
  return count;
}

