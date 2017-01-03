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
	  var stage = new createjs.Stage(canvas);
	  var context = canvas.getContext("2d");
	  var game = new Game(stage, context);
	
	  game.start();
	  var updateTicker = function updateTicker() {
	    game.update();
	    stage.update();
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
	  function Bubble(pos, colors) {
	    _classCallCheck(this, Bubble);
	
	    this.x = pos.x;
	    this.y = pos.y;
	    this.vx = 0;
	    this.vy = 0;
	    this.xCoefficient = 1;
	    this.processed = false;
	    this.colors = colors;
	    this.createBubble();
	  }
	
	  _createClass(Bubble, [{
	    key: "createBubble",
	    value: function createBubble() {
	      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
	      this.bubble = new createjs.Sprite(this.color.sheet, "animate");
	      this.bubble.x = this.x;
	      this.bubble.y = this.y;
	    }
	  }, {
	    key: "fire",
	    value: function fire(rotation) {
	      var angle = this.toRadians(-1 * (rotation + 180));
	
	      this.vx = 15 * Math.sin(angle);
	      this.vy = 15 * Math.cos(angle);
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.bubble.x < 0 || this.bubble.x > 390) this.xCoefficient *= -1;
	      if (this.y > 400) this.stop;
	
	      this.x += this.vx * this.xCoefficient;
	      this.y += this.vy;
	      this.bubble.x = this.x;
	      this.bubble.y = this.y;
	    }
	  }, {
	    key: "snapBubble",
	    value: function snapBubble() {
	      this.stop();
	      var pos = this.getBoardPosition();
	
	      var bubbleX = pos.row * Constants.rowWidth;
	      var bubbleY = pos.col * Constants.rowHeight;
	
	      if (pos.col % 2 === 0) bubbleX += Constants.rowWidth / 2;
	
	      this.x = bubbleX;
	      this.y = bubbleY;
	      this.bubble.x = bubbleX;
	      this.bubble.y = bubbleY;
	    }
	  }, {
	    key: "getBoardPosition",
	    value: function getBoardPosition() {
	      var col = Math.round(this.bubble.y / Constants.rowHeight);
	      var row = void 0;
	      if (col % 2 === 0) {
	        row = Math.round((this.bubble.x - 16) / Constants.rowWidth);
	      } else {
	        row = Math.round(this.bubble.x / Constants.rowWidth);
	      }
	
	      if (row < 0) row = 0;
	      if (row >= Constants.rows) row = Constants.rows - 1;
	
	      return { row: row, col: col };
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.vx = 0;
	      this.vy = 0;
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
	var rows = exports.rows = 12;
	var cols = exports.cols = 5;
	var rowHeight = exports.rowHeight = 32;
	var rowWidth = exports.rowWidth = 32;
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
	
	var oddDeltas = exports.oddDeltas = [[-1, -1], [0, -1], [-1, 0], [1, 0], [-1, 1], [0, 1]];
	var evenDeltas = exports.evenDeltas = [[0, -1], [1, -1], [-1, 0], [1, 0], [0, 1], [1, 1]];

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
	var Gun = __webpack_require__(4);
	
	var Game = function () {
	  function Game(stage, context) {
	    _classCallCheck(this, Game);
	
	    this.bubbles = [];
	    this.shooting = false;
	    this.turns = 100;
	    this.stage = stage;
	    this.context = context;
	    this.text = "";
	    this.gameOver = false;
	    this.colors = [Constants.blue, Constants.red, Constants.yellow, Constants.green];;
	  }
	
	  _createClass(Game, [{
	    key: "reset",
	    value: function reset() {
	      this.stage.removeAllChildren();
	      this.turns = 30;
	      this.bubbles = [];
	      this.gameOver = false;
	      this.start();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.colors = this.remainingColors();
	      this.createBubbles();
	      this.renderBubbles();
	      this.gun = new Gun(this, this.stage);
	      this.resetCurrentBubble();
	      this.stage.addChild(this.gun.gun);
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.checkGameOver();
	      this.updateAllBubbles();
	      // this.dropFloatingBubbles();
	      this.renderTurns();
	      if (this.shooting) {
	        this.currentBubble.update();
	        this.checkCollisions();
	        this.renderBubbles();
	      }
	    }
	  }, {
	    key: "updateAllBubbles",
	    value: function updateAllBubbles() {
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) bubble.update();
	      });
	    }
	  }, {
	    key: "resetCurrentBubble",
	    value: function resetCurrentBubble() {
	      var pos = { x: 190, y: 355 };
	      var bubble = new Bubble(pos, this.remainingColors());
	      this.currentBubble = bubble;
	      this.gun.currentBubble = bubble;
	      this.stage.addChild(this.currentBubble.bubble);
	    }
	  }, {
	    key: "createBubbles",
	    value: function createBubbles() {
	      for (var x = 0; x < Constants.rows; x++) {
	        this.bubbles[x] = [];
	        for (var y = 0; y < Constants.cols; y++) {
	          console.log("Bubble");
	          console.log(x);
	          console.log(y);
	          console.log(this.getBubbleCoords(x, y));
	          this.bubbles[x][y] = new Bubble(this.getBubbleCoords(x, y), this.colors);
	        }
	      }
	    }
	  }, {
	    key: "renderTurns",
	    value: function renderTurns() {
	      this.stage.removeChild(this.text);
	      var text = new createjs.Text("Turns Left: " + this.turns, "18px Arial", "#ffffff");
	      text.x = 250;
	      text.y = 370;
	      text.textBaseline = "alphabetic";
	      this.text = text;
	      this.stage.addChild(text);
	    }
	  }, {
	    key: "renderBubbles",
	    value: function renderBubbles() {
	      var _this = this;
	
	      this.allBubbles().forEach(function (bubble) {
	        _this.stage.addChild(bubble.bubble);
	      });
	    }
	  }, {
	    key: "remainingColors",
	    value: function remainingColors() {
	      var _this2 = this;
	
	      var remainingColors = [];
	
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) {
	          _this2.colors.forEach(function (color) {
	            if (bubble.color.color === color.color && !remainingColors.includes(color)) {
	              remainingColors.push(color);
	            }
	          });
	        }
	      });
	
	      if (remainingColors.length === 0) {
	        return this.colors;
	      } else {
	        return remainingColors;
	      }
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
	      var _this3 = this;
	
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) {
	          if (_this3.checkCollision(bubble.bubble, _this3.gun.currentBubble) || _this3.gun.currentBubble.y <= 0) {
	            _this3.turns -= 1;
	            _this3.gun.currentBubble.snapBubble();
	            _this3.addBubbleToBoard();
	            _this3.burstMatching(_this3.gun.currentBubble);
	            _this3.resetCurrentBubble();
	            _this3.shooting = false;
	            console.log(_this3.bubbles);
	          }
	        }
	      });
	    }
	  }, {
	    key: "burstMatching",
	    value: function burstMatching(bubble) {
	      var _this4 = this;
	
	      var matchingBubbles = this.findMatching(bubble);
	
	      if (matchingBubbles.length >= 3) {
	        matchingBubbles.forEach(function (bubble) {
	          _this4.removeBubble(bubble);
	        });
	        this.dropFloatingBubbles();
	      }
	    }
	  }, {
	    key: "findMatching",
	    value: function findMatching(bubble) {
	      this.resetBubbles();
	
	      var uncheckedBubbles = [bubble];
	      bubble.processed = true;
	      var matching = [];
	
	      while (uncheckedBubbles.length > 0) {
	        var currentBubble = uncheckedBubbles.pop();
	
	        if (currentBubble.color.color === bubble.color.color) {
	          matching.push(currentBubble);
	          var neighbors = this.getNeighbors(currentBubble);
	          neighbors.forEach(function (bubble) {
	            if (!bubble.processed) {
	              uncheckedBubbles.push(bubble);
	              bubble.processed = true;
	            }
	          });
	        }
	      }
	      return matching;
	    }
	  }, {
	    key: "dropFloatingBubbles",
	    value: function dropFloatingBubbles() {
	      var _this5 = this;
	
	      this.resetBubbles();
	
	      var floating = [];
	
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) {
	          if (!bubble.processed) {
	            var cluster = _this5.findFloating(bubble);
	            if (cluster.every(function (bubble) {
	              return bubble.y !== 0;
	            })) {
	              floating = floating.concat(cluster);
	            }
	          }
	        }
	      });
	
	      floating.forEach(function (bubble) {
	        var pos = bubble.getBoardPosition();
	        bubble.vy = 10;
	
	        window.setTimeout(function () {
	          _this5.bubbles[pos.row][pos.col] = -1;
	          _this5.stage.removeChild(bubble.bubble);
	        }, 1000);
	      });
	    }
	  }, {
	    key: "findFloating",
	    value: function findFloating(bubble) {
	      var unchecked = [bubble];
	      bubble.processed = true;
	      var floating = [];
	
	      while (unchecked.length > 0) {
	        var currentBubble = unchecked.pop();
	        floating.push(currentBubble);
	
	        var neighbors = this.getNeighbors(currentBubble);
	        neighbors.forEach(function (bubble) {
	          if (!bubble.processed) {
	            unchecked.push(bubble);
	            bubble.processed = true;
	          }
	        });
	      }
	
	      return floating;
	    }
	  }, {
	    key: "resetBubbles",
	    value: function resetBubbles() {
	      var flatBubbles = [].concat.apply([], this.bubbles);
	      flatBubbles.forEach(function (bubble) {
	        if (bubble !== -1) bubble.processed = false;
	      });
	    }
	  }, {
	    key: "addBubbleToBoard",
	    value: function addBubbleToBoard() {
	      var pos = this.gun.currentBubble.getBoardPosition();
	
	      if (this.bubbles[pos.row][pos.col] instanceof Bubble) {
	        console.log("issue");
	        console.log(pos.row);
	        console.log(pos.col);
	        this.gun.currentBubble.x += Constants.rowWidth;
	        this.bubbles[pos.row + 1][pos.col] = this.gun.currentBubble;
	      } else {
	        console.log(pos.row);
	        console.log(pos.col);
	        this.bubbles[pos.row][pos.col] = this.gun.currentBubble;
	      }
	    }
	  }, {
	    key: "removeBubble",
	    value: function removeBubble(bubble) {
	      var grid = bubble.getBoardPosition();
	      this.bubbles[grid.row][grid.col] = -1;
	      this.stage.removeChild(bubble.bubble);
	    }
	  }, {
	    key: "allBubbles",
	    value: function allBubbles() {
	      var flatBubbles = [].concat.apply([], this.bubbles);
	      return flatBubbles;
	    }
	  }, {
	    key: "getBubbleCoords",
	    value: function getBubbleCoords(x, y) {
	      var bubblex = x * Constants.rowWidth;
	      var bubbley = y * Constants.rowHeight;
	
	      if (y % 2 === 0) {
	        bubblex += Constants.rowWidth / 2;
	      }
	
	      return { x: bubblex, y: bubbley };
	    }
	  }, {
	    key: "getNeighbors",
	    value: function getNeighbors(bubble) {
	      var pos = bubble.getBoardPosition();
	      var neighbors = [];
	
	      var deltas = pos.col % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;
	
	      for (var i = 0; i < deltas.length; i++) {
	        var deltax = pos.row + deltas[i][0];
	        var deltay = pos.col + deltas[i][1];
	
	        if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < 12) {
	          if (this.bubbles[deltax][deltay]) {
	            if (this.bubbles[deltax][deltay] !== -1) {
	              neighbors.push(this.bubbles[deltax][deltay]);
	            }
	          }
	        }
	      }
	
	      return neighbors;
	    }
	  }, {
	    key: "checkGameOver",
	    value: function checkGameOver() {
	      if (!this.gameOver) {
	        this.checkWin();
	        this.checkLost();
	      }
	    }
	  }, {
	    key: "checkWin",
	    value: function checkWin() {
	      var _this6 = this;
	
	      if (this.allBubbles().every(function (bubble) {
	        return !(bubble instanceof Bubble);
	      })) {
	        this.renderGameOverMsg(true);
	        if (this.gameOver === false) {
	          window.setTimeout(function () {
	            _this6.reset();
	          }, 2000);
	          this.gameOver = true;
	        }
	      }
	    }
	  }, {
	    key: "checkLost",
	    value: function checkLost() {
	      var _this7 = this;
	
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble.y > 305 && bubble.vy === 0 || _this7.turns === 0) {
	          _this7.renderGameOverMsg(false);
	
	          window.setTimeout(function () {
	            _this7.reset();
	          }, 2000);
	          _this7.gameOver = true;
	        }
	      });
	    }
	  }, {
	    key: "renderGameOverMsg",
	    value: function renderGameOverMsg(isWon) {
	      var text = "";
	      if (isWon) {
	        text = new createjs.Text("You Win!", "80px Arial", "#ffffff");
	        text.x = 55;
	      } else {
	        text = new createjs.Text("You Lost! Try again!", "40px Arial", "#ffffff");
	        text.x = 35;
	      }
	
	      text.y = 200;
	      text.textBaseline = "alphabetic";
	      this.stage.addChild(text);
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gun = function () {
	  function Gun(game, stage) {
	    _classCallCheck(this, Gun);
	
	    this.game = game;
	    this.gun = this.createGun();
	    this.stage = stage;
	    this.handleRotation = this.handleRotation.bind(this);
	    this.handleShoot = this.handleShoot.bind(this);
	    this.bindKeyHandlers();
	  }
	
	  _createClass(Gun, [{
	    key: "bindKeyHandlers",
	    value: function bindKeyHandlers() {
	      document.addEventListener("keydown", this.handleRotation);
	      document.addEventListener("keypress", this.handleShoot);
	    }
	  }, {
	    key: "handleRotation",
	    value: function handleRotation(event) {
	      var code = event.keyCode;
	
	      if (code === 37 || code === 65) {
	        event.preventDefault();
	        if (this.gun.rotation > -85) this.gun.rotation -= 5;
	      } else if (code === 39 || code === 68) {
	        event.preventDefault();
	        if (this.gun.rotation < 85) this.gun.rotation += 5;
	      }
	    }
	  }, {
	    key: "handleShoot",
	    value: function handleShoot(event) {
	      var code = event.keyCode;
	
	      if (code === 32 || code === 13) this.shoot();
	    }
	  }, {
	    key: "shoot",
	    value: function shoot() {
	      this.currentBubble.fire(this.gun.rotation);
	      this.game.shooting = true;
	    }
	  }, {
	    key: "createGun",
	    value: function createGun() {
	      var img = new Image();
	      img.src = "./assets/images/gun.png";
	      var gun = new createjs.Bitmap(img);
	
	      var gunContainer = new createjs.Container();
	      gunContainer.x = 205;
	      gunContainer.y = 372;
	      gun.regX = 16;
	      gun.regY = 51;
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