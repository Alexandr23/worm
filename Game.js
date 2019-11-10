const OPTIONS = {
  fps: 60
};

class Game {
  constructor(options) {
    options = { ...options, ...OPTIONS };

    this.fps = options.fps;
    this.score = 0;
  }

  start() {
    const canvas = document.getElementById("worm");
    const squareSize = 20; // 40px
    const widthPx = 400; // window.innerWidth - (window.innerWidth % squareSize);
    const heightPx = 400; // window.innerHeight - (window.innerHeight % squareSize);

    this.width = widthPx / squareSize;
    this.height = heightPx / squareSize;

    this.renderer = new Renderer(canvas, widthPx, heightPx, squareSize);
    this.worm = new Worm(this.width, this.height, [{ x: 1, y: 1 }, { x: 2, y: 1 }]);

    this.generateNewPoint();

    this.addEvents();
    this.startRender();
  }

  finish() {
    this.removeEvents();
  }

  addEvents = () => {
    document.addEventListener("keydown", this.handleKeyDownEvent);
  };

  removeEvents = () => {
    document.removeEventListener("keydown", this.handleKeyDownEvent);
  };

  handleKeyDownEvent = event => {
    switch (event.keyCode) {
      case KEY_CODE.ARROW_UP:
      case KEY_CODE.W:
        this.worm.moveUp();
        break;

      case KEY_CODE.ARROW_RIGHT:
      case KEY_CODE.D:
        this.worm.moveRight();
        break;

      case KEY_CODE.ARROW_DOWN:
      case KEY_CODE.S:
        this.worm.moveDown();
        break;

      case KEY_CODE.ARROW_LEFT:
      case KEY_CODE.A:
        this.worm.moveLeft();
        break;

      default:
        break;
    }

    this.checkPoint();
  };

  checkPoint = () => {
    const wormHead = this.worm.body[this.worm.length - 1];

    if (wormHead.x === this.pointX && wormHead.y === this.pointY) {
      this.score++;
      this.worm.grow();
      this.generateNewPoint();
    }
  };

  generateNewPoint = () => {
    this.pointX = Math.floor(Math.random() * this.width + 1);
    this.pointY = Math.floor(Math.random() * this.height + 1);
  };

  startRender = () => {
    this.render();
    this.renderTimer = setTimeout(this.startRender, 1000 / this.fps);
  };

  stopRender() {
    clearTimeout(this.renderTimer);
  }

  render = () => {
    this.renderer.clear();
    this.renderWorm();
    this.renderPoint();
  };

  renderWorm = () => {
    this.worm.body.forEach((item, i) => {
      this.renderer.drawRect(
        (item.x - 1) * this.renderer.squareSize,
        (item.y - 1) * this.renderer.squareSize,
        this.renderer.squareSize,
        this.renderer.squareSize,
        i === this.worm.length - 1 ? "maroon" : "red"
      );
    });
  };

  renderPoint = () => {
    this.renderer.drawRect(
      (this.pointX - 1) * this.renderer.squareSize,
      (this.pointY - 1) * this.renderer.squareSize,
      this.renderer.squareSize,
      this.renderer.squareSize,
      "blue"
    );
  };
}
