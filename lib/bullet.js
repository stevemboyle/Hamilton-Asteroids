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

module.exports = Bullet;
