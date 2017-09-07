const Board = require('./board.js');

class Game {
  constructor() {
    this.board = new Board();

    this.initialRender();
    this.render();
  }

  initialRender() {
    const gameBoard = document.querySelector('.game-board');
    
    this.board.grid.forEach(row => {
      gameBoard.innerHTML += '<div class="row"></div>';
    });
    
    const rows = document.querySelectorAll('.row');
    Array.prototype.forEach.call(rows, (row, xVal) => {
      for (let yVal = 0; yVal < 4; yVal++) {
        row.innerHTML += `<div class="tile" data-position="${[xVal, yVal]}"></div>`
      }
    });
  }

  render() {
    this.board.grid.forEach((row, xVal) => {
      this.board.grid.forEach((column, yVal) => {
        if (this.board.grid[xVal][yVal]) {
          const tile = document
            .querySelector(`[data-position="${xVal},${yVal}"]`);
          const value = this.board.grid[xVal][yVal].value
          tile.innerHTML = value;
          tile.setAttribute('data-value', value);
        }
      });
    });
  }

  playTurn() {
    this.board.addRandomTile();
    this.render();
  }
}

const g = new Game();
