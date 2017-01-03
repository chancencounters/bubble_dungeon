class Turret {
  constructor (){
    this.gun = this.createGun();
    this.handleRotation = this.handleRotation.bind(this);
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", this.handleRotation);
    document.addEventListener("keypress", this.handleShoot);
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

  shoot() {
    this.currentBubble.move(this.gun.rotation);
  }

  createGun(){
    const img = new Image();
    img.src = "./assets/images/gun.png";
    const gun = new createjs.Bitmap(img);

    const gunContainer = new createjs.Container();
    gunContainer.x = 205;
    gunContainer.y = 372;
    gun.regX = 16;
    gun.regY = 51;
    gun.x = 0;
    gun.y = 0;
    gunContainer.addChild(gun);
    return gunContainer;
  }
}

module.exports = Turret;
