/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(1);
	const Game = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function() {
	  const canvas = document.getElementById("canvas");
	  const stage = new createjs.Stage(canvas);
	  const game = new Game(stage);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Bubble {
	  constructor(pos, color) {
	      this.x = pos.x;
	      this.y = pos.y;
	      this.color = color;
	  }
	
	  renderBubble() {
	    const g = new createjs.Graphics();
	    g.setStrokeStyle(1);
	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
	    g.drawCircle(0,0,3);
	
	    const circle = new createjs.Shape(g);
	    circle.x = 100;
	    circle.y = 100;
	  }
	
	  getBubbleCoords(row, col) {
	    const bubbleX = row * this.bubbleWidth;
	
	    if (row % 2 === 0) {
	        bubbleX += this.bubbleWidth / 2;
	    }
	
	    const bubbleY = this.height + row * this.width;
	    return { bubbleX: bubbleX, bubbleY: bubbleY };
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(1);
	
	class Game {
	  constructor(stage) {
	    this.bubbles = [];
	    this.rows = 13;
	    this.cols = 8;
	    this.rowHeight = 36;
	    this.rowWidth = 36;
	    this.radius = 18;
	    this.bubbleHeight = 36;
	    this.bubbleWidth = 36;
	  }
	
	  createBubbles() {
	    for (let x = 0; x < this.rows; x++) {
	      this.bubbles[x] = [];
	      for (let y = 0; y < this.cols; y++) {
	        this.bubbles[x][y] = new Bubble(this.getBubbleCoords(x, y));
	      }
	    }
	  }
	
	  getBubbleCoords(x, y) {
	    if (x % 2 === 0) {
	      
	    } else {
	
	    }
	
	    y = y * this.bubbleHeight;
	    return { x: x, y: y };
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map