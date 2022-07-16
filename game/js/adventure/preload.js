import {
  context,
  primaryWidth,
  primaryHeight,
} from "/game/js/adventure/render.js";
import { paused } from "/game/js/adventure/buttons.js";
import { probability, strb64, multib64 } from "/game/js/adventure/function.js";
import { Ui, PauseUi } from "/game/js/adventure/ui.js";
import {
  BackgroundObject,
  BackgroundObjects,
} from "/game/js/adventure/background.js";
import {
  PlaneObject,
  PlaneBulletObject,
  driveFire,
} from "/game/js/adventure/plane.js";
import {
  EnemyVehicleSkyObject,
  EnemyVehicleLandObject,
} from "/game/js/adventure/enemy.js";
import { ExplosionObjects, CloudObjects } from "/game/js/adventure/object.js";
import { PeopleRescue, Boxes } from "/game/js/adventure/gain.js";
import { PowerPlanes } from "/game/js/adventure/power.js";

export var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
export var cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;
export var uiInstance;
export var pauseUiInstance;
export var backgroundObjectInstance;
export var backgroundObjectsInstance = [];
export var backgroundObjectsInstanceFunction;
export var cloudObjectInstance = [];
export var cloudObjectInstanceFunction;
export var planeObjectInstance;
export var planeBulletObjectInstance = [];
export var planeBulletObjectInstanceFunction;
export var enemyPlaneObjectInstance = [];
export var enemyPlaneObjectInstanceFunction;
export var enemyExplosionInstance;
export var enemyTankObjectInstance = [];
export var enemyTankObjectInstanceFunction;
export var enemyUfoSingleLineGroupObjectInstance = [];
export var enemyUfoSingleLineGroupObjectInstanceFunction;
export var peopleRescueInstance = [];
export var peopleRescueInstanceFunction;
export var boxesInstance = [];
export var boxesInstanceFunction;
export var powerPlanesObjectInstance = [];
export var powerPlanesObjectInstanceFunction;

var powerPlaneLastTime = new Date().getTime();
var powerPlaneSeconds = 0;
export var percentCompleted = 0;

export var resetInstancesArray = function () {
  backgroundObjectsInstance = [];
  cloudObjectInstance = [];
  planeBulletObjectInstance = [];
  enemyPlaneObjectInstance = [];
  enemyTankObjectInstance = [];
  enemyUfoSingleLineGroupObjectInstance = [];
  peopleRescueInstance = [];
  boxesInstance = [];
  powerPlanesObjectInstance = [];
};

export const adventurePreload = async function (metamask) {
  await axios
    .get("/api/gameui/adventure/" + metamask, {
      onDownloadProgress: (progressEvent) => {
        percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
    })
    .then(async (response) => {
      var playerInterfaceResponse = response.data;
      if (playerInterfaceResponse.status === "404") {
        alert(playerInterfaceResponse.message);
        return;
      }
      uiInstance = new Ui(
        context,
        primaryWidth,
        primaryHeight,
        await strb64(playerInterfaceResponse.unitylogo)
      );

      pauseUiInstance = new PauseUi(
        context,
        primaryWidth,
        primaryHeight,
        await playerInterfaceResponse.ui.pauseui,
        await playerInterfaceResponse.ui.buttons
      );

      backgroundObjectInstance = new BackgroundObject(
        context,
        await strb64(playerInterfaceResponse.location.background),
        primaryWidth,
        primaryHeight
      );

      cloudObjectInstanceFunction = await async function () {
        if (probability() > 0.3) {
          cloudObjectInstance.push(
            new CloudObjects(
              context,
              await multib64(playerInterfaceResponse.location.clouds)
            )
          );
        }
      };
      backgroundObjectsInstanceFunction = await async function () {
        backgroundObjectsInstance.push(
          new BackgroundObjects(
            context,
            await multib64(playerInterfaceResponse.location.objects),
            primaryWidth,
            primaryHeight
          )
        );
      };

      planeObjectInstance = new PlaneObject(
        context,
        await multib64(playerInterfaceResponse.player.plane),
        await strb64(playerInterfaceResponse.player.energy),
        await strb64(playerInterfaceResponse.player.people),
        await strb64(playerInterfaceResponse.player.bullet),
        primaryWidth,
        primaryHeight,
        playerInterfaceResponse.location.loc
      );

      planeBulletObjectInstanceFunction = await async function () {
        if (planeObjectInstance.mana > 0 && driveFire) {
          planeBulletObjectInstance.push(
            new PlaneBulletObject(
              context,
              await strb64(playerInterfaceResponse.player.bullet),
              planeObjectInstance.x,
              planeObjectInstance.y,
              primaryWidth,
              primaryHeight
            )
          );
          planeObjectInstance.mana -= 0.1;
        }
      };

      enemyPlaneObjectInstanceFunction = await async function () {
        enemyPlaneObjectInstance.push(
          new EnemyVehicleSkyObject(
            context,
            await multib64(playerInterfaceResponse.enemies.planes),
            Math.floor(Math.random() * primaryWidth),
            probability() > 0.6
              ? Math.floor(Math.random() * 6) + 1 * 2
              : Math.floor(Math.random() * 10) + 2.5
          )
        );
      };

      enemyExplosionInstance = new ExplosionObjects(
        context,
        await multib64(playerInterfaceResponse.explosion)
      );

      enemyTankObjectInstanceFunction = await async function () {
        if (probability() > 0.6) {
          enemyTankObjectInstance.push(
            new EnemyVehicleLandObject(
              context,
              await multib64(playerInterfaceResponse.enemies.tanks.vehicle),
              await strb64(playerInterfaceResponse.enemies.tanks.bullet)
            )
          );
        }
      };

      enemyUfoSingleLineGroupObjectInstanceFunction = await async function () {
        if (probability() > 0.5) {
          var i = 0;
          var speed = Math.floor(Math.random() * 10) + 5;
          while (i < Math.trunc(primaryWidth / 52)) {
            enemyUfoSingleLineGroupObjectInstance.push(
              new EnemyVehicleSkyObject(
                context,
                await multib64(playerInterfaceResponse.enemies.ufos),
                i * 49.5 + 25,
                speed,
                true
              )
            );
            i++;
          }
        }
      };

      peopleRescueInstanceFunction = await async function () {
        if (probability() > 0.9) {
          var img = await multib64(playerInterfaceResponse.gains.peoples);
          peopleRescueInstance.push(
            new PeopleRescue(context, [
              [img[0], img[1]],
              [img[2], img[3]],
              [img[4], img[5]],
            ])
          );
        }
      };

      boxesInstanceFunction = await async function () {
        if (probability() > 0.8) {
          var img = await multib64(playerInterfaceResponse.gains.boxes);
          boxesInstance.push(
            new Boxes(context, [
              [img[0], img[1]],
              [img[2], img[3]],
              [img[4], img[5]],
            ])
          );
        }
      };

      powerPlanesObjectInstanceFunction = await async function () {
        powerPlaneSeconds = 0;
        const count = await async function () {
          var currentTime = new Date().getTime();
          if (currentTime - powerPlaneLastTime >= 50 && !paused) {
            powerPlaneLastTime = currentTime;
            if (powerPlaneSeconds >= 200) {
              powerPlaneSeconds = 0;
              return;
            } else {
              powerPlanesObjectInstance.push(
                new PowerPlanes(
                  context,
                  await multib64(playerInterfaceResponse.gains.planes),
                  Math.random() * primaryWidth,
                  primaryHeight + 80
                )
              );
              powerPlaneSeconds++;
            }
          }
          requestAnimationFrame(count);
        };
        requestAnimationFrame(count);
      };
    });
};
