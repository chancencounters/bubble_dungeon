const Bubble = require("./bubble");

class Gun {
  constructor (){
    this.gun = this.createGun();
    this.handleRotation = this.handleRotation.bind(this);
    this.handleShoot = this.handleShoot.bind(this);

    this.setProjectile();
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
      if (this.gun.rotation > -85) this.gun.rotation -= 2.5;
    } else if (code === 39 || code === 68){
      event.preventDefault();
      if (this.gun.rotation < 85) this.gun.rotation += 2.5;
    }
  }

  handleShoot(event) {
    const code = event.keyCode;

    if (code === 32 || code === 13) {
      this.shoot();
    }
  }

  shoot() {
    this.currentBubble.fire(this.gun.rotation);
  }

  updateCurrentBubble() {
    if (Boolean(this.currentBubble)) {
      window.stage.removeChild(this.currentBubble.bubble);
    }

    const pos = { x: 280, y: 455 };
    const bubble = new Bubble(pos);
    this.currentBubble = bubble;
    window.stage.addChild(this.currentBubble.bubble);
  }

  createGun(){
    const img = new Image();
    img.src = "./assets/images/gun.png";
    const gun = new createjs.Bitmap(img);

    const gunContainer = new createjs.Container();
    gunContainer.x = 290;
    gunContainer.y = 460;
    gun.regX = 11.5;
    gun.regY = 40.5;
    gun.x = 0;
    gun.y = 0;
    gunContainer.addChild(gun);
    return gunContainer;
  }
}

module.exports = Gun;
