import SpriteSheet from "/game/js/adventure/spritesheet.js";
import { probability } from "/game/js/adventure/function.js";
import { primaryWidth, primaryHeight } from "/game/js/adventure/render.js";

export const EnemyVehicleSkyObject = function (
  ctx,
  images,
  x,
  speed,
  type = false
) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.list = images;
  this.image = this.list[Math.floor(Math.random() * this.list.length)];
  this.vehiclew = this.image.width / 3.6;
  this.vehicleh = this.image.height / 3.5;
  this.x = x;
  this.y = -this.vehicleh;
  this.speed = speed;
  this.trimx = 58;
  this.trimy = 30;
  this.trimWidth = 224;
  this.trimHeight = 271;
  this.gravity = 0.1;
  this.gravitySpeed = 0;
  this.yspeed = 0;
  this.type = type;

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
      this.vehiclew,
      this.vehicleh
    );
  };

  this.fly = () => {
    this.y += this.speed;
    return this.y >= this.height + this.vehicleh * 2 ? true : false;
  };

  this.reset = () => {
    this.image = this.list[Math.floor(Math.random() * this.list.length)];
    this.x = Math.floor(Math.random() * primaryWidth);
    this.y = -this.vehicleh;
    this.speed = this.type
      ? 5
      : probability() > 0.2
      ? Math.floor(Math.random() * 6) + 1 * 2
      : Math.floor(Math.random() * 10) + 2.5;
  };
};

export const EnemyVehicleLandObject = function (ctx, images, bulletimage) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.list = images;
  this.image = this.list[Math.floor(Math.random() * this.list.length)];
  this.vehiclew = this.image.width / 4.5;
  this.vehicleh = this.image.height / 3.5;
  this.x = Math.floor(Math.random() * primaryWidth);
  this.y = -this.vehicleh * 2;
  this.speed = 1;
  this.trimx = 58;
  this.trimy = 30;
  this.trimWidth = 224;
  this.trimHeight = 271;
  this.gravity = 0.1;
  this.gravitySpeed = 0;
  this.yspeed = 0;
  this.bulletimage = bulletimage;
  this.bullettrimx = 8.5;
  this.bullettrimy = -50;
  this.bullettrimWidth = 100;
  this.bullettrimHeight = 100;
  this.bulletWidth = 70;
  this.bulletHeight = 60;
  this.bulletx = this.x;
  this.bullety = this.y - 35;
  this.bulletspeed = this.speed * 2;

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
      this.vehiclew,
      this.vehicleh
    );
  };

  this.drive = () => {
    this.y += this.speed;
    this.bullety += this.speed;
    return this.y >= this.height ? true : false;
  };

  this.bullet = () => {
    this.sprite.drawObject(
      this.context,
      this.bulletimage,
      this.bullettrimx,
      this.bullettrimy,
      this.bullettrimWidth,
      this.bullettrimHeight,
      this.bulletx - 2,
      this.bullety + 5,
      this.bulletWidth,
      this.bulletHeight
    );
  };

  this.bulletfire = (planeObjectInstance) => {
    this.bullety += this.bulletspeed;
    if (this.bullety > this.height + this.bulletHeight) {
      this.reset();
    }
    var x = planeObjectInstance.x;
    var y = planeObjectInstance.y;
    var width = planeObjectInstance.planeWidth;
    var height = planeObjectInstance.planeHeight;
    var hitsy =
      this.bullety > y - height + 40 &&
      this.bullety < y + this.bulletHeight / 2;
    var hitsx =
      this.bulletx <= x + width / 3 &&
      this.bulletx + this.bulletWidth / 2.2 >= x;
    return hitsy && hitsx ? true : false;
  };

  this.reset = () => {
    this.bulletx = this.x;
    this.bullety = this.y - 35;
  };
};
