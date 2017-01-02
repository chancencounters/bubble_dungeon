const Bubble = require("./bubble");

class Gun {
  constructor (game, stage){
    this.game = game;
    this.gun = this.createGun();
    this.stage = stage;
    this.handleRotation = this.handleRotation.bind(this);
    this.handleShoot = this.handleShoot.bind(this);
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

    if (code === 32 || code === 13) this.shoot();
  }

  shoot() {
    this.currentBubble.fire(this.gun.rotation);
    this.game.shooting = true;
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
