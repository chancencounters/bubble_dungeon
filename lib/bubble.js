class Bubble {
  constructor(pos, color) {
      this.x = pos.x;
      this.y = pos.y;
      this.color = color;
  }

  renderBubble() {
    const g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
    g.beginFill(createjs.Graphics.getRGB(255,0,0));
    g.drawCircle(0,0,3);

    const circle = new createjs.Shape(g);
    circle.x = 100;
    circle.y = 100;
  }

  getBubbleCoords(row, col) {
    const bubbleX = row * this.bubbleWidth;

    if (row % 2 === 0) {
        bubbleX += this.bubbleWidth / 2;
    }

    const bubbleY = this.height + row * this.width;
    return { bubbleX: bubbleX, bubbleY: bubbleY };
  }
}
