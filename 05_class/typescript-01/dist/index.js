"use strict";
class ShapeClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(x, y) {
        console.log("shape class: ", x, y);
    }
}
class Square extends ShapeClass {
    draw(x, y) {
        console.log("square: ", x, y);
    }
}
class Circle extends ShapeClass {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    draw(x, y) {
        console.log("circle: ", x, y);
    }
}
