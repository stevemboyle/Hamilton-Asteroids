var Foe = require("./foe");
var Bullet = require("./bullet");
var Ship = require("./ship");

var Game = function () {
  this.foes = [];
  this.bullets = [];
  this.ships = [];

  this.addFoes();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_FOES = 2;

Game.prototype.add = function (object) {
  if (object.type === "Foe") {
    this.foes.push(object);
  } else if (object.type === "Bullet") {
    this.bullets.push(object);
  } else if (object.type === "Ship") {
    this.ships.push(object);
  } else {
    throw "wtf?";
  }
};

Game.prototype.addFoes = function () {
  for (var i = 0; i < Game.NUM_FOES; i++) {
    this.add(new Foe({ game: this }));
  }
};

Game.prototype.addShip = function () {
  var ship = new Ship({
    // pos: this.randomPosition(),
    pos: [500, 300],
    game: this
  });

  this.add(ship);

  return ship;
};

Game.prototype.allObjects = function () {
  return [].concat(this.ships, this.foes, this.bullets);
};

Game.prototype.checkCollisions = function () {
  var game = this;

  this.allObjects().forEach(function (obj1) {
    game.allObjects().forEach(function (obj2) {
      if (obj1 == obj2) {
        // don't allow self-collision
        return;
      }

      if (obj1.isCollidedWith(obj2)) {
        // alert("collllllllision");
        obj1.collideWith(obj2);
      }
    });
  });
};

Game.prototype.draw = function (ctx) {

  var backgroundImage = new Image();
  backgroundImage.src = "http://65.media.tumblr.com/e03203fc03fce5f5166c6cc7a1c4212c/tumblr_nvlja3oXTM1un1x6fo1_1280.jpg";

  var pat = ctx.createPattern(backgroundImage, "repeat");


  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = pat;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

// TODO: Change Out of Bounds to create bounces

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

Game.prototype.moveObjects = function (delta) {
  this.allObjects().forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.randomPosition = function () {
  return [
    Game.DIM_X * Math.random(),
    Game.DIM_Y * Math.random()
  ];
};

Game.prototype.remove = function (object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Foe) {
    var idx = this.foes.indexOf(object);
    this.foes[idx] = new Foe({ game: this });
  } else if (object instanceof Ship) {
    this.ships.splice(this.ships.indexOf(object), 1);
  } else {
    throw "wtf?";
  }
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.wrap = function (pos) {
  return [
    wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
  ];

  function wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Game;
