var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, walkType, sound) {
        this.name = name;
        this.walkType = walkType;
        this.sound = sound;
    }
    Animal.prototype.move = function () {
        console.log(this.name, this.walkType, " by sound", this.sound);
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        return _super.call(this, "Snake", "Crawl", "sound.mp3") || this;
    }
    return Snake;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super.call(this, "Dog", "Walk", "sound.mp3") || this;
    }
    return Dog;
}(Animal));
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super.call(this, "Bird", "Fly", "sound.wav") || this;
    }
    return Bird;
}(Animal));
var s = new Snake();
s.move();
var d = new Dog();
d.move();
var b = new Bird();
b.move();
