const Bubble = require("./bubble");
const Gun = require("./gun");
import * as Constants from './constants';

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
    this.shooting = false;
  }

  update() {
    if (this.shooting) {
      this.gun.update();
      this.checkCollisions();
      this.renderBubbles();
    }
  }

  start() {
    this.createBubbles();
    this.renderBubbles();
    this.gun = new Gun(this);
    window.stage.addChild(this.gun.gun);
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
    this.allBubbles().forEach(bubble => {
      window.stage.addChild(bubble.bubble);
    });
  }

  checkCollision(bubble, currentBubble) {
    const dx = bubble.x - currentBubble.bubble.x;
    const dy = bubble.y - currentBubble.bubble.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 32) return true;

    return false;
  }

  checkCollisions() {
    this.allBubbles().forEach((bubble) => {
      if (bubble!== -1) {
        if (this.checkCollision(bubble.bubble, this.gun.currentBubble)) {
          this.gun.currentBubble.stop();
          this.gun.currentBubble.snapBubble();
          this.addBubbleToBoard(this.gun.currentBubble);
          this.burstMatching(this.gun.currentBubble);
          this.gun.updateCurrentBubble();
          this.shooting = false;
        }
      }
    });
  }

  addBubbleToBoard(bubble) {
    const pos = this.gun.currentBubble.getBoardPosition();
    this.bubbles[pos.row][pos.col] = bubble;
  }

  allBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    return flatBubbles;
  }

  burstMatching(bubble){
    const matchingBubbles = this.findMatching(bubble);

    if (matchingBubbles.length >= 3){
      matchingBubbles.forEach( bubble => {
        this.removeBubble(bubble);
      });
      // this.dropFloatingBubbles();
    }
  }

  removeBubble(bubble){
   const grid = bubble.getBoardPosition();
   this.bubbles[grid.row][grid.col] = -1;
   stage.removeChild(bubble.bubble);
  }

  findMatching(bubble){
    this.resetBubbles();

    const uncheckedBubbles = [bubble];
    bubble.processed = true;
    const matching = [];

    while (uncheckedBubbles.length > 0){
      let currentBubble = uncheckedBubbles.pop();

      if (currentBubble.color.color === bubble.color.color) {
         matching.push(currentBubble);

         let neighbors = this.getNeighbors(currentBubble);

         neighbors.forEach( bubble => {
           if(!bubble.processed){
             uncheckedBubbles.push(bubble);
             bubble.processed = true;
           }
         });
      }
    }
    return matching;
  }

  resetBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    flatBubbles.forEach( bubble => {
      if ( bubble !== -1 ) bubble.processed = false;
    });
  }

  getNeighbors(bubble) {
    let pos = bubble.getBoardPosition();
    const neighbors = [];

    const deltas = pos.row % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;

    for (let i = 0; i < deltas.length; i++) {
      let deltax = pos.row + deltas[i][0];
      let deltay = pos.col + deltas[i][1];

      if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < Constants.cols) {

        if (this.bubbles[deltax][deltay]){
          if (this.bubbles[deltax][deltay] !== -1){

            neighbors.push(this.bubbles[deltax][deltay]);
          }
        }
      }
    }
    return neighbors;
  }
}

module.exports = Game;
