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
	  window.stage = new createjs.Stage(canvas);
	  const game = new Game(window.stage);
	
	  game.start();
	
	  createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener('tick', window.stage);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Bubble {
	  constructor(pos) {
	      this.x = pos.x;
	      this.y = pos.y;
	      this.velX = 20;
	      this.velY = 20;
	      this.colors = [window.blue, window.red, window.yellow, window.green];
	      this.createBubble();
	  }
	
	  createBubble() {
	    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
	    this.bubble = new createjs.Sprite(this.color.sheet, "animate");
	    this.bubble.x = this.x;
	    this.bubble.y = this.y;
	  }
	}
	
	module.exports = Bubble;
	
	
	window.blue = {
	  color: "blue",
	  sheet: new createjs.SpriteSheet({
	    framerate: 30,
	    "images": ["./assets/images/blue-bubble.png"],
	    "frames": {
	      "regX": 0,
	      "regY": 0,
	      "width": 32,
	      "height": 32,
	      "count": 6
	    },
	    "animations": {
	      "animate": [0, 5, "animate", .15],
	    }
	  })
	};
	
	window.yellow = {
	  color: "yellow",
	  sheet: new createjs.SpriteSheet({
	    framerate: 30,
	    "images": ["./assets/images/yellow-bubble.png"],
	    "frames": {
	      "regX": 0,
	      "regY": 0,
	      "width": 32,
	      "height": 32,
	      "count": 6
	    },
	    "animations": {
	      "animate": [0, 5, "animate", .15],
	    }
	  })
	};
	
	window.red = {
	  color: "red",
	  sheet: new createjs.SpriteSheet({
	    framerate: 30,
	    "images": ["./assets/images/red-bubble.png"],
	    "frames": {
	      "regX": 0,
	      "regY": 0,
	      "width": 32,
	      "height": 32,
	      "count": 6
	    },
	    "animations": {
	      "animate": [0, 5, "animate", .15],
	    }
	  })
	};
	
	window.green = {
	  color: "green",
	  sheet: new createjs.SpriteSheet({
	    framerate: 30,
	    "images": ["./assets/images/green-bubble.png"],
	    "frames": {
	      "regX": 0,
	      "regY": 0,
	      "width": 32,
	      "height": 32,
	      "count": 6
	    },
	    "animations": {
	      "animate": [0, 5, "animate", .15],
	    }
	  })
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(1);
	const Gun = __webpack_require__(3);
	
	class Game {
	  constructor(stage) {
	    this.bubbles = [];
	    this.rows = 16;
	    this.cols = 7;
	    this.rowHeight = 30;
	    this.rowWidth = 34;
	    this.radius = 16;
	    this.bubbleHeight = 32;
	    this.bubbleWidth = 32;
	  }
	
	  start() {
	    this.createBubbles();
	    this.renderBubbles();
	    const gun = new Gun();
	    window.stage.addChild(gun.gun);
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
	    let bubblex = (x * this.rowWidth) + this.radius;
	    let bubbley = (y * this.rowHeight) + this.radius;
	
	    if (y % 2 === 0) {
	      bubblex += this.rowHeight / 2;
	    }
	
	    return { x: bubblex, y: bubbley };
	  }
	
	  renderBubbles() {
	    for (let x = 0; x < this.rows; x++) {
	      for (let y = 0; y < this.cols; y++) {
	        window.stage.addChild(this.bubbles[x][y].bubble);
	      }
	    }
	  }
	}
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(1);
	
	class Gun {
	  constructor (){
	    this.gun = this.createGun();
	    this.handleRotation = this.handleRotation.bind(this);
	
	    this.setCurrentBubble();
	    this.bindKeyHandlers();
	  }
	
	  bindKeyHandlers(){
	    document.addEventListener("keydown", this.handleRotation);
	    document.addEventListener("keypress", this.handleShoot);
	  }
	
	  handleRotation(event) {
	    const code = event.keyCode;
	
	    if (code === 37 || code === 65){
	      event.preventDefault();
	      if (this.gun.rotation > -85) this.gun.rotation -= 2.5;
	    } else if (code === 39 || code === 68){
	      event.preventDefault();
	      if (this.gun.rotation < 85) this.gun.rotation += 2.5;
	    }
	  }
	
	  handleShoot(event) {
	    const code = event.keyCode;
	
	    if (code === 32 || code === 13) {
	      
	    }
	  }
	
	  setCurrentBubble() {
	    const pos = { x: 280, y: 455 };
	    const currentBubble = new Bubble(pos);
	    this.currentBubble = currentBubble;
	    window.stage.addChild(currentBubble.bubble);
	  }
	
	  createGun(){
	    const img = new Image();
	    img.src = "./assets/images/gun.png";
	    const gun = new createjs.Bitmap(img);
	
	    const gunContainer = new createjs.Container();
	    gunContainer.x = 290;
	    gunContainer.y = 460;
	    gun.regX = 11.5;
	    gun.regY = 40.5;
	    gun.x = 0;
	    gun.y = 0;
	    gunContainer.addChild(gun);
	    return gunContainer;
	  }
	
	
	}
	
	module.exports = Gun;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map