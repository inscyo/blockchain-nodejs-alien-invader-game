import SpriteSheet from "/game/js/adventure/spritesheet.js";
import { primaryWidth, primaryHeight } from "/game/js/adventure/render.js";

export const PowerPlanes = function (ctx, images, x, y) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.list = images;
  this.image = this.list[Math.floor(Math.random() * this.list.length)];
  this.planeWidth = this.image.width / 3.5;
  this.planeHeight = this.image.height / 3.5;
  this.path;
  this.x = x;
  this.y = y - this.planeHeight;
  this.trimx = 55;
  this.trimy = -30;
  this.trimWidth = 254;
  this.trimHeight = 271;
  this.speed = Math.floor(Math.random() * 5) + 3;

  this.draw = () => {
    this.sprite.drawObject(
      this.context,
      this.image,
      this.trimx,
      this.trimy,
      this.trimWidth,
      this.trimHeight,
      this.x,
      this.y,
      this.planeWidth,
      this.planeHeight
    );
  };

  this.attack = () => {
    this.y -= this.speed;
    return this.y + this.planeHeight <= 0 ? true : false;
  };

  this.hitsEnemy = (enemy) => {
    if (enemy != undefined) {
      var enemyx = enemy.x;
      var enemyy = enemy.y;
      var enemyw = enemy.vehiclew;
      var hitsy = this.y < enemyy;
      var hitsx =
        this.x <= enemyx + enemyw / 1.5 &&
        this.x + this.planeWidth / 2.5 >= enemyx;
      return hitsy && hitsx ? true : false;
    }
  };
};
