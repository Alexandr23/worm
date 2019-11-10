class Renderer {
  constructor(canvas, width, height, squareSize) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.squareSize = squareSize;
    this.ctx = canvas.getContext("2d");
  }

  drawPoint = (x, y, color = "red") => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, l, l);
  };

  drawRect = (x, y, width, height, color = "red") => {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.stroke();
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  get width() {
    return this.canvas.width;
  }

  set width(value) {
    return (this.canvas.width = value);
  }

  get height() {
    return this.canvas.height;
  }

  set height(value) {
    return (this.canvas.height = value);
  }
}
