var world;
var canvasContext;
var canvasWidth;
var canvasHeight;

var poolTable = {
  height: 148, // cm, regulation
  width: 284, // cm, regulation
  ballDiameter: 5.715, // cm, regulation
  bumperThickness: 10
};

function step(cnt) {
  var timeStep = 1.0/60;
  var iteration = 1;
  world.Step(timeStep, iteration);
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
  drawWorld(world, canvasContext);
  setTimeout('step(' + (cnt || 0) + ')', 10);
}

$(window).load(function() {
  var canvasElm = $('#demo_canvas');
  if(canvasElm){

    canvasElm.attr('width', poolTable.width*2 + poolTable.bumperThickness*4);
    canvasElm.attr('height', poolTable.height*2 + poolTable.bumperThickness*4);

    world = createWorld();
    canvasContext = canvasElm[0].getContext('2d');

    canvasWidth = canvasElm.width();
    canvasHeight = canvasElm.height();

    canvasElm.click(function(e) {
      createBall(world, e.offsetX, e.offsetY, poolTable.ballDiameter * 2, new b2Vec2(400, 0));
    });

    step();
  }
});

var createBall = function(world, x, y, radius, initialVelocity) {
  var ballSd = new b2CircleDef();
  ballSd.density = 1.0;
  ballSd.radius = radius;
  ballSd.restitution = 1;

  var ballBd = new b2BodyDef();
  ballBd.AddShape(ballSd);
  ballBd.position.Set(x,y);
  if(initialVelocity){
    ballBd.linearVelocity = initialVelocity;
  }
  return world.CreateBody(ballBd);
};
