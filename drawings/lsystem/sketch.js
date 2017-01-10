var lsystem;
var select;

function LSystem(axiom, productions, len, angle, maxDepth, x, y) {
  this.axiom = axiom;
  this.productions = productions;
  this.len = len;
  this.angle = angle;
  this.maxDepth = maxDepth;
  this.x = x;
  this.y = y;
  this.string = axiom;
  this.depth = 0;

  this.step = function() {
    if (this.depth >= this.maxDepth) {
      return;
    }
    var result = '';
    for (var ii = 0; ii < this.string.length; ++ii) {
      var cur = this.string.charAt(ii);
      if (cur in this.productions) {
        result += this.productions[cur];
      } else {
        result += cur;
      }
    }
    this.depth++;
    this.string = result;
    this.draw();
  }

  this.reset = function() {
    this.string = this.axiom;
    this.depth = 0;
    this.draw();
  }

  this.toString = function() {
    return this.string;
  }

  this.draw = function() {
    resetMatrix();
    clear();
    background(51);
    stroke(255, 255, 255, 100);
    noFill();
    translate(x, y);
    for (var ii = 0; ii < this.string.length; ++ii) {
      var cur = this.string.charAt(ii);
      switch(cur) {
        case 'F':
          line(0, 0, 0, -this.len*Math.pow(2, -this.depth));
          translate(0, -this.len*Math.pow(2, -this.depth));
          break;
        case '+':
          rotate(this.angle);
          break;
        case '-':
          rotate(-this.angle);
          break;
        case '[':
          push();
          break;
        case ']':
          pop();
          break;
        default:
          console.log('encountered unknown character in string');
      }
    }
    redraw();
  }
}

function getNamedLSystem(name) {
  switch(name) {
    case 'Box':
      return new LSystem('F+F+F+F', { F: 'FF+F+F+F+FF' }, 100, PI/2, 5, 0, height);
    case 'Koch Curve':
      return new LSystem('F+F+F+F', { F: 'F+F-F-FF+F+F-F' }, 50, PI/2, 4, width/5.0, height*4/5.0);
    case 'Rings':
      return new LSystem('F+F+F+F', { F: 'FF+F+F+F+F+F-F' }, 50, PI/2, 5, width/5.0, height/5.0);
    case 'Hilbert Curve I':
      return new LSystem('X', { X: '+YF-XFX-FY+', Y: '-XF+YFY+FX-' }, width/2.0, PI/2, 7, 0, height);
    case 'Hilbert Curve II':
      return new LSystem('X', { X: 'XFYFX+F+YFXFY-F-XFYFX', Y: 'YFXFY-F-XFYFX+F+YFXFY' }, width/8.0, PI/2, 4, 0, height);
    case 'Seaweed':
    default:
      return new LSystem('F', { F: 'FF+[+F-F-F]-[-F+F+F]' }, 200, radians(22), 5, width/2.0, height);
  }
}

function selectNamedLSystem() {
  lsystem = getNamedLSystem(select.value());
  lsystem.step();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  var container = createDiv('');
  container.class('config');
  select = createSelect();
  select.option('Seaweed');
  select.option('Box');
  select.option('Koch Curve');
  select.option('Rings');
  select.option('Hilbert Curve I');
  select.option('Hilbert Curve II');

  var buttons = createDiv('');
  var stepButton = createButton('Step');
  var resetButton = createButton('Reset');
  stepButton.mousePressed(function() {
    lsystem.step();
  });
  resetButton.mousePressed(function() {
    lsystem.reset();
  });
  buttons.child(stepButton);
  buttons.child(resetButton);
  container.child(select);
  container.child(buttons);
  container.position(10, 10);

  lsystem = getNamedLSystem('Seaweed');
  lsystem.draw();

  select.changed(selectNamedLSystem);
}

function draw() {
}
