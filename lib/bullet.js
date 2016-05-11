var Util = require("./util");
var MovingObject = require("./movingObject");
var Foe = require("./foe");

var Bullet = function (options) {
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
};

Bullet.RADIUS = 50;
Bullet.SPEED = 15;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Foe") {
    this.remove();
    otherObject.remove();
  }
};

Bullet.prototype.isWrappable = false;
Bullet.prototype.type = "Bullet";


Bullet.prototype.draw = function (ctx) {

  var bulletImage = new Image();

  bulletImage.src = "http://gunsofold.com/images/fd1084l.gif";

  ctx.drawImage(bulletImage, this.pos[0], this.pos[1], 50, 50);

  //
  // var jeffersonImage = new Image();
  // jeffersonImage.src = "http://www.thenation.com/wp-content/uploads/2015/08/solomon_hamilton_otu.jpg";
  //
  // // jeffersonImage.onload = function() {
  // //
  // //         ctx.drawImage(jeffersonImage, 0, 0);
  // //
  // //       };
  //
  // var pat = ctx.createPattern(jeffersonImage, "repeat");
  //
  // ctx.fillStyle = pat;
  //
  // ctx.beginPath();
  // ctx.arc(
  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  // );
  // ctx.fill();
};


module.exports = Bullet;
