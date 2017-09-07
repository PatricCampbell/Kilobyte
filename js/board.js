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

  moveRight() {
    const startRow = 0;
    const startColumn = 3;

    for (let rowIdx = startRow; rowIdx < 4; rowIdx++) {
      for (let colIdx = startColumn; colIdx < 0; colIdx--) {
        this.moveTile(rowIdx, colIdx, 1, 0);
      }
    }
  }

  moveTile(rowIdx, colIdx, xVector, yVector) {
    let newX = colIdx + xVector;
    let newY = rowIdx + yVector;
    let value = this.grid[colIdx, rowIdx].value;

    if (newX < 0 || newX > 3 || newY < 0 || newY > 3) {
      return null;
    } else if (this.grid[newX][newY]) {
      if (value === this.grid[newX][newY].value) {
        clearSpace(colIdx, rowIdx);
        clearSpace(newX, newY);
        addTile(newX, newY, value * 2);
        return null;
      } else {
        return null;
      }
    } else {
      clearSpace(colIdx, rowIdx);
      addTile(newX, newY, value);
      moveTile(newY, newX, xVector, yVector);
    }
  }

  clearSpace(xPos, yPos) {
    this.grid[xPos][yPos] = undefined;
  }
}
