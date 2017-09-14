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
        event.preventDefault();
        this.playTurn(event.keyCode);
      }
    });
  }

  reset() {
    const lostModal = document.querySelector('.lost-modal');
    const wonModal = document.querySelector('.won-modal');

    if (this.board.score > this.highScore) {
      this.highScore = this.board.score;
      this.updateHighScore(this.highScore);
    }

    lostModal.classList.add('hidden');
    wonModal.classList.add('won');
    this.board = new Board();
    this.updateScore(0);
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

  checkGameOver(board) {
    if (board.isGameLost()) {
      const lostModal = document.querySelector('.lost-modal');
      const lostBtn = document.querySelector('.game-over-btn');

      lostModal.classList.remove('hidden');
      lostBtn.addEventListener('click', e => {
        this.reset();
      });
    } else if (board.isGameWon()) {
      const wonModal = document.querySelector('.won-modal');
      const wonBtn = document.querySelector('.game-over-btn');

      wonModal.classList.remove('hidden');
      wonBtn.addEventListener('click', e => {
        this.reset();
      });

    } else {
      return null;
    }
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
    this.checkGameOver(this.board);
    this.render();
    this.updateScore(this.board.score);
  }
}

export default Game;
