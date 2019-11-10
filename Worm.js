class Worm {
  constructor(areaWidth, areaHeight, body = [{ x: 1, y: 1 }]) {
    this.body = body;
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
  }

  moveUp = () => this.move("up");

  moveDown = () => this.move("down");

  moveLeft = () => this.move("left");

  moveRight = () => this.move("right");

  move = direction => {
    this.tail = { ...this.body[0] };

    this.body.forEach((item, i) => {
      if (i === this.body.length - 1) {
        switch (direction) {
          case "up":
            item.y = normalizeValue(item.y - 1, 1, this.areaHeight);
            break;
          case "right":
            item.x = normalizeValue(item.x + 1, 1, this.areaWidth);
            break;
          case "down":
            item.y = normalizeValue(item.y + 1, 1, this.areaHeight);
            break;
          case "left":
            item.x = normalizeValue(item.x - 1, 1, this.areaWidth);
            break;
          default:
            break;
        }
      } else {
        item.x = this.body[i + 1].x;
        item.y = this.body[i + 1].y;
      }
    });

    let selfBiteIndex = this.checkSelfBite();

    if (selfBiteIndex) {
      this.removeTail(selfBiteIndex);
    }
  };

  checkSelfBite = () => {
    if (this.length > 1) {
      for (let i = this.length - 2; i >= 0; i--) {
        console.log("i:", i);
        const current = this.body[i];
        if (current.x === this.head.x && current.y === this.head.y) {
          return i;
        }
      }
    }
  };

  removeTail = index => {
    this.body.splice(0, index + 1);
  };

  grow = () => {
    this.body.unshift({ ...this.tail });
  };

  get length() {
    return this.body.length;
  }

  get head() {
    return this.body[this.length - 1];
  }
}
