import SpriteSheet from "/game/js/adventure/spritesheet.js";
import { strb64 } from "/game/js/adventure/function.js";

export const Ui = function (ctx, primaryWidth, primaryHeight, unityimg) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.primaryWidth = primaryWidth;
  this.primaryHeight = primaryHeight;
  this.unityimg = unityimg;

  this.unityimage = () => {
    this.sprite.draw(
      this.context,
      this.unityimg,
      this.primaryWidth - 52,
      this.primaryHeight - 20,
      47,
      17
    );
  };
};

export const PauseUi = function (
  ctx,
  primaryWidth,
  primaryHeight,
  pauseui,
  buttons
) {
  this.context = ctx;
  this.sprite = new SpriteSheet();
  this.primaryWidth = primaryWidth;
  this.primaryHeight = primaryHeight;
  this.pausedWindow = strb64(pauseui.window);
  this.miniPausedBtn = strb64(buttons.minipause);
  this.continueButton = strb64(buttons.continue);
  this.exitButton = strb64(buttons.exitGame);
  this.buttonx = this.primaryWidth - 50;
  this.buttony = 10;
  this.continueBtnx = this.primaryWidth / 2 - 350 / 2 + 117;
  this.continueBtny = this.primaryWidth / 2 - 350 / 2 + 280;
  this.exitBtnx = this.continueBtnx + 180;
  this.exitBtny = this.continueBtny;

  this.button = () => {
    this.sprite.draw(
      this.context,
      this.miniPausedBtn,
      this.buttonx,
      this.buttony,
      40,
      40
    );
  };

  this.window = () => {
    this.context.fillStyle = "#11131b8f";
    this.context.fillRect(0, 0, this.primaryWidth, this.primaryHeight);
    this.sprite.draw(
      this.context,
      this.pausedWindow,
      this.primaryWidth / 2 - 350 / 2 + 10,
      this.primaryHeight / 2 - 180 / 2 - 100,
      350,
      180
    );
    this.sprite.draw(
      this.context,
      this.continueButton,
      this.continueBtnx,
      this.continueBtny,
      140,
      50
    );
  };
};
