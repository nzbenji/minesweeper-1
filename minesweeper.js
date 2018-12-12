document.addEventListener('DOMContentLoaded', startGame)

document.querySelector('.restart').addEventListener('click', restartGame)

let board = {
  cells: []
}


var boardSize = 6;

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
  document.addEventListener('click', losingSound)
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function restartGame() {
  board = { cells : [] }
  document.querySelectorAll('.board')[0].innerHTML = '';
  restartSound();
  startGame();
}

function checkForWin () {

  for(let i = 0; i < board.cells.length; i++) {
    const condition = board.cells[i]
    if(condition.isMine && condition.isMarked) return
    else if(!condition.isMine && condition.hidden) return
  }
  winningSound();
  lib.displayMessage('You win!')

  // board.cells.forEach((check) => {
  //   if(check.isMine && check.isMarked) return;
  //   else if(!check.isMine && check.hidden) return;
    
  // });
  // lib.displayMessage('You win!')
  
  console.log(board)
}

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

const restartSound = _ => {
  const restart = new Audio('./sounds/restartSound.mp3')
  restart.loop = false;
  restart.play();
}

const winningSound = _ => {
  const winningShaq = new Audio('./sounds/winSound.wav');
  winningShaq.loop = false;
  winningShaq.play();
}

const losingSound = _ => {
  const losingShaq = new Audio('./sounds/bombSound.wav')
  losingShaq.loop = false;

  board.cells.forEach((item) => {
    if(item.isMine && !item.hidden) {
      losingShaq.play()
    }
  })
}

