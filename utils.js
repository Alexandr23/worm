const normalizeValue = (value, min, max) => {
  if (value > max) {
    return min;
  }

  if (value < min) {
    return max;
  }

  return value;
};

const KEY_CODE = {
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  W: 87,
  D: 68,
  S: 83,
  A: 65
};
