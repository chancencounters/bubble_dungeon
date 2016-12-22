const Bubble = require("./bubble");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  window.stage = new createjs.Stage(canvas);
  const game = new Game(window.stage);

  game.start();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', window.stage);
});
