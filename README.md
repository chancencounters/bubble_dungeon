### Background

Bubble Pitcher is a clone of the classic bubble shooter game. This version will be survival style. After a designated amount of player moves, another row of bubbles will be generated. The player loses once a bubble touches line on the bottom. It utilizes vanilla Javascript, HTML5 and CreateJS.

### Functionality & MVP

 Users will be able to:

- [ ] See their current score
- [ ] Shoot bubbles
- [ ] Pop bubbles that match-3

In addition, this project will include:

- [ ] A production README

### Wireframes

  This app will consist of a single screen with the game board and a description next to it. There will be restart button on the right, underneath the description.


### Architecture and Technologies

  This project will be implemented with the following technologies:

  - Vanilla JavaScript for overall structure and game logic,
  - `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
  - Webpack to bundle and serve up the various scripts.

  In addition to the webpack entry file, there will be three scripts involved in this project:

  `grid.js`: this script will handle the logic for creating and updating the necessary `Easel.js` bubble elements and rendering them to the DOM. The board will be staggered and render the random array of bubbles.

  `bubble.js`: this script will house the constructor and update functions for the bubble objects. Each bubble will contain a `color`, `speed` and `popped` state.

  `shooter.js`: this script will handle the logic for the controls of the game (left arrow, right arrow and shoot).


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `bubble` object to connect to the `grid` object.  Then, use `grid.js` to create and render at the staggered grid. Goals for the day:

- Complete the `bubble.js` module
- Render a staggered grid to the `grid` using `Easel.js`

**Day 3**: Implement the logic match-3 popping of bubbles and trajectory of bubble.

  Goals for the day:

- Able to bounce off walls in the opposite direction.
- Able to pop bubbles off the board when there is a match-3.

**Day 4**: Implement the logic for the shooter and controls for user.

Goals for the day:

- Have a shooter that can shoot bubbles at the staggered board.
- Create controls for restarting the game.
- Style the canvas and add restart button.

### Bonus features

Some added functionality in the future could include:

- [ ] Adjusted difficult, increasing speed at which rows of bubbles appear.
