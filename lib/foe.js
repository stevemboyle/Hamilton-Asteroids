var Util = require("./util");
var MovingObject = require("./movingObject");
var Ship = require("./ship");

var DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 50,
	SPEED: 1
};



var Foe = function (options = {}) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
	options.radius = 50;
  // options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};


Foe.prototype.draw = function (ctx) {

  var jeffersonImage = new Image();



  jeffersonImage.src = "app/assets/images/jefferson";

	// jeffersonImage.src = "http://static.tumblr.com/6f56f6f9ac1c0e1b5c8645b113c68cf7/6hyorli/yV1o3y4eh/tumblr_static_90vcmda556gwc84k8488s8ssg.png";

	ctx.drawImage(jeffersonImage, this.pos[0], this.pos[1], 100, 100);

  // jeffersonImage.onload = function() {
  //
  //         ctx.drawImage(jeffersonImage, 0, 0);
  //
  //       };

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



Foe.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Ship") {
    // otherObject.relocate();

		// otherObject.remove();
		this.remove();
  }
};

Util.inherits(Foe, MovingObject);

Foe.prototype.type = "Foe";

module.exports = Foe;
