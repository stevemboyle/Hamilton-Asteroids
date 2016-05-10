var Ship = require("./ship");
var MovingObject = require("./movingObject");
var Util = require("./util");
var Bullet = require("./bullet");

function randomColor() {
  var hexDigits = "0123456789ABCDEF";

  var color = "#";
  for (var i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

var Ship = function (options) {
  options.radius = Ship.RADIUS;
  options.vel = options.vel || [0, 0];
  options.color = options.color || randomColor();

  MovingObject.call(this, options);
};

Ship.prototype.type = "Ship";

Ship.RADIUS = 50;

Util.inherits(Ship, MovingObject);


Ship.prototype.draw = function (ctx) {

  var hamiltonImage = new Image();
  hamiltonImage.src = "http://graphics8.nytimes.com/images/2015/08/18/arts/18artsbeat-grosses/18artsbeat-grosses-tmagArticle.jpg";

  // hamiltonImage.onload = function() {
  //
  //         ctx.drawImage(hamiltonImage, 0, 0);
  //
  //       };

  var pat = ctx.createPattern(hamiltonImage, "repeat");

  ctx.fillStyle = pat;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};


Ship.prototype.fireBullet = function () {
  var norm = Util.norm(this.vel);

  if (norm == 0) {
    // Can't fire unless moving.
    return;
  }

  var relVel = Util.scale(
    Util.dir(this.vel),
    Bullet.SPEED
  );

  var bulletVel = [
    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  ];

  var bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);
  var gunshot = new Audio('app/assets/music/gunshot.mp3');
  gunshot.play();

};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.type = "Ship";

module.exports = Ship;
