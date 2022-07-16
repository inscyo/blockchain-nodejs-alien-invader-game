const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const app = express();
const fnc = require("./js/function");
const useragent = require("express-useragent");

app.use(useragent.express());
app.use(express.static("./"));
app.use("/css", express.static(__dirname + "/css/"));
app.use("/font", express.static(__dirname + "/font/"));
app.use("/js", express.static(__dirname + "/js/"));
app.use("/game/js", express.static(__dirname + "/game/js/"));
app.use("/gui", express.static(__dirname + "/gui/"));
app.use("/img", express.static(__dirname + "/img/"));
app.use("/template", express.static(__dirname + "/template/"));

app.set("views", "./");
app.set("view engine", "ejs");
const menuLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Game Modes",
    href: "",
  },
  {
    name: "Tokenomics",
    href: "",
  },
  {
    name: "Whitepaper",
    href: "",
  },
];

app.get("/", function (req, res) {
  res.render("game/game", { tab: "game", menu: menuLinks });
});

app.get("/api/gameui/adventure/:metamask_address", async (req, res) => {
  var obj = {};
  var background = "02";
  var object = "02";
  var plane = "01";
  var bullet = "04";

  obj.unitylogo = await fnc.singleImage(`/gui/userinterface/other/unity.png`);

  await fnc
    .multipleImage(`/gui/backgrounds/obj/${object}`)
    .then(async (objects) => {
      await fnc
        .multipleImage(`/gui/userinterface/cloud/`)
        .then(async (clouds) => {
          obj.location = {
            background: await fnc.singleImage(
              `/gui/backgrounds/bg/${background}.png`
            ),
            objects: objects,
            clouds: clouds,
            loc: background,
          };
        });
    });

  await fnc
    .multipleImage(`/gui/players/copters/${plane}`)
    .then(async (plane) => {
      obj.player = {
        plane: plane,
        bullet: await fnc.singleImage(`/gui/bullets/${bullet}.png`),
        energy: await fnc.singleImage(`/gui/players/bars/energy.png`),
        people: await fnc.singleImage(`/gui/players/bars/people.png`),
        rescued: await fnc.singleImage(`/gui/userinterface/other/4.png`),
      };
    });

  await fnc.multipleImage(`/gui/enemies/planes/`).then(async (planes) => {
    await fnc.multipleImage(`/gui/enemies/tanks/`).then(async (tanks) => {
      await fnc.multipleImage(`/gui/enemies/ufos/`).then(async (ufos) => {
        obj.enemies = {
          planes: planes,
          tanks: {
            vehicle: tanks,
            bullet: await fnc.singleImage(`/gui/bullets/08.png`),
          },
          ufos: ufos,
        };
      });
    });
  });
  await fnc
    .multipleImage(`/gui/userinterface/explosion/`)
    .then((res) => (obj.explosion = res));
  await fnc.multipleImage(`/gui/gains/peoples/`).then(async (people) => {
    await fnc.multipleImage(`/gui/gains/boxes/`).then(async (box) => {
      await fnc.multipleImage(`/gui/powers/planes/`).then((powerplane) => {
        obj.gains = {
          peoples: people,
          boxes: box,
          planes: powerplane,
        };
      });
    });
  });

  obj.ui = {
    buttons: {
      exit: await fnc.singleImage(`/gui/userinterface/buttons/exitBtn.png`),
      exitGame: await fnc.singleImage(
        `/gui/userinterface/buttons/exitGameBtn.png`
      ),
      continue: await fnc.singleImage(
        `/gui/userinterface/buttons/continueBtn.png`
      ),
      miniExit: await fnc.singleImage(
        `/gui/userinterface/buttons/miniExitBtn.png`
      ),
      minipause: await fnc.singleImage(
        `/gui/userinterface/buttons/miniPausedBtn.png`
      ),
    },
    pauseui: {
      window: await fnc.singleImage(`/gui/userinterface/pause/window.png`),
    },
  };
  res.json(obj);
});

const ssl = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "certificate", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certificate", "cert.pem")),
  },
  app
);

ssl.listen(3000, () => console.log("listening on port 3000"));
