/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


const g = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);


class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
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

    document.addEventListener('keydown', event => {
      if ([37, 38, 39, 40].includes(event.keyCode)) {
        g.playTurn(event.keyCode);
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
    this.render();
    this.updateScore(this.board.score);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile__ = __webpack_require__(3);


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
      this.grid[xPos][yPos] = new __WEBPACK_IMPORTED_MODULE_0__tile__["a" /* default */](value);
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
    const hasAdjacent = false;
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Tile);


/***/ })
/******/ ]);