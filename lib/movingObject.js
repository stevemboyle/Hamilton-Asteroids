var Util = require("./util");

var MovingObject = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.collideWith = function (otherObject) {
  ; // default do nothing
};
//
MovingObject.prototype.draw = function (ctx) {

  var jeffersonImage = new Image();
  jeffersonImage.src = "app/assets/images/daveed.png";

  // jeffersonImage.src = "http://static.tumblr.com/6f56f6f9ac1c0e1b5c8645b113c68cf7/6hyorli/yV1o3y4eh/tumblr_static_90vcmda556gwc84k8488s8ssg.png";

	ctx.drawImage(jeffersonImage, this.pos[0], this.pos[1], 100, 100);

  // var greenImage = new Image();
  // greenImage.src = "http://juliannehough.com/wp-content/uploads/2016/02/jules-green-eyes.jpg";
  //
  // // greenImage.onload = function() {
  // //
  // //         ctx.drawImage(greenImage, 0, 0);
  // //
  // //       };
  //
  // var pat = ctx.createPattern(greenImage, "repeat");
  //
  // ctx.fillStyle = pat;
  //
  // ctx.beginPath();
  // ctx.arc(
  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  // );
  // ctx.fill();
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.isWrappable = true;

var NORMAL_FRAME_TIME_DELTA = 1000/60;
MovingObject.prototype.move = function (timeDelta) {
  //timeDelta is number of milliseconds since last move
  //if the computer is busy the time delta will be larger
  //in this case the MovingObject should move farther in this frame
  //velocity of object is how far it should move in 1/60th of a second
  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};

MovingObject.prototype.remove = function () {
  this.game.remove(this);
};

module.exports = MovingObject;
