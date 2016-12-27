import * as Constants from './constants';

class Bubble {
  constructor(pos) {
      this.x = pos.x;
      this.y = pos.y;
      this.xCoefficient = 1;
      this.shot = false;
      this.processed = false;
      this.colors = [window.blue, window.red, window.yellow, window.green];
      this.createBubble();
  }

  createBubble() {
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.bubble = new createjs.Sprite(this.color.sheet, "animate");
    this.bubble.x = this.x;
    this.bubble.y = this.y;
  }

  move() {
     //makes sure the projectile bounces off walls
     if (this.bubble.x < 0) {
       this.xCoefficient *= -1;
     } else if (this.bubble.x > 570) {
       this.xCoefficient *= -1;
     }

     let angle = this.toRadians(-1 * (this.angle + 180));

     this.bubble.x += this.xCoefficient * 10 * Math.sin(angle);
     this.bubble.y += 10 * Math.cos(angle);
   }

   fire(angle) {
     this.shot = true;
     this.angle = angle;
   }

  update() {
    if (this.shot === true) {
      this.move();
    } else {
      return;
    }
  }

  snapBubble() {
    const boardPosition = this.getBoardPosition();
    let bubbleX = (boardPosition.row * Constants.rowWidth) + Constants.radius;
    let bubbleY = (boardPosition.col * Constants.rowHeight) + Constants.radius;

    if (boardPosition.col % 2 === 0) {
      bubbleX += Constants.rowWidth / 2;
    }

    this.bubble.x = bubbleX;
    this.bubble.y = bubbleY;
  }


  getBoardPosition() {
    const row = Math.floor(this.bubble.x / Constants.rowWidth);
    const col = Math.floor(this.bubble.y / Constants.rowHeight);

    return { row: row, col: col };
  }

  stop() {
    this.shot = false;
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
}

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
      "animate": [0, 5, "animate", .15],
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
      "animate": [0, 5, "animate", .15],
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
      "animate": [0, 5, "animate", .15],
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
      "animate": [0, 5, "animate", .15],
    }
  })
};
