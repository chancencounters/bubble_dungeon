### Background

Bubble Dungeon is a clone of the classic bubble shooter game. This version will be turn based. The player needs to pop all the bubbles before the number of turns runs out. The player loses once they run out of turns or a bubble touches the bottom of the screen. It utilizes vanilla Javascript, HTML5 and CreateJS.

### Functionality & MVP

 Users will be able to:

- [ ] See their remaining turns
- [ ] Shoot bubbles
- [ ] Pop bubbles that match-3

In addition, this project will include:

- [ ] A production README

### Wireframes

  This app will consist of a single screen with the game board and instructions next to it.

### Architecture and Technologies

  This project will be implemented with the following technologies:

  - Vanilla JavaScript for overall structure and game logic,
  - `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
  - Webpack to bundle and serve up the various scripts.

  In addition to the webpack entry file, there will be three scripts involved in this project:

  `game.js`: this script will handle the logic for creating and updating the necessary `Easel.js` bubble elements and rendering them to the DOM. The board will be staggered and render a random array of bubbles.

  `bubble.js`: this script will house the constructor and update functions for the bubble objects.

  `gun.js`: this script will handle the logic for the controls of the game (left arrow, right arrow and shoot).


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `bubble` object to connect to the `game` object.  Then, use `game.js` to create and render at the staggered grid. Goals for the day:

- Complete the `bubble.js` module
- Render a staggered grid to the `board` using `Easel.js`

**Day 3**: Implement the logic match-3 popping of bubbles and trajectory of bubble.

  Goals for the day:

- Able to bounce off walls in the opposite direction.
- Able to pop bubbles off the board when there is a match-3.

**Day 4**: Implement the logic for the shooter and controls for user.

Goals for the day:

- Have a shooter that can shoot bubbles at the staggered board.
- Style the canvas.

### Bonus features

Some added functionality in the future could include:

- [ ] Adjusted difficulty, increasing speed at which rows of bubbles appear.
