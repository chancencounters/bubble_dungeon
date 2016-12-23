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

	"use strict";
	
	var Bubble = __webpack_require__(1);
	var Game = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  window.stage = new createjs.Stage(canvas);
	  var game = new Game(window.stage);
	
	  game.start();
	  var updateTicker = function updateTicker() {
	    game.update();
	    window.stage.update();
	  };
	  createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener('tick', updateTicker);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var Constants = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bubble = function () {
	  function Bubble(pos) {
	    var givenColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	    _classCallCheck(this, Bubble);
	
	    this.x = pos.x;
	    this.y = pos.y;
	    this.xCoefficient = 1;
	    this.shot = false;
	    this.colors = [Constants.blue, Constants.red, Constants.yellow, Constants.green];
	    this.createBubble(givenColor);
	  }
	
	  _createClass(Bubble, [{
	    key: "createBubble",
	    value: function createBubble(givenColor) {
	      var _this = this;
	
	      if (givenColor) {
	        this.colors.forEach(function (color) {
	          if (color.color === givenColor) {
	            _this.color = color;
	          }
	        });
	      } else {
	        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
	      }
	
	      this.bubble = new createjs.Sprite(this.color.sheet, "animate");
	      this.bubble.x = this.x;
	      this.bubble.y = this.y;
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      //makes sure the projectile bounces off walls
	      if (this.bubble.x < 0) {
	        this.xCoefficient *= -1;
	      } else if (this.bubble.x > 570) {
	        this.xCoefficient *= -1;
	      }
	
	      var angle = this.toRadians(-1 * (this.angle + 180));
	
	      this.bubble.x += this.xCoefficient * 5 * Math.sin(angle);
	      this.bubble.y += 5 * Math.cos(angle);
	    }
	  }, {
	    key: "fire",
	    value: function fire(angle) {
	      this.shot = true;
	      this.angle = angle;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.shot === true) {
	        this.move();
	      } else {
	        return;
	      }
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.shot = false;
	    }
	  }, {
	    key: "toRadians",
	    value: function toRadians(angle) {
	      return angle * (Math.PI / 180);
	    }
	  }]);
	
	  return Bubble;
	}();
	
	module.exports = Bubble;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rows = exports.rows = 16;
	var cols = exports.cols = 7;
	var rowHeight = exports.rowHeight = 30;
	var rowWidth = exports.rowWidth = 34;
	var radius = exports.radius = 16;
	var bubbleHeight = exports.bubbleHeight = 32;
	var bubbleWidth = exports.bubbleWidth = 32;
	
	var blue = exports.blue = {
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
	      "animate": [0, 5, "animate", .15]
	    }
	  })
	};
	
	var yellow = exports.yellow = {
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
	      "animate": [0, 5, "animate", .15]
	    }
	  })
	};
	
	var red = exports.red = {
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
	      "animate": [0, 5, "animate", .15]
	    }
	  })
	};
	
	var green = exports.green = {
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
	      "animate": [0, 5, "animate", .15]
	    }
	  })
	};
	
	var evenDeltas = exports.evenDeltas = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]];
	var oddDeltas = exports.oddDeltas = [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var Constants = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bubble = __webpack_require__(1);
	var Gun = __webpack_require__(5);
	
	var Game = function () {
	  function Game(stage) {
	    _classCallCheck(this, Game);
	
	    this.bubbles = [];
	  }
	
	  _createClass(Game, [{
	    key: "update",
	    value: function update() {
	      this.gun.update();
	      this.checkCollisions();
	      this.renderBubbles();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.createBoard();
	      this.renderBubbles();
	      this.gun = new Gun();
	      window.stage.addChild(this.gun.gun);
	    }
	  }, {
	    key: "checkCollision",
	    value: function checkCollision(bubble, currentBubble) {
	      var dx = bubble.x - currentBubble.bubble.x;
	      var dy = bubble.y - currentBubble.bubble.y;
	      var distance = Math.sqrt(dx * dx + dy * dy);
	
	      if (distance < 32) return true;
	
	      return false;
	    }
	  }, {
	    key: "checkCollisions",
	    value: function checkCollisions() {
	      var _this = this;
	
	      this.allBubbles().forEach(function (bubble) {
	        if (_this.checkCollision(bubble.bubble, _this.gun.currentBubble)) {
	          _this.gun.currentBubble.stop();
	          _this.snapBubble();
	          _this.gun.updateCurrentBubble();
	        }
	      });
	    }
	  }, {
	    key: "snapBubble",
	    value: function snapBubble() {
	      var boardPosition = this.getBoardPosition(this.gun.currentBubble);
	      var row = boardPosition.row;
	      var col = boardPosition.col;
	      var bubbleCoords = this.getBubbleCoords(row, col);
	      this.gun.currentBubble.bubble.x = bubbleCoords.x;
	      this.gun.currentBubble.bubble.y = bubbleCoords.y;
	      this.bubbles[row][col] = this.gun.currentBubble;
	      var neighbors = this.bubbleNeighbors(this.bubbles[row][col]);
	    }
	  }, {
	    key: "allBubbles",
	    value: function allBubbles() {
	      var flatBubbles = [].concat.apply([], this.bubbles);
	      return flatBubbles;
	    }
	  }, {
	    key: "createBoard",
	    value: function createBoard() {
	      for (var row = 0; row < Constants.rows; row++) {
	        this.bubbles[row] = [];
	        for (var col = 0; col < Constants.cols; col++) {
	          this.bubbles[row][col] = new Bubble(this.getBubbleCoords(row, col));
	        }
	      }
	    }
	  }, {
	    key: "getBoardPosition",
	    value: function getBoardPosition(bubble) {
	      var row = Math.floor(bubble.bubble.x / Constants.rowWidth);
	      var col = Math.floor(bubble.bubble.y / Constants.rowHeight);
	
	      return { row: row, col: col };
	    }
	  }, {
	    key: "getBubbleCoords",
	    value: function getBubbleCoords(row, col) {
	      var bubblex = row * Constants.rowWidth + Constants.radius;
	      var bubbley = col * Constants.rowHeight + Constants.radius;
	
	      if (col % 2 === 0) {
	        bubblex += Constants.rowHeight / 2;
	      }
	
	      return { x: bubblex, y: bubbley };
	    }
	  }, {
	    key: "renderBubbles",
	    value: function renderBubbles() {
	      this.allBubbles().forEach(function (bubble) {
	        window.stage.addChild(bubble.bubble);
	      });
	    }
	  }, {
	    key: "bubbleNeighbors",
	    value: function bubbleNeighbors(bubble) {
	      var grid = this.getBoardPosition(bubble);
	      var neighbors = [];
	
	      var deltas = grid.row % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;
	
	      for (var i = 0; i < deltas.length; i++) {
	        var deltax = grid.row + deltas[i][1];
	        var deltay = grid.col + deltas[i][0];
	        if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < Constants.cols) {
	          if (this.bubbles[deltax][deltay]) {
	            neighbors.push(this.bubbles[deltax][deltay]);
	          }
	        }
	      }
	      return neighbors;
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bubble = __webpack_require__(1);
	
	var Gun = function () {
	  function Gun() {
	    _classCallCheck(this, Gun);
	
	    this.gun = this.createGun();
	    this.handleRotation = this.handleRotation.bind(this);
	    this.handleShoot = this.handleShoot.bind(this);
	
	    this.setProjectile();
	    this.bindKeyHandlers();
	  }
	
	  _createClass(Gun, [{
	    key: "bindKeyHandlers",
	    value: function bindKeyHandlers() {
	      document.addEventListener("keydown", this.handleRotation);
	      document.addEventListener("keypress", this.handleShoot);
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.currentBubble.update();
	    }
	  }, {
	    key: "handleRotation",
	    value: function handleRotation(event) {
	      var code = event.keyCode;
	
	      if (code === 37 || code === 65) {
	        event.preventDefault();
	        if (this.gun.rotation > -85) this.gun.rotation -= 2.5;
	      } else if (code === 39 || code === 68) {
	        event.preventDefault();
	        if (this.gun.rotation < 85) this.gun.rotation += 2.5;
	      }
	    }
	  }, {
	    key: "handleShoot",
	    value: function handleShoot(event) {
	      var code = event.keyCode;
	
	      if (code === 32 || code === 13) {
	        this.shoot();
	      }
	    }
	  }, {
	    key: "shoot",
	    value: function shoot() {
	      this.currentBubble.fire(this.gun.rotation);
	    }
	  }, {
	    key: "updateCurrentBubble",
	    value: function updateCurrentBubble() {
	      if (Boolean(this.currentBubble)) {
	        window.stage.removeChild(this.currentBubble.bubble);
	      }
	
	      var pos = { x: 280, y: 455 };
	      var bubble = new Bubble(pos);
	      this.currentBubble = bubble;
	      window.stage.addChild(this.currentBubble.bubble);
	    }
	  }, {
	    key: "createGun",
	    value: function createGun() {
	      var img = new Image();
	      img.src = "./assets/images/gun.png";
	      var gun = new createjs.Bitmap(img);
	
	      var gunContainer = new createjs.Container();
	      gunContainer.x = 290;
	      gunContainer.y = 460;
	      gun.regX = 11.5;
	      gun.regY = 40.5;
	      gun.x = 0;
	      gun.y = 0;
	      gunContainer.addChild(gun);
	      return gunContainer;
	    }
	  }]);
	
	  return Gun;
	}();
	
	module.exports = Gun;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map