import SpriteSheet from "/game/js/adventure/spritesheet.js";
import {
  context,
  primaryWidth,
  primaryHeight,
} from "/game/js/adventure/render.js";

export const PeopleRescue = function (context, images) {
  this.context = context;
  this.sprite = new SpriteSheet();
  this.images = images;
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.peopleWidth = 85;
  this.peopleHeight = 65;
  this.path;
  this.trimx = 35;
  this.trimy = 30;
  this.trimWidth = 254;
  this.trimHeight = 271;
  this.x = Math.random() * primaryWidth;
  this.y = -this.peopleHeight;
  this.speed = 1;
  this.peopleObject = Math.floor(Math.random() * this.images.length);
  this.people = this.images[Math.floor(Math.random() * this.images.length)];

  this.draw = (frameCount, x, y) => {
    var image = this.people[Math.floor((frameCount * 2) % this.people.length)];
    if (image !== undefined) {
      this.peopleWidth = image.width / 1.9;
      this.peopleHeight = image.height / 1.8;
      this.sprite.drawObject(
        this.context,
        image,
        this.trimx,
        this.trimy,
        this.trimWidth,
        this.trimHeight,
        this.x,
        this.y,
        this.peopleWidth,
        this.peopleHeight
      );
    }
  };

  this.scroll = () => {
    this.y += this.speed;
    return this.y >= this.height ? true : false;
  };
};

export const Boxes = function (ctx, images) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.images = images;
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.boxWidth = 85;
  this.boxHeight = 65;
  this.path;
  this.trimx = 35;
  this.trimy = 30;
  this.trimWidth = 254;
  this.trimHeight = 271;
  this.x = Math.random() * primaryWidth;
  this.y = -this.boxHeight;
  this.speed = 1;
  this.gainObject = Math.floor(Math.random() * images.length);
  this.box = images[this.gainObject];

  this.draw = (frameCount) => {
    var image = this.box[Math.floor((frameCount * 2) % this.box.length)];
    if (image !== undefined) {
      this.boxWidth = image.width / 1.9;
      this.boxHeight = image.height / 1.5;
      this.sprite.drawObject(
        this.context,
        image,
        this.trimx,
        this.trimy,
        this.trimWidth,
        this.trimHeight,
        this.x,
        this.y,
        this.boxWidth,
        this.boxHeight
      );
    }
  };

  this.scroll = () => {
    this.y += this.speed;
    return this.y >= this.height ? true : false;
  };
};
