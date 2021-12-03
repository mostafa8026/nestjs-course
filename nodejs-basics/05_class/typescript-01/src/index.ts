interface ShapeInterface {
  x: number;
  y: number;
  draw: (x: number, y: number) => void;
}

class ShapeClass implements ShapeInterface {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number): void {
    console.log("shape class: ", x, y);
  }
}

class Square extends ShapeClass {
  draw(x: number, y: number): void {
    console.log("square: ", x, y);
  }
}

class Circle extends ShapeClass {
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  draw(x: number, y: number): void {
    console.log("circle: ", x, y);
  }
}
