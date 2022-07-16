import SpriteSheet from "/game/js/adventure/spritesheet.js";
import { primaryWidth } from "/game/js/adventure/render.js";

export const ExplosionObjects = function (ctx, images) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.images = images;
  this.expolsionWidth = 85;
  this.explosionHeight = 65;
  this.path;
  this.trimx = -10;
  this.trimy = -30;
  this.trimWidth = 254;
  this.trimHeight = 271;
  this.x = 0;
  this.y = 0;
  this.previousx = null;
  this.previousy = null;

  this.draw = (frameCount, x, y) => {
    this.previousx = x;
    this.previousy = y;
    this.sprite.drawObject(
      this.context,
      this.images[Math.floor((frameCount * 10) % this.images.length)],
      this.trimx,
      this.trimy,
      this.trimWidth,
      this.trimHeight,
      this.previousx != null ? this.previousx : x,
      this.previousy != null ? this.previousy : y,
      this.expolsionWidth,
      this.explosionHeight
    );
  };
};

export const CloudObjects = function (ctx, images) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.image = images[Math.floor(Math.random() * images.length)];
  this.cloudWidth = 85;
  this.cloudHeight = 65;
  this.path;
  this.x = Math.random() * primaryWidth;
  this.y = -this.cloudHeight;

  this.draw = () => {
    this.sprite.draw(
      this.context,
      this.image,
      this.x,
      this.y,
      this.cloudWidth,
      this.cloudHeight
    );
  };

  this.animate = () => {
    this.y += 2;
  };
};
