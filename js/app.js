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
/***/ (function(module, exports) {

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

  moveRight() {
    // debugger
    const startRow = 0;
    const startColumn = 3;

    for (let rowIdx = startRow; rowIdx < 4; rowIdx++) {
      for (let colIdx = startColumn; colIdx < 0; colIdx--) {
        this.moveTile(rowIdx, colIdx, 1, 0);
      }
    }
  }

  moveTile(rowIdx, colIdx, xVector, yVector) {
    debugger
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

/***/ })
/******/ ]);