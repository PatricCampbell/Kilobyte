class Game {
  constructor() {
    this.board = new Board();
    this.highScore = 0;

    this.initialRender();
    this.render();
  }

  initialRender() {
    const gameBoard = document.querySelector('.game-board');
    
    this.board.grid.forEach(row => {
      gameBoard.innerHTML += '<div class="row"></div>';
    });
    
    const rows = document.querySelectorAll('.row');
    Array.prototype.forEach.call(rows, (row, yVal) => {
      for (let xVal = 0; xVal < 4; xVal++) {
        row.innerHTML += `<div class="tile" data-position="${[xVal, yVal]}"></div>`
      }
    });
  }

  render() {
    this.board.grid.forEach((row, yVal) => {
      this.board.grid.forEach((column, xVal) => {
        if (this.board.grid[xVal][yVal]) {
          const tile = document
            .querySelector(`[data-position="${xVal},${yVal}"]`);
          const value = this.board.grid[xVal][yVal].value;
          tile.innerHTML = `<p>${value}</p>`;
          tile.setAttribute('data-value', value);
        } else {
          const tile = document
            .querySelector(`[data-position="${xVal},${yVal}"]`);
          tile.innerHTML = '';
          tile.setAttribute('data-value', '');
        }
      });
    });
  }

  updateScore(score) {
    const scoreP = document.querySelector('.current-score-value');

    scoreP.innerHTML = score;
  }

  playTurn(keyCode) {
    switch (keyCode) {
      case 39:
        this.board.moveRight();
        break;
      case 37:
        this.board.moveLeft();
        break;
      case 38:
        this.board.moveUp();
        break;
      case 40:
        this.board.moveDown();
        break;
    }
    this.board.addRandomTile();
    this.render();
    this.updateScore(this.board.score);
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.score = 0;
  
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

  moveRight() {
    const startRow = 0;
    const startColumn = 3;
    for (let yPos = startRow; yPos < 4; yPos++) {
      for (let xPos = startColumn; xPos > -1; xPos--) {
        if (this.grid[xPos][yPos]) {
          this.moveTile(xPos, yPos, 1, 0);
        }
      }
    }
  }

  moveLeft() {
    const startRow = 0;
    const startColumn = 0;
    for (let yPos = startRow; yPos < 4; yPos++) {
      for (let xPos = startColumn; xPos < 4; xPos++) {
        if (this.grid[xPos][yPos]) {
          this.moveTile(xPos, yPos, -1, 0);
        }
      }
    }
  }

  moveUp() {
    const startRow = 0;
    const startColumn = 0;
    for (let yPos = startRow; yPos < 4; yPos++) {
      for (let xPos = startColumn; xPos < 4; xPos++) {
        if (this.grid[xPos][yPos]) {
          this.moveTile(xPos, yPos, 0, -1);
        }
      }
    }
  }

  moveDown() {
    const startRow = 3;
    const startColumn = 0;
    for (let yPos = startRow; yPos > -1; yPos--) {
      for (let xPos = startColumn; xPos < 4; xPos++) {
        if (this.grid[xPos][yPos]) {
          this.moveTile(xPos, yPos, 0, 1);
        }
      }
    }
  }

  moveTile(xPos, yPos, deltaX, deltaY) {
    let newX = xPos + deltaX;
    let newY = yPos + deltaY;
    let value = this.grid[xPos][yPos].value;

    if (newX > 3 || newY > 3 || newX < 0 ||newY < 0) {
      return null;
    } else if (this.grid[newX][newY]) {
      if (value === this.grid[newX][newY].value) {
        this.clearSpace(xPos, yPos);
        this.clearSpace(newX, newY);
        this.addTile(newX, newY, value * 2);
        this.score += value * 2;
        return null;
      } else {
        return null;
      }
    } else {
      this.clearSpace(xPos, yPos);
      this.addTile(newX, newY, value);
      this.moveTile(newX, newY, deltaX, deltaY);
    }
  }

  clearSpace(xPos, yPos) {
    this.grid[xPos][yPos] = undefined;
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
document.addEventListener('keydown', event => {
  if ([37, 38, 39, 40].includes(event.keyCode)) {
    g.playTurn(event.keyCode);
  }
});