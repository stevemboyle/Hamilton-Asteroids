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



hamiltonImage.src = "http://40.media.tumblr.com/d4fc63fc73bdf4ee89899177b453b7d0/tumblr_nttbh4CiwE1qas9euo1_250.png";

  // hamiltonImage.src = "http://65.media.tumblr.com/52b7727a6930921a46f17f3d9e2ea3cb/tumblr_nzb5vc82j01rxkqbso1_500.png";

  // hamiltonImage.src = "https://67.media.tumblr.com/avatar_dc85f52b3bfd_128.png";

  ctx.drawImage(hamiltonImage, this.pos[0], this.pos[1], 150, 150);

  //
  // var ship = this;
  //
  // var hamiltonImage = new Image();
  //
  //   hamiltonImage.src = "https://67.media.tumblr.com/avatar_dc85f52b3bfd_128.png";
  // // hamiltonImage.src = "http://graphics8.nytimes.com/images/2015/08/18/arts/18artsbeat-grosses/18artsbeat-grosses-tmagArticle.jpg";
  //
  // hamiltonImage.onload = function() {
  //
  //     ctx.drawImage(hamiltonImage, ship.pos[0], ship.pos[1], ship.radius, ship.radius);
  //
  //       };
  //
  // // var pat = ctx.createPattern(hamiltonImage, "repeat");
  //
  // // ctx.fillStyle = pat;
  //
  //
  //
  // ctx.beginPath();
  // ctx.arc(
  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  // );
  //
  // // ctx.fill();
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


Ship.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Foe") {
    this.remove();
    var killmusic = new Audio('app/assets/music/killmusic.mp3');
    killmusic.play();
    // alert("Lose!");
    // otherObject.remove();
  }
};

Ship.prototype.type = "Ship";

module.exports = Ship;
