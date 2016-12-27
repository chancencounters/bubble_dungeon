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
	    _classCallCheck(this, Bubble);
	
	    this.x = pos.x;
	    this.y = pos.y;
	    this.vx = 0;
	    this.vy = 0;
	    this.xCoefficient = 1;
	    this.processed = false;
	    this.colors = [window.blue, window.red, window.yellow, window.green];
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
	    key: "move",
	    value: function move() {
	      var angle = this.toRadians(-1 * (this.angle + 180));
	
	      this.vx = 10 * Math.sin(angle);
	      this.vy = 10 * Math.cos(angle);
	    }
	  }, {
	    key: "fire",
	    value: function fire(angle) {
	      this.angle = angle;
	      this.move();
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.bubble.x < 0) {
	        this.xCoefficient *= -1;
	      } else if (this.bubble.x > 530) {
	        this.xCoefficient *= -1;
	      }
	      this.x += this.vx * this.xCoefficient;
	      this.y += this.vy;
	      this.bubble.x = this.x;
	      this.bubble.y = this.y;
	    }
	  }, {
	    key: "snapBubble",
	    value: function snapBubble() {
	      var pos = this.getBoardPosition();
	      var bubbleX = pos.row * Constants.rowWidth;
	      var bubbleY = pos.col * Constants.rowHeight + Constants.radius;
	
	      if (pos.col % 2 === 0) {
	        bubbleX += Constants.rowWidth / 2;
	      }
	
	      this.x = bubbleX;
	      this.y = bubbleY;
	      this.bubble.x = bubbleX;
	      this.bubble.y = bubbleY;
	    }
	  }, {
	    key: "getBoardPosition",
	    value: function getBoardPosition() {
	      var row = Math.floor(this.bubble.x / Constants.rowWidth);
	      var col = Math.floor(this.bubble.y / Constants.rowHeight);
	
	      if (row >= Constants.rows) {
	        row -= 1;
	      }
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
	      "animate": [0, 5, "animate", .15]
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
	      "animate": [0, 5, "animate", .15]
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
	      "animate": [0, 5, "animate", .15]
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
	      "animate": [0, 5, "animate", .15]
	    }
	  })
	};

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
	  function Game(stage) {
	    _classCallCheck(this, Game);
	
	    this.bubbles = [];
	    this.rows = 16;
	    this.cols = 7;
	    this.rowHeight = 30;
	    this.rowWidth = 34;
	    this.radius = 16;
	    this.bubbleHeight = 32;
	    this.bubbleWidth = 32;
	    this.shooting = false;
	  }
	
	  _createClass(Game, [{
	    key: "update",
	    value: function update() {
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) {
	          bubble.update();
	        }
	      });
	      if (this.shooting) {
	        this.gun.update();
	        this.checkCollisions();
	        this.renderBubbles();
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.createBubbles();
	      this.renderBubbles();
	      this.gun = new Gun(this);
	      window.stage.addChild(this.gun.gun);
	    }
	  }, {
	    key: "createBubbles",
	    value: function createBubbles() {
	      for (var x = 0; x < this.rows; x++) {
	        this.bubbles[x] = [];
	        for (var y = 0; y < this.cols; y++) {
	          this.bubbles[x][y] = new Bubble(this.getBubbleCoords(x, y));
	        }
	      }
	    }
	  }, {
	    key: "getBubbleCoords",
	    value: function getBubbleCoords(x, y) {
	      var bubblex = x * this.rowWidth;
	      var bubbley = y * this.rowHeight + this.radius;
	
	      if (y % 2 === 0) {
	        bubblex += this.rowWidth / 2;
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
	        if (bubble !== -1) {
	          if (_this.checkCollision(bubble.bubble, _this.gun.currentBubble)) {
	            _this.gun.currentBubble.stop();
	            _this.gun.currentBubble.snapBubble();
	            _this.addBubbleToBoard();
	            _this.burstMatching(_this.gun.currentBubble);
	            _this.gun.updateCurrentBubble();
	            _this.shooting = false;
	          }
	        }
	      });
	    }
	  }, {
	    key: "addBubbleToBoard",
	    value: function addBubbleToBoard() {
	      var pos = this.gun.currentBubble.getBoardPosition();
	
	      if (this.bubbles[pos.row][pos.col] instanceof Bubble) {
	        this.bubbles[pos.row][pos.col + 1] = this.gun.currentBubble;
	      } else {
	        this.bubbles[pos.row][pos.col] = this.gun.currentBubble;
	      }
	    }
	  }, {
	    key: "removeBubble",
	    value: function removeBubble(bubble) {
	      var grid = bubble.getBoardPosition();
	      this.bubbles[grid.row][grid.col] = -1;
	      stage.removeChild(bubble.bubble);
	    }
	  }, {
	    key: "allBubbles",
	    value: function allBubbles() {
	      var flatBubbles = [].concat.apply([], this.bubbles);
	      return flatBubbles;
	    }
	  }, {
	    key: "burstMatching",
	    value: function burstMatching(bubble) {
	      var _this2 = this;
	
	      var matchingBubbles = this.findMatching(bubble);
	
	      if (matchingBubbles.length >= 3) {
	        matchingBubbles.forEach(function (bubble) {
	          _this2.removeBubble(bubble);
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
	        // debugger
	        if (currentBubble.color.color === bubble.color.color) {
	          matching.push(currentBubble);
	          //  debugger
	          var neighbors = this.getNeighbors(currentBubble);
	          //  debugger
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
	    key: "resetBubbles",
	    value: function resetBubbles() {
	      var flatBubbles = [].concat.apply([], this.bubbles);
	      flatBubbles.forEach(function (bubble) {
	        if (bubble !== -1) bubble.processed = false;
	      });
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
	        // debugger
	        if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < 14) {
	          if (this.bubbles[deltax][deltay]) {
	            // debugger
	            if (this.bubbles[deltax][deltay] !== -1) {
	              // debugger
	              neighbors.push(this.bubbles[deltax][deltay]);
	            }
	          }
	        }
	      }
	      // debugger
	      return neighbors;
	    }
	  }, {
	    key: "dropFloatingBubbles",
	    value: function dropFloatingBubbles() {
	      var _this3 = this;
	
	      this.resetBubbles();
	
	      var floating = [];
	
	      this.allBubbles().forEach(function (bubble) {
	        if (bubble !== -1) {
	          if (!bubble.processed) {
	
	            var cluster = _this3.findFloating(bubble);
	
	            if (cluster.every(function (bubble) {
	              return bubble.y !== 16;
	            })) {
	              floating = floating.concat(cluster);
	            }
	          }
	        }
	      });
	
	      floating.forEach(function (bubble) {
	        var pos = bubble.getBoardPosition();
	        bubble.vy = 10;
	
	        window.setInterval(function () {
	          _this3.bubbles[pos.row][pos.col] = -1;
	          window.stage.removeChild(bubble.bubble);
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
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bubble = __webpack_require__(1);
	
	var Gun = function () {
	  function Gun(game) {
	    _classCallCheck(this, Gun);
	
	    this.game = game;
	    this.gun = this.createGun();
	    this.handleRotation = this.handleRotation.bind(this);
	    this.handleShoot = this.handleShoot.bind(this);
	
	    this.setCurrentBubble();
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
	
	      if (code === 32 || code === 13) {
	        this.shoot();
	      }
	    }
	  }, {
	    key: "setCurrentBubble",
	    value: function setCurrentBubble() {
	      var pos = { x: 280, y: 455 };
	      var currentBubble = new Bubble(pos);
	      this.currentBubble = currentBubble;
	      window.stage.addChild(currentBubble.bubble);
	    }
	  }, {
	    key: "shoot",
	    value: function shoot() {
	      this.currentBubble.fire(this.gun.rotation);
	      this.game.shooting = true;
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