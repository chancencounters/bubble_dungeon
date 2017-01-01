const Bubble = require("./bubble");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);
  const context = canvas.getContext("2d");
  const game = new Game(stage, context);

  game.start();
  const updateTicker = () => {
    game.update();
    stage.update();
  };
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', updateTicker);
});
