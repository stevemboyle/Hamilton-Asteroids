var Util = require("./util");
var MovingObject = require("./movingObject");
var Ship = require("./ship");

var DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 300,
	SPEED: 4
};

var Foe = function (options = {}) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
	options.radius = 10;
  // options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};


Foe.prototype.draw = function (ctx) {

  var jeffersonImage = new Image();
  jeffersonImage.src = "http://www.thenation.com/wp-content/uploads/2015/08/solomon_hamilton_otu.jpg";

  // jeffersonImage.onload = function() {
  //
  //         ctx.drawImage(jeffersonImage, 0, 0);
  //
  //       };

  var pat = ctx.createPattern(jeffersonImage, "repeat");

  ctx.fillStyle = pat;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};



Foe.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Ship") {
    // otherObject.relocate();
		this.remove();
  }
};

Util.inherits(Foe, MovingObject);

Foe.prototype.type = "Foe";

module.exports = Foe;
