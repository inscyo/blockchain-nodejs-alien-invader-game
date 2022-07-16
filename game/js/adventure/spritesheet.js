export default class SpriteSheet {
  constructor() {
    this.tiles = new Map();
  }

  define(name, image, x, y, width, height) {
    const buffer = document.createElement("canvas");
    buffer.width = width;
    buffer.height = height;
    const context = buffer.getContext("2d");
    context.drawImage(image, x, y, width, height);

    this.tiles.set(name, buffer);
  }

  drawInBuffer(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  draw(context, image, x, y, width, height) {
    context.drawImage(image, x, y, width, height);
  }

  drawObject(
    context,
    image,
    trimx,
    trimy,
    trimwith,
    trimheight,
    x,
    y,
    width,
    height
  ) {
    context.drawImage(
      image,
      trimx,
      trimy,
      trimwith,
      trimheight,
      x,
      y,
      width,
      height
    );
  }
}
