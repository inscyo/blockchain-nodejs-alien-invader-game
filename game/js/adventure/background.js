import SpriteSheet from "/game/js/adventure/spritesheet.js";

export class BackgroundObject {
  constructor(ctx, image, primaryWidth, primaryHeight) {
    this.context = ctx;
    this.sprite = new SpriteSheet();
    this.width = primaryWidth;
    this.height = primaryHeight;
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.suby = -this.height;
    this.speed = 1;
  }
  draw = () => {
    this.sprite.draw(
      this.context,
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.sprite.draw(
      this.context,
      this.image,
      this.x,
      this.suby,
      this.width,
      this.height
    );
  };

  scroll = () => {
    this.y = Math.trunc(this.y + this.speed);
    this.suby = Math.trunc(this.suby + this.speed);
    if (this.y >= this.height) this.y = -this.height;

    if (this.suby >= this.height) this.suby = -this.height;
  };
}

export class BackgroundObjects {
  constructor(ctx, images, primaryWidth, primaryHeight) {
    this.context = ctx;
    this.sprite = new SpriteSheet();
    this.width = primaryWidth;
    this.height = primaryHeight;
    this.list = images;
    this.image = this.list[Math.floor(Math.random() * this.list.length)];
    this.imageWidth = this.image.width / 2.2;
    this.imageHeight = this.image.height / 2;
    this.x = Math.random() * primaryWidth - 20;
    this.y = Math.random() * primaryHeight - this.imageHeight;
    this.speed = 1;
  }

  draw = () => {
    this.sprite.draw(
      this.context,
      this.image,
      this.x,
      this.y,
      this.imageWidth,
      this.imageHeight
    );
  };

  scroll = () => {
    this.y += this.speed;
    return this.y - this.imageHeight >= this.height ? true : false;
  };

  reset = () => {
    this.image = this.list[Math.floor(Math.random() * this.list.length)];
    this.imageWidth = this.image.width / 2.2;
    this.imageHeight = this.image.height / 2;
    this.x = this.x;
    this.y = -this.imageHeight * 10;
  };
}
