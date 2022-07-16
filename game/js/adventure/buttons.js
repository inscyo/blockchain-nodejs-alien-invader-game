import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
import { getMousePos } from "/game/js/adventure/function.js";
import { adventurePreload } from "/game/js/adventure/preload.js";
import { primaryWidth, primaryHeight } from "/game/js/adventure/render.js";
import { pauseUiInstance } from "/game/js/adventure/preload.js";
export var startClicked = false;
export var paused = false;

export const gameButtons = function (webgl) {
  webgl.addEventListener("click", async (e) => {
    var [mousex, mousey] = getMousePos(webgl, e);
    if (
      mousex >= primaryWidth / 2 - 150 / 2 &&
      mousex <= primaryWidth / 2 - 150 / 2 + 160 &&
      mousey >= primaryHeight / 2 + 10 * 2 &&
      mousey <= primaryHeight / 2 + 10 * 2 + 65 &&
      !startClicked
    ) {
      startClicked = true;
      adventurePreload("0x55D6F299F383F7ee7206Fa81a76e0129980b3Db3");
    }
    if (pauseUiInstance !== undefined) {
      if (
        mousex >= pauseUiInstance.buttonx &&
        mousex <= pauseUiInstance.buttonx + 40 &&
        mousey >= pauseUiInstance.buttony &&
        mousey <= pauseUiInstance.buttony + 35 &&
        !paused
      ) {
        paused = true;
      }
      if (
        mousex >= pauseUiInstance.continueBtnx &&
        mousex <= pauseUiInstance.continueBtnx + 140 &&
        mousey >= pauseUiInstance.continueBtny &&
        mousey <= pauseUiInstance.continueBtny + 50 &&
        paused
      ) {
        paused = false;
      }
    }
  });
};
