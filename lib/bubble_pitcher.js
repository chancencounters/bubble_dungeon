const Bubble = require("./bubble");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);
  const game = new Game(stage);
});
