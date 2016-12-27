import * as Constants from './constants';

class Bubble {
  constructor(pos) {
    this.x = pos.x;
    this.y = pos.y;
    this.vx = 0;
    this.vy = 0;
    this.xCoefficient = 1;
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
    let angle = this.toRadians(-1 * (this.angle + 180));

    this.vx = 10 * Math.sin(angle);
    this.vy = 10 * Math.cos(angle);
  }

  fire(angle) {
    this.angle = angle;
    this.move()
  }

  update() {
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

  snapBubble() {
    const pos = this.getBoardPosition();
    let bubbleX = (pos.row * Constants.rowWidth);
    let bubbleY = (pos.col * Constants.rowHeight) + Constants.radius;

    if (pos.col % 2 === 0) {
      bubbleX += Constants.rowWidth / 2;
    }

    this.x = bubbleX;
    this.y = bubbleY;
    this.bubble.x = bubbleX;
    this.bubble.y = bubbleY;
  }


  getBoardPosition() {
    let row = Math.floor(this.bubble.x / Constants.rowWidth);
    let col = Math.floor(this.bubble.y / Constants.rowHeight);

    if (row >= Constants.rows) {
      row -= 1;
    }
    return { row: row, col: col };
  }

  stop() {
    this.vx = 0;
    this.vy = 0;
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
