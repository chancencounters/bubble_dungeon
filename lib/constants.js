export const rows = 12;
export const cols = 5;
export const rowHeight = 32;
export const rowWidth = 32;
export const radius = 16;
export const bubbleHeight = 32;
export const bubbleWidth = 32;

export const blue = {
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

export const yellow = {
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

export const red = {
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

export const green = {
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

export const oddDeltas = [[-1,-1], [0,-1], [-1,0], [1, 0], [-1,1], [0,1]];
export const evenDeltas = [[0,-1], [1,-1], [-1,0], [1, 0], [0,1], [1,1]];
