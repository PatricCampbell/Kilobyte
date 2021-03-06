import Tile from './tile';

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
    this.addRandomTile();
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
    this.addRandomTile();
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
    this.addRandomTile();
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
    this.addRandomTile();
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

  checkGameOver() {
    if (this.isGameLost()) {
      return false;
    } else if (this.isGameWon()) {
      return true;
    } else {
      return null;
    }
  }

  isGameLost() {
    let lost = true;

    if (this.isGridFull()) {
      this.grid.forEach((row, yPos) => {
        row.forEach((tile, xPos) => {
          if (this.checkAdjacentTiles(xPos, yPos)) {
            lost = false;
          }
        });
      });
    } else {
      lost = false;
    }

    return lost;
  }

  isGameWon() {
    let won = false;

    this.grid.forEach(row => {
      row.forEach(tile => {
        if (tile !== undefined && tile.value === 1024) {
          won = true;
        }
      });
    });

    return won;
  }

  isGridFull() {
    let full = true;

    const flattenedGrid = this.grid.reduce((flat, row) => flat.concat(row));
    for (let idx = 0; idx < flattenedGrid.length; idx++) {
      if (flattenedGrid[idx] === undefined) {
        full = false;
      }
    }

    return full;
  }

  checkAdjacentTiles(xPos, yPos) {
    let hasAdjacent = false;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    directions.forEach(direction => {
      const newX = xPos + direction[0];
      const newY = yPos + direction[1];

      if (newX > 0 && newY > 0 && newX < 4 && newY < 4 && this.grid[newX][newY] !== undefined && this.grid[newX][newY].value === this.grid[xPos][yPos].value) {
        hasAdjacent = true;
      }
    });

    return hasAdjacent;
  }

}

export default Board;
