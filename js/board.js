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

class Board {
  constructor() {
    this.grid = [];

    this.initialTiles();
  }

  initialTiles() {
    for (let columns = 0; columns < 4; columns++) {
      this.grid.push(new Array(4));
    }

    this.addRandomTile();
    this.addRandomTile();    
  }

  addRandomTile() {
    const xPos = this.randomPos();
    const yPos = this.randomPos();

    this.addTile(xPos, yPos);
  }
  
  randomPos() {
    return Math.floor(Math.random() * 4);
  }

  addTile(xPos, yPos, value = undefined) {
    if (this.grid[xPos][yPos]) {
      this.addRandomTile();
    } else {
      this.grid[xPos][yPos] = new Tile(value);
    }
  }
}

class Tile { 
  constructor(value = this.randomStartValue()) {
    this.value = value;
  }

  randomStartValue() {
    if (Math.floor(Math.random() * 10) < 8) {
      return 1;
    } else {
      return 2;
    }  
  }
}

const g = new Game();