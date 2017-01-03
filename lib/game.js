const Bubble = require("./bubble");
const Turret = require("./turret");
import * as Constants from './constants';

class Game {
  constructor(stage, context) {
    this.bubbles = [];
    this.shooting = false;
    this.turns = 30;
    this.stage = stage;
    this.context = context;
    this.text = "";
    this.gameOver = false;
    this.handleShoot = this.handleShoot.bind(this);
    this.bindKeyHandlers();
    this.colors = [Constants.white, Constants.black, Constants.yellow, Constants.green];;
  }

  bindKeyHandlers(){
    document.addEventListener("keypress", this.handleShoot);
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
    this.turret = new Turret();
    this.resetCurrentBubble();
    this.stage.addChild(this.turret.gun);
  }

  update() {
    this.checkGameOver();
    this.updateAllBubbles();
    this.renderTurns();
    if (this.shooting) {
      this.currentBubble.update();
      this.checkCollisions();
      this.renderBubbles();
    }
  }

  updateAllBubbles() {
    this.allBubbles().forEach((bubble) => {
      if (bubble !== -1) bubble.update();
    });
  }

  resetCurrentBubble() {
    const pos = { x: 190, y: 355 };
    const bubble = new Bubble(pos, this.remainingColors());
    this.currentBubble = bubble;
    this.turret.currentBubble = bubble;
    this.stage.addChild(this.currentBubble.bubble);
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

  remainingColors() {
    const remainingColors = [];

    this.allBubbles().forEach(bubble => {
      if (bubble !== -1) {
        this.colors.forEach(color => {
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

  handleShoot(event) {
    const code = event.keyCode;
    if ((code === 32 || code === 13) && !this.gameOver) {
      this.turret.shoot();
      this.shooting = true;
    }
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
        if ((this.checkCollision(bubble.bubble, this.currentBubble)) || this.currentBubble.y <= 0) {
          this.turns -= 1;
          this.snapBubble();
          this.burstMatching(this.currentBubble);
          this.resetCurrentBubble();
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

  dropFloatingBubbles(){
    this.resetBubbles();

    let floating = [];

    this.allBubbles().forEach( bubble => {
      if (bubble !== -1) {
        if (!bubble.processed) {
          const cluster = this.findFloating(bubble);
          if (cluster.every( bubble => bubble.y !== 0)){
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

  resetBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    flatBubbles.forEach( bubble => {
      if ( bubble !== -1 ) bubble.processed = false;
    });
  }

  snapBubble() {
    this.currentBubble.stop();
    let pos = this.currentBubble.getBoardPosition();
    let bubbleX = (pos.row * Constants.rowWidth);
    let bubbleY = (pos.col * Constants.rowHeight);

    while (this.bubbles[pos.row][pos.col] instanceof Bubble) {
      this.currentBubble.x += this.currentBubble.inverseVx;
      this.currentBubble.y += this.currentBubble.inverseVy;
      pos = this.currentBubble.getBoardPosition();
      bubbleX = pos.row * Constants.rowWidth;
      bubbleY = pos.col * Constants.rowHeight;
    }

    if (pos.col % 2 === 0) bubbleX += Constants.rowWidth / 2;

    this.currentBubble.x = bubbleX;
    this.currentBubble.y = bubbleY;
    this.currentBubble.bubble.x = bubbleX;
    this.currentBubble.bubble.y = bubbleY;
    this.bubbles[pos.row][pos.col] = this.currentBubble;

  }

  removeBubble(bubble) {
    const pos = bubble.getBoardPosition();
    this.bubbles[pos.row][pos.col] = -1;
    this.stage.removeChild(bubble.bubble);
  }

  allBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    return flatBubbles;
  }

  getBubbleCoords(x, y) {
    let bubblex = (x * Constants.rowWidth);
    let bubbley = (y * Constants.rowHeight);

    if (y % 2 === 0) {
      bubblex += Constants.rowWidth / 2;
    }

    return { x: bubblex, y: bubbley };
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

  checkGameOver() {
    if (!this.gameOver) {
      this.checkWin();
      this.checkLost();
    }
  }

  checkWin() {
    if (this.allBubbles().every( bubble => !(bubble instanceof Bubble) )) {
      this.renderGameOverMsg(true);
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
        this.renderGameOverMsg(false);
          window.setTimeout(() => {
            this.reset();
          }, 2000);
          this.gameOver = true;
      }
    })
  }

  renderGameOverMsg(isWon) {
    let text = "";
    if (isWon) {
      text = new createjs.Text(`You've Escaped!`, "40px Arial", "#ffffff");
      text.x = 55;
    } else {
      text = new createjs.Text(`You Lost! Try again!`, "40px Arial", "#ffffff");
      text.x = 35;
    }

    text.y = 200;
    text.textBaseline = "alphabetic";
    this.stage.addChild(text);
  }
}

module.exports = Game;
