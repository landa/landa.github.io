function LSystem(axiom, productions, len, angle) {
  this.axiom = axiom;
  this.productions = productions;
  this.len = len;
  this.angle = angle;
  this.string = axiom;
  this.depth = 0;

  this.step = function() {
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
    this.len /= 2;
    this.string = result;
  }

  this.toString = function() {
    return this.string;
  }

  this.draw = function() {
    resetMatrix();
    translate(width/2.0, height);
    for (var ii = 0; ii < this.string.length; ++ii) {
      var cur = this.string.charAt(ii);
      switch(cur) {
        case 'F':
          line(0, 0, 0, -this.len);
          translate(0, -this.len);
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

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);
  stroke(255, 255, 255, 100);
  noFill();

  var button = createButton('Step');
  button.position(10, 10);

  var productions = {
    F: 'FF+[+F-F-F]-[-F+F+F]',
  };
  lsystem = new LSystem('F', productions, 100, radians(25));

  button.mousePressed(function() {
    lsystem.step();
    lsystem.draw();
  });
}

function draw() {
}
