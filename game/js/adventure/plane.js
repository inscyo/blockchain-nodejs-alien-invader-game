import SpriteSheet from "/game/js/adventure/spritesheet.js";
import { powerPlanesObjectInstanceFunction } from "/game/js/adventure/preload.js";

export const PlaneObject = function (
  ctx,
  images,
  energy,
  people,
  bulletimage,
  primaryWidth,
  primaryHeight,
  location
) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.width = primaryWidth;
  this.height = primaryWidth;
  this.images = images;
  this.bulletImage = bulletimage;
  this.planeWidth = 85;
  this.planeHeight = 65;
  this.path;
  this.x = this.width / 2 - 15;
  this.y = primaryHeight - this.planeHeight - 30;
  this.trimx = 55;
  this.trimy = -30;
  this.trimWidth = 254;
  this.trimHeight = 271;
  this.lives = 15;
  this.mana = 15;
  this.energyicon = energy;
  this.peopleicon = people;
  this.rescued = 0;
  this.location = location;

  this.draw = (frameCount) => {
    var image = this.images[Math.floor((frameCount * 20) % this.images.length)];
    if (image !== undefined) {
      this.planeWidth = image.width / 3;
      this.planeHeight = image.height / 3;
      this.sprite.drawObject(
        this.context,
        image,
        this.trimx,
        this.trimy,
        this.trimWidth,
        this.trimHeight,
        this.x,
        this.y,
        this.planeWidth,
        this.planeHeight
      );
    }
  };

  this.stats = () => {
    this.sprite.draw(this.context, this.energyicon, 15, 10, 20, 27);
    this.context.font = "20px luckiest-guy-regular";
    this.context.fillStyle = this.location == "01" ? "#fff" : "#333";
    this.context.textAlign = "center";
    this.context.fillText(Math.round(this.lives), 55, 30);

    this.sprite.draw(this.context, this.bulletImage, -15, 25, 82, 79);
    this.context.fillText(Math.round(this.mana), 55, 67);

    this.sprite.draw(this.context, this.peopleicon, -3, 70, 60, 60);
    this.context.fillText(this.rescued, 55, 107);
    return this.lives <= 0 ? ((this.y = this.y * 2), true) : false;
  };

  this.drive = (up, down, left, right) => {
    if (left) {
      this.x += this.x - 5 <= 0 ? 1 : -5;
    }
    if (right) {
      this.x += this.x + this.planeWidth / 2 + 10 >= primaryWidth ? -1 : 5;
    }
  };

  this.hitsEnemy = (enemy) => {
    if (enemy != undefined) {
      var enemyx = enemy.x;
      var enemyy = enemy.y;
      var enemyw = enemy.vehiclew;
      var enemyh = enemy.vehicleh;
      var hitsy =
        this.y - this.planeHeight / 3.5 < enemyy && this.y > enemyy - enemyh;
      var hitsx =
        this.x <= enemyx + enemyw / 1.5 && this.x >= enemyx - enemyw / 1.8;
      if (hitsy && hitsx) {
        this.lives -= 0.8;
        return true;
      }
      return false;
    }
  };

  this.peopleRescue = (people) => {
    if (people != undefined) {
      var x = people.x;
      var y = people.y;
      var h = people.peopleHeight;
      var hitsy = this.y < y - 20 && this.y > y - h;
      var hitsx = this.x <= x + 18 && this.x + this.planeWidth / 2.5 + 5 >= x;
      return hitsy && hitsx ? ((this.rescued += 1), true) : false;
    }
  };

  this.boxes = (boxes) => {
    if (boxes != undefined) {
      var x = boxes.x;
      var y = boxes.y;
      var h = boxes.boxHeight;
      var hitsy = this.y < y - 20 && this.y > y - h + 35;
      var hitsx = this.x <= x + 18 && this.x + this.planeWidth / 2.5 + 5 >= x;
      if (hitsy && hitsx) {
        switch (boxes.gainObject) {
          case 0:
            powerPlanesObjectInstanceFunction();
            break;
          case 1:
            if (this.mana < 15) this.mana += 1;
            break;
          case 2:
            if (this.lives <= 15) this.lives += 1;
            break;
        }
        return true;
      }
      return false;
    }
  };
};

export const PlaneBulletObject = function (
  ctx,
  image,
  planex,
  planey,
  primaryWidth,
  primaryHeight
) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.width = primaryWidth;
  this.height = primaryHeight;
  this.bulletImage = image;
  this.bulletPath;
  this.bulletWidth = 70;
  this.bulletHeight = 60;
  this.bulletx = planex;
  this.bullety = planey - 25;
  this.defaultBullety;
  this.speed = 25;
  this.trimx = 8.5;
  this.trimy = -50;
  this.trimWidth = 100;
  this.trimHeight = 100;

  this.draw = () => {
    this.sprite.drawObject(
      this.context,
      this.bulletImage,
      this.trimx,
      this.trimy,
      this.trimWidth,
      this.trimHeight,
      this.bulletx - 1,
      this.bullety,
      this.bulletWidth,
      this.bulletHeight
    );
  };

  this.animate = () => {
    this.bullety = this.bullety - this.speed;
    if (this.bullety + this.bulletHeight <= 0) return true;
  };

  this.bulletHitsEnemyVehicle = (enemy) => {
    if (enemy != undefined) {
      var x = enemy.x;
      var y = enemy.y;
      var width = enemy.vehiclew;
      var height = enemy.vehicleh;
      var hitsy =
        this.bullety < y - height + 12 && this.bulletx <= x + width / 2;
      var hitsx =
        this.bulletx <= x + width / 2 &&
        this.bulletx + this.bulletWidth / 4.1 >= x;
      return hitsy && hitsx ? true : false;
    }
  };
};

export var driveUp = false;
export var driveDown = false;
export var driveLeft = false;
export var driveRight = false;
export var driveFire = false;

document.onkeydown = function (keyPress) {
  if (keyPress.key == "ArrowUp" || keyPress.code == "keyW") driveUp = true;
  if (keyPress.key == "ArrowDown" || keyPress.kcodeey == "keyS")
    driveDown = true;
  if (keyPress.key == "ArrowLeft" || keyPress.code == "keyA") driveLeft = true;
  if (keyPress.key == "ArrowRight" || keyPress.code == "keyD")
    driveRight = true;
  if (keyPress.code == "Space") driveFire = true;
};

document.onkeyup = function (keyPress) {
  if (keyPress.key == "ArrowUp" || keyPress.code == "keyW") driveUp = false;
  if (keyPress.key == "ArrowDown" || keyPress.code == "keyS") driveDown = false;
  if (keyPress.key == "ArrowLeft" || keyPress.code == "keyA") driveLeft = false;
  if (keyPress.key == "ArrowRight" || keyPress.kcodeey == "keyD")
    driveRight = false;
  if (keyPress.code == "Space") driveFire = false;
};
