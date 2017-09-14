import Board from './board';

class Game {
  constructor() {
    this.board = new Board();
    this.highScore = 0;

    this.initialRender();
    this.addKeyboardEvents();
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

  addKeyboardEvents() {
    document.addEventListener('keydown', event => {
      if ([37, 38, 39, 40].includes(event.keyCode)) {
        this.playTurn(event.keyCode);
      }
    });
  }

  reset() {
    if (this.board.score > this.highScore) {
      this.highScore = this.board.score;
      this.updateHighScore(this.highScore);
    }

    this.board = new Board();
    this.updateScore(0);
    this.addKeyboardEvents();
    this.render();
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

  updateHighScore(score) {
    const highScoreP = document.querySelector('.best-score-value');

    highScoreP.innerHTML = score;
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
    this.render();
    this.updateScore(this.board.score);
  }
}

export default Game;
