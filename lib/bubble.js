class Bubble {
  constructor(pos) {
      this.x = pos.x;
      this.y = pos.y;
      this.colors = [window.blue, window.red, window.yellow, window.green];
      this.createBubble();
  }

  createBubble() {
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.bubble = new createjs.Sprite(this.color.sheet, "animate");
    this.bubble.x = this.x;
    this.bubble.y = this.y;
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
