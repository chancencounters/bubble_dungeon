const Bubble = require("./bubble");

class Gun {
  constructor (game, stage, colors){
    this.game = game;
    this.gun = this.createGun();
    this.stage = stage;
    this.handleRotation = this.handleRotation.bind(this);
    this.handleShoot = this.handleShoot.bind(this);

    this.setCurrentBubble(colors);
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", this.handleRotation);
    document.addEventListener("keypress", this.handleShoot);
  }

  update() {
    this.currentBubble.update();
  }

  handleRotation(event) {
    const code = event.keyCode;

    if (code === 37 || code === 65){
      event.preventDefault();
      if (this.gun.rotation > -85) this.gun.rotation -= 5;
    } else if (code === 39 || code === 68){
      event.preventDefault();
      if (this.gun.rotation < 85) this.gun.rotation += 5;
    }
  }

  handleShoot(event) {
    const code = event.keyCode;

    if (code === 32 || code === 13) {
      this.shoot();
    }
  }

  setCurrentBubble(colors) {
    const pos = { x: 190, y: 355 };
    const currentBubble = new Bubble(pos, colors);
    this.currentBubble = currentBubble;
    this.stage.addChild(currentBubble.bubble);
  }

  shoot() {
    this.currentBubble.fire(this.gun.rotation);
    this.game.shooting = true;
  }

  updateCurrentBubble(colors) {
    if (Boolean(this.currentBubble)) {
      this.stage.removeChild(this.currentBubble.bubble);
    }

    const pos = { x: 190, y: 355 };
    const bubble = new Bubble(pos, colors);
    this.currentBubble = bubble;
    this.stage.addChild(this.currentBubble.bubble);
  }

  createGun(){
    const img = new Image();
    img.src = "./assets/images/gun.png";
    const gun = new createjs.Bitmap(img);

    const gunContainer = new createjs.Container();
    gunContainer.x = 200;
    gunContainer.y = 360;
    gun.regX = 11.5;
    gun.regY = 40.5;
    gun.x = 0;
    gun.y = 0;
    gunContainer.addChild(gun);
    return gunContainer;
  }
}

module.exports = Gun;
