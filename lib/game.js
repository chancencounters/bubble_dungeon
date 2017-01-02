const Bubble = require("./bubble");
const Gun = require("./gun");
import * as Constants from './constants';

class Game {
  constructor(stage, context) {
    this.bubbles = [];
    this.shooting = false;
    this.turns = 60;
    this.stage = stage;
    this.context = context;
    this.text = "";
    this.gameOver = false;
    this.colors = this.remainingColors();
  }

  remainingColors() {
    const colors = [Constants.blue, Constants.red, Constants.yellow, Constants.green];
    const remainingColors = [];

    this.allBubbles().forEach(bubble => {
      if (bubble !== -1) {
        colors.forEach(color => {
          if (bubble.color.color === color.color && !remainingColors.includes(color)) {
            remainingColors.push(color);
          }
        });
      }
    });

    if (remainingColors.length === 0) {
      return colors;
    } else {
      return remainingColors;
    }
  }

  reset() {
    this.stage.removeAllChildren();
    this.turns = 30;
    this.bubbles = [];
    this.gameOver = false;
    this.start();
  }

  start() {
    this.colors = this.remainingColors();
    this.createBubbles();
    this.renderBubbles();
    this.gun = new Gun(this, this.stage, this.colors);
    this.stage.addChild(this.gun.gun);
  }

  update() {
    this.checkGameOver();
    this.colors = this.remainingColors();
    this.allBubbles().forEach((bubble) => {
      if (bubble !== -1) {
        bubble.update();
      }
    });
    this.dropFloatingBubbles();
    if (this.shooting) {
      this.gun.update();
      this.checkCollisions();
      this.renderBubbles();
    }
    this.renderTurns();
  }

  createBubbles() {
    for (let x = 0; x < Constants.rows; x++) {
      this.bubbles[x] = [];
      for (let y = 0; y < Constants.cols; y++) {
        this.bubbles[x][y] = new Bubble(this.getBubbleCoords(x, y), this.colors);
      }
    }
  }

  renderTurns() {
    this.stage.removeChild(this.text);
    const text = new createjs.Text(`Turns Left: ${this.turns}`, "18px Arial", "#ffffff");
    text.x = 250;
    text.y = 370;
    text.textBaseline = "alphabetic";
    this.text = text;
    this.stage.addChild(text);
  }

  renderBubbles() {
    this.allBubbles().forEach(bubble => {
      this.stage.addChild(bubble.bubble);
    });
  }

  getBubbleCoords(x, y) {
    let bubblex = (x * Constants.rowWidth);
    let bubbley = (y * Constants.rowHeight) + Constants.radius;

    if (y % 2 === 0) {
      bubblex += Constants.rowWidth / 2;
    }

    return { x: bubblex, y: bubbley };
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
        if ((this.checkCollision(bubble.bubble, this.gun.currentBubble)) || this.gun.currentBubble.y <= 16) {
          this.turns -= 1;
          this.gun.currentBubble.snapBubble();
          this.addBubbleToBoard();
          this.burstMatching(this.gun.currentBubble);
          this.gun.updateCurrentBubble(this.remainingColors());
          this.shooting = false;
        }
      }
    });
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

      if (currentBubble.color.color === bubble.color.color) {
         matching.push(currentBubble);
         let neighbors = this.getNeighbors(currentBubble);
         neighbors.forEach( bubble => {
           if (!bubble.processed){
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

  addBubbleToBoard() {
    const pos = this.gun.currentBubble.getBoardPosition();

    if (this.bubbles[pos.row][pos.col] instanceof Bubble) {
      this.gun.currentBubble.y += Constants.rowHeight;
      this.gun.currentBubble.x += Constants.rowWidth / 2;
      this.bubbles[pos.row][pos.col + 1] = this.gun.currentBubble;
    } else {
      this.bubbles[pos.row][pos.col] = this.gun.currentBubble;
    }
  }

  removeBubble(bubble) {
    const grid = bubble.getBoardPosition();
    this.bubbles[grid.row][grid.col] = -1;
    this.stage.removeChild(bubble.bubble);
  }

  allBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    return flatBubbles;
  }

  getNeighbors(bubble) {
    let pos = bubble.getBoardPosition();
    const neighbors = [];

    const deltas = pos.col % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;

    for (let i = 0; i < deltas.length; i++) {
      let deltax = pos.row + deltas[i][0];
      let deltay = pos.col + deltas[i][1];

      if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < 12) {
        if (this.bubbles[deltax][deltay]) {
          if (this.bubbles[deltax][deltay] !== -1){
            neighbors.push(this.bubbles[deltax][deltay]);
          }
        }
      }
    }

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
      bubble.vy = 10;

      window.setTimeout(()  => {
        this.bubbles[pos.row][pos.col] = -1;
        this.stage.removeChild(bubble.bubble);
      }, 1000)
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

  checkGameOver() {
    this.checkWin();
    this.checkLost();
  }

  checkWin() {
    if (this.allBubbles().every( bubble => !(bubble instanceof Bubble) )) {
      this.renderWinMsg();
      if (this.gameOver === false) {
        window.setTimeout(() => {
          this.reset();
        }, 2000);
        this.gameOver = true;
      }
    }
  }

  checkLost() {
    this.allBubbles().forEach(bubble => {
      if ((bubble.y > 305 && bubble.vy === 0) || this.turns === 0) {
        this.renderLoseMsg();
        if (this.gameOver === false) {
          window.setTimeout(() => {
            this.reset();
          }, 2000);
          this.gameOver = true;
        }
      }
    })
  }

  renderLoseMsg() {
    const text = new createjs.Text(`You Lost! Try again!`, "40px Arial", "#ffffff");
    text.x = 35;
    text.y = 200;
    text.textBaseline = "alphabetic";
    this.stage.addChild(text);
  }

  renderWinMsg() {
    const text = new createjs.Text(`You Win!`, "80px Arial", "#ffffff");
    text.x = 55;
    text.y = 200;
    text.textBaseline = "alphabetic";
    this.stage.addChild(text);
  }
}

module.exports = Game;
