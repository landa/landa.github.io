var maxDepth = 10;

function Tree(origin, trunkHeight, trunkWidth, reduction, angle, angleRange) {
  this.origin = origin;
  this.trunkHeight = trunkHeight ? trunkHeight : 200;
  this.trunkWidth = trunkWidth ? trunkWidth : 5;
  this.reduction = reduction ? reduction : 0.7;
  this.angle = angle ? angle : PI/6.0;
  this.angleRange = angleRange ? angleRange : PI/10.0;

  this.drawBranch = function(ht, wt, depth) {
    if (!depth) {
      depth = 0;
    }
    if (ht < 2 || depth > maxDepth) {
      noStroke();
      fill(169, 54, 175);
      ellipse(0, 0, 5);
      return;
    }

    var dWt = max(wt, 1);
    var dHt = ht + map(noise(ht), 0, 1, 1, 3);

    noStroke();
    fill(255);
    rect(ceil(-dWt/2), 0, dWt, dHt);
    push();
    translate(0, dHt);
    push();
    rotate(this.angle + map(random(), 0, 1, -angleRange, angleRange));
    this.drawBranch(dHt*this.reduction, wt - 1, depth + 1);
    pop();
    push();
    rotate(-this.angle + map(random(), 0, 1, -angleRange, angleRange));
    this.drawBranch(dHt*this.reduction, wt - 1, depth + 1);
    pop();
    pop();
  }

  this.draw = function() {
    push();
    translate(this.origin.x, this.origin.y);
    rotate(PI);
    this.drawBranch(this.trunkHeight, this.trunkWidth);
    pop();
  }
}

var tree;
var trunkHeightSlider;
var trunkWidthSlider;
var lengthReductionSlider;
var angleSlider;
var angleRangeSlider;
var maxDepthSlider;

function setup() {
  frameRate(1);
  var config = createDiv('Configuration');

  var heightP = createP('Trunk Height:');
  config.child(heightP);
  trunkHeightSlider = createSlider(10, 200, 200);
  config.child(trunkHeightSlider);

  var widthP = createP('Trunk Thickness:');
  config.child(widthP);
  trunkWidthSlider = createSlider(1, 20, 10);
  config.child(trunkWidthSlider);

  var lengthReductionP = createP('Length Reduction:');
  config.child(lengthReductionP);
  lengthReductionSlider = createSlider(0.1, 0.9, 0.7, 0.1);
  config.child(lengthReductionSlider);

  var angleP = createP('Angle:');
  config.child(angleP);
  angleSlider = createSlider(PI/20.0, PI/3.0, PI/6.0, 0.01);
  config.child(angleSlider);

  var angleRangeP = createP('Angle Randomness:');
  config.child(angleRangeP);
  angleRangeSlider = createSlider(0, PI/6.0, PI/10.0, 0.01);
  config.child(angleRangeSlider);

  var maxDepthP = createP('Max Depth:');
  config.child(maxDepthP);
  maxDepthSlider = createSlider(0, 12, 10);
  config.child(maxDepthSlider);

  config.addClass('config');
  config.position(0, 0);
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(51);
  maxDepth = maxDepthSlider.value();
  tree = new Tree(createVector(width/2, height),
                  trunkHeightSlider.value(),
                  trunkWidthSlider.value(),
                  lengthReductionSlider.value(),
                  angleSlider.value(),
                  angleRangeSlider.value());
  tree.draw();
}
