# Bubble Dungeon

[Live](http://www.zackyu.com/bubble_dungeon)

![Bubble Dungeon](assets/images/bubble_dungeon.png)

Bubble Dungeon is a clone of the classic bubble shooter game. This version is turn based, where the player needs to pop all the bubbles before the number of turns runs out. The player loses once they run out of turns or a bubble touches the bottom of the screen. It utilizes vanilla Javascript, HTML5 and CreateJS.

## How To Play

The name of the game is popping bubbles! To break bubbles just match
3 or more bubbles of the same color. Any floating bubbles will also pop.
User the `left` and `right` arrow keys to aim and the `space bar` to shoot.
Pop all the bubbles before you run out of turns to escape the dungeon!

## Features

Snapping the bubble on the board is accomplished through the use of `getBoardPosition`, which calculates the coordinates of where the bubble should snap onto the hexagonal board. `snapBubble` then checks if there is a bubble in that position. If there is a bubble in place, then the bubbles coordinates are recalculated based on the trajectory of the projectile.

```JavaScript
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

  this.currentBubble.bubble.x = bubbleX;
  this.currentBubble.bubble.y = bubbleY;
  this.bubbles[pos.row][pos.col] = this.currentBubble;
}

getBoardPosition() {
  let col = Math.round(this.bubble.y / Constants.rowHeight);
  let row;
  if (col % 2 === 0) {
    row = Math.round((this.bubble.x - 16) / Constants.rowWidth)
  } else {
    row = Math.round(this.bubble.x/ Constants.rowWidth);
  }

  if (row < 0) row = 0;
  if (row >= Constants.rows) row = Constants.rows - 1;

  return { row: row, col: col };
}
```

In order to pop bubbles, I employed a queue and breadth first search algorithm to get all the matching bubbles. I had a `getNeighbors` function that returned all the neighbors of a bubble based on its position on the board. A processed boolean property kept track of which bubbles had been processed.

``` JavaScript
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
```

```JavaScript
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
```

For floating bubbles, the `findFloating` function returns all the clusters of bubbles. The `dropFloatingBubbles` checks every bubble to see if it touches the top of the canvas. If none of the bubbles touch the top of the canvas then they were floating bubbles.

```JavaScript
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
```
