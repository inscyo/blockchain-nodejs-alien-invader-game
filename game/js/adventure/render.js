import { loadImage } from "/game/js/adventure/loaders.js";
import {
  requestAnimationFrame,
  percentCompleted,
  uiInstance,
  pauseUiInstance,
  backgroundObjectInstance,
  backgroundObjectsInstance,
  backgroundObjectsInstanceFunction,
  cloudObjectInstance,
  cloudObjectInstanceFunction,
  planeObjectInstance,
  planeBulletObjectInstance,
  planeBulletObjectInstanceFunction,
  enemyPlaneObjectInstance,
  enemyPlaneObjectInstanceFunction,
  enemyExplosionInstance,
  enemyTankObjectInstance,
  enemyTankObjectInstanceFunction,
  enemyUfoSingleLineGroupObjectInstance,
  enemyUfoSingleLineGroupObjectInstanceFunction,
  peopleRescueInstance,
  peopleRescueInstanceFunction,
  boxesInstance,
  boxesInstanceFunction,
  powerPlanesObjectInstance,
} from "/game/js/adventure/preload.js";
import {
  driveUp,
  driveDown,
  driveLeft,
  driveRight,
} from "/game/js/adventure/plane.js";
import {
  startClicked,
  paused,
  gameButtons,
} from "/game/js/adventure/buttons.js";

const appdiv = document.getElementById("game-app");
export var webgl = document.getElementById("webgl");
export const context = webgl.getContext("2d");

export const primaryWidth = webgl.getBoundingClientRect().width;
export const primaryHeight = webgl.getBoundingClientRect().height;
webgl.width = primaryWidth;
webgl.height = primaryHeight;

export var playerLost = false;
var guiLoaded = false;
var planeBulletlastTime = new Date().getTime();
var enemyPlaneLastTime = new Date().getTime();
var enemyPlaneSingleLineGrouptLastTime = new Date().getTime();
var planeBulletSeconds = 0;
var enemyPlaneSeconds = 0;
var enemyPlaneSingleLineGroupSeconds = 0;
var cloudObjectLastTime = new Date().getTime();
var cloudObjectLastSeconds = 0;
var backgroundObjectsLastTime = new Date().getTime();
var backgroundObjectsLastSeconds = 0;
var gainObjectLastTime = new Date().getTime();
var gainObjectLastSeconds = 0;
var enemyTankLastTime = new Date().getTime();
var enemyTankSeconds = 0;

window.onload = async function () {
  var adventureMode = await loadImage("/img/game-logo.png");
  var startGameButton = await loadImage("/img/startGame.png");
  var canvasBackground = await loadImage("/img/game-background.png");
  gameButtons(webgl);
  const render = function (time) {
    var timeInSeconds = time * 0.001;
    var currentTime = new Date().getTime();
    context.clearRect(0, 0, webgl.width, webgl.height);

    if (startClicked && !guiLoaded) {
      context.strokeStyle = "#fff4db99";
      context.lineWidth = 3;
      context.strokeRect(
        primaryWidth / 4,
        primaryHeight / 2,
        (percentCompleted * primaryWidth) / 2 / 100,
        0.3,
        20,
        20
      );
      context.font = "20px luckiest-guy-regular";
      context.fillStyle = "#ffffffd4";
      context.textAlign = "center";
      context.fillText(
        percentCompleted + "%",
        primaryWidth / 2,
        primaryHeight / 2 + 40
      );
    } else {
      context.drawImage(canvasBackground, 0, 0, primaryWidth, primaryHeight);
      context.drawImage(
        adventureMode,
        primaryWidth / 2 - 400 / 2 - 33,
        primaryHeight / 2 - 220 / 2 - 120,
        470,
        190
      );
      context.drawImage(
        startGameButton,
        primaryWidth / 2 - 120 / 2,
        primaryHeight / 2,
        120,
        50
      );
    }

    if (percentCompleted >= 100) {
      guiLoaded =
        backgroundObjectsInstance.length >= 100
          ? true
          : (backgroundObjectsInstanceFunction instanceof Function
              ? backgroundObjectsInstanceFunction()
              : false,
            false);

      /* plane bullet */
      if (
        currentTime - planeBulletlastTime >= 70 &&
        !playerLost &&
        !paused &&
        guiLoaded
      ) {
        planeBulletlastTime = currentTime;
        planeBulletSeconds++;
        planeBulletObjectInstanceFunction();
      }

      if (
        currentTime - enemyPlaneSingleLineGrouptLastTime >= 2500 &&
        !playerLost &&
        !paused &&
        guiLoaded
      ) {
        enemyPlaneSingleLineGrouptLastTime = currentTime;
        enemyPlaneSingleLineGroupSeconds++;
        enemyUfoSingleLineGroupObjectInstanceFunction();
      }

      /* Enemy Tank */
      if (
        currentTime - enemyTankLastTime >= 700 &&
        !playerLost &&
        !paused &&
        guiLoaded
      ) {
        enemyTankLastTime = currentTime;
        enemyTankSeconds++;
        if (enemyPlaneObjectInstance.length < 15)
          enemyPlaneObjectInstanceFunction();
        enemyTankObjectInstanceFunction();
      }
      /* cloud */
      if (
        currentTime - cloudObjectLastTime >= 1000 &&
        !playerLost &&
        !paused &&
        guiLoaded
      ) {
        cloudObjectLastTime = currentTime;
        cloudObjectLastSeconds++;
        cloudObjectInstanceFunction();
      }

      /* gains object */
      if (
        currentTime - gainObjectLastTime >= 500 &&
        !playerLost &&
        !paused &&
        guiLoaded
      ) {
        gainObjectLastTime = currentTime;
        gainObjectLastSeconds++;
        peopleRescueInstanceFunction();
        boxesInstanceFunction();
      }

      /* Background and Objects */
      if (guiLoaded) {
        backgroundObjectInstance.draw();
        if (!paused) backgroundObjectInstance.scroll();
        for (var i = backgroundObjectsInstance.length; i--; ) {
          backgroundObjectsInstance[i].draw();
          if (!paused) {
            if (guiLoaded && backgroundObjectsInstance[i].scroll()) {
              backgroundObjectsInstance[i].reset();
            }
          }
        }

        /* Plane Drive here */
        if (!paused)
          planeObjectInstance.drive(driveUp, driveDown, driveLeft, driveRight);

        /* Tanks */
        for (var i = enemyTankObjectInstance.length; i--; ) {
          enemyTankObjectInstance[i].draw();
          enemyTankObjectInstance[i].bullet();
          if (!paused) {
            if (enemyTankObjectInstance[i].bulletfire(planeObjectInstance)) {
              planeObjectInstance.lives -= 0.8;
              enemyTankObjectInstance[i].reset();
            }

            if (enemyTankObjectInstance[i].drive()) {
              enemyTankObjectInstance.splice(i, 1);
            }
            for (var j = planeBulletObjectInstance.length; j--; ) {
              if (
                planeBulletObjectInstance[j].bulletHitsEnemyVehicle(
                  enemyTankObjectInstance[i]
                )
              ) {
                enemyExplosionInstance.draw(
                  timeInSeconds,
                  enemyTankObjectInstance[i].x,
                  enemyTankObjectInstance[i].y
                );
                planeBulletObjectInstance.splice(j, 1);
                enemyTankObjectInstance.splice(i, 1);
              }
            }

            if (planeObjectInstance.hitsEnemy(enemyTankObjectInstance[i])) {
              enemyExplosionInstance.draw(
                timeInSeconds,
                enemyTankObjectInstance[i].x,
                enemyTankObjectInstance[i].y
              );
              enemyTankObjectInstance.splice(i, 1);
            }
          }
        }

        /* Rescue */
        for (var i = peopleRescueInstance.length; i--; ) {
          peopleRescueInstance[i].draw(timeInSeconds);
          if (!paused) {
            if (peopleRescueInstance[i].scroll()) {
              peopleRescueInstance.splice(i, 1);
            }

            if (planeObjectInstance.peopleRescue(peopleRescueInstance[i])) {
              peopleRescueInstance.splice(i, 1);
            }
          }
        }

        /* Boxes */
        for (var i = boxesInstance.length; i--; ) {
          boxesInstance[i].draw(timeInSeconds);
          if (!paused) {
            if (boxesInstance[i].scroll()) {
              boxesInstance.splice(i, 1);
            }

            if (planeObjectInstance.boxes(boxesInstance[i])) {
              boxesInstance.splice(i, 1);
            }
          }
        }

        // /* Enemy here */
        for (var i = enemyPlaneObjectInstance.length; i--; ) {
          enemyPlaneObjectInstance[i].draw();
          if (!paused) {
            if (enemyPlaneObjectInstance[i].fly()) {
              if (!playerLost) enemyPlaneObjectInstance[i].reset();
            }

            for (var j = planeBulletObjectInstance.length; j--; ) {
              if (
                planeBulletObjectInstance[j].bulletHitsEnemyVehicle(
                  enemyPlaneObjectInstance[i]
                )
              ) {
                enemyExplosionInstance.draw(
                  timeInSeconds,
                  enemyPlaneObjectInstance[i].x,
                  enemyPlaneObjectInstance[i].y
                );
                planeBulletObjectInstance.splice(j, 1);
                enemyPlaneObjectInstance[i].reset();
              }
            }

            for (var j = powerPlanesObjectInstance.length; j--; ) {
              if (
                powerPlanesObjectInstance[j].hitsEnemy(
                  enemyPlaneObjectInstance[i]
                )
              ) {
                enemyExplosionInstance.draw(
                  timeInSeconds,
                  enemyPlaneObjectInstance[i].x,
                  enemyPlaneObjectInstance[i].y
                );
                enemyPlaneObjectInstance[i].reset();

                enemyExplosionInstance.draw(
                  timeInSeconds,
                  powerPlanesObjectInstance[j].x,
                  powerPlanesObjectInstance[j].y
                );
                powerPlanesObjectInstance.splice(j, 1);
              }
            }

            if (planeObjectInstance.hitsEnemy(enemyPlaneObjectInstance[i])) {
              enemyExplosionInstance.draw(
                timeInSeconds,
                enemyPlaneObjectInstance[i].x,
                enemyPlaneObjectInstance[i].y
              );
              enemyPlaneObjectInstance[i].reset();
            }
          }
        }
        /* Single Groupt Enemy here */
        for (var i = enemyUfoSingleLineGroupObjectInstance.length; i--; ) {
          enemyUfoSingleLineGroupObjectInstance[i].draw();
          if (!paused) {
            if (enemyUfoSingleLineGroupObjectInstance[i].fly()) {
              enemyUfoSingleLineGroupObjectInstance.splice(i, 1);
            }

            for (var j = planeBulletObjectInstance.length; j--; ) {
              if (
                planeBulletObjectInstance[j].bulletHitsEnemyVehicle(
                  enemyUfoSingleLineGroupObjectInstance[i]
                )
              ) {
                enemyExplosionInstance.draw(
                  timeInSeconds,
                  enemyUfoSingleLineGroupObjectInstance[i].x,
                  enemyUfoSingleLineGroupObjectInstance[i].y
                );
                planeBulletObjectInstance.splice(j, 1);
                enemyUfoSingleLineGroupObjectInstance.splice(i, 1);
              }
            }

            if (
              planeObjectInstance.hitsEnemy(
                enemyUfoSingleLineGroupObjectInstance[i]
              )
            ) {
              enemyExplosionInstance.draw(
                timeInSeconds,
                enemyUfoSingleLineGroupObjectInstance[i].x,
                enemyUfoSingleLineGroupObjectInstance[i].y
              );
              enemyUfoSingleLineGroupObjectInstance.splice(i, 1);
            }

            for (var j = powerPlanesObjectInstance.length; j--; ) {
              if (
                powerPlanesObjectInstance[j].hitsEnemy(
                  enemyUfoSingleLineGroupObjectInstance[i]
                )
              ) {
                enemyExplosionInstance.draw(
                  timeInSeconds,
                  enemyUfoSingleLineGroupObjectInstance[i].x,
                  enemyUfoSingleLineGroupObjectInstance[i].y
                );

                enemyUfoSingleLineGroupObjectInstance.splice(i, 1);

                enemyExplosionInstance.draw(
                  timeInSeconds,
                  powerPlanesObjectInstance[j].x,
                  powerPlanesObjectInstance[j].y
                );
                powerPlanesObjectInstance.splice(j, 1);
              }
            }
          }
        }

        /* Plane bullet */
        for (var i = planeBulletObjectInstance.length; i--; ) {
          planeBulletObjectInstance[i].draw();
          if (planeBulletObjectInstance[i].animate()) {
            planeBulletObjectInstance.splice(i, 1);
          }
        }

        playerLost = planeObjectInstance.stats();
        /* Cloud Object here */
        for (var i = cloudObjectInstance.length; i--; ) {
          cloudObjectInstance[i].draw();
          if (!paused) cloudObjectInstance[i].animate();
        }
        for (var i = powerPlanesObjectInstance.length; i--; ) {
          powerPlanesObjectInstance[i].draw();
          if (!paused) {
            if (powerPlanesObjectInstance[i].attack()) {
              powerPlanesObjectInstance.splice(i, 1);
            }
          }
        }
        if (playerLost) alert("gameover :("), window.location.reload();
      }

      if (guiLoaded) {
        if (!playerLost) planeObjectInstance.draw(timeInSeconds);
        // pauseUiInstance.button();
        // if (paused) pauseUiInstance.window();
        uiInstance.unityimage();
      }
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
window.onerror = function (e) {
  alert("user not login please check network connection or clear cache.");
};
