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
      bubblex += this.rowWidth / 2;
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

  removeBubble(bubble){
   const grid = bubble.getBoardPosition();
   this.bubbles[grid.row][grid.col] = -1;
   stage.removeChild(bubble.bubble);
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
      this.dropFloatingBubbles();
    }
  }

  findMatching(bubble){
    this.resetBubbles();

    const uncheckedBubbles = [bubble];
    bubble.processed = true;
    const matching = [];

    while (uncheckedBubbles.length > 0){
      let currentBubble = uncheckedBubbles.pop();
      // debugger
      if (currentBubble.color.color === bubble.color.color) {
         matching.push(currentBubble);
        //  debugger
         let neighbors = this.getNeighbors(currentBubble);
        //  debugger
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

    const deltas = pos.col % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;

    for (let i = 0; i < deltas.length; i++) {
      let deltax = pos.row + deltas[i][0];
      let deltay = pos.col + deltas[i][1];
      // debugger
      if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < 14) {
        if (this.bubbles[deltax][deltay]){
          // debugger
          if (this.bubbles[deltax][deltay] !== -1){
            // debugger
            neighbors.push(this.bubbles[deltax][deltay]);
          }
        }
      }
    }
    // debugger
    return neighbors;
  }

  dropFloatingBubbles(){
    this.resetBubbles();

    let floating = [];

    this.allBubbles().forEach( bubble => {
      if (bubble !== -1) {
        if (!bubble.processed) {

          const cluster = this.findFloating(bubble);

          if (cluster.every( bubble => bubble.y !== 16)){
            floating = floating.concat(cluster);
          }
        }
      }
    });

    floating.forEach( bubble => {
      const pos = bubble.getBoardPosition();
      this.bubbles[pos.row][pos.col] = -1;
      window.stage.removeChild(bubble.bubble);
    });
  }

  findFloating(bubble) {
    const unchecked = [bubble];
    bubble.processed = true;
    const floating = [];

    while (unchecked.length > 0) {
      const currentBubble = unchecked.pop();

      floating.push(currentBubble);

      const neighbors = this.getNeighbors(currentBubble);

      neighbors.forEach( bubble => {
        if(!bubble.processed){
          unchecked.push(bubble);
          bubble.processed = true;
        }
      });
    }

    return floating;
  }
}

module.exports = Game;
