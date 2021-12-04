class Animal {
  name: string;
  walkType: string;
  sound: string;

  constructor(name: string, walkType: string, sound: string) {
    this.name = name;
    this.walkType = walkType;
    this.sound = sound;
  }

  move() {
    console.log(this.name, this.walkType, " by sound", this.sound);
  }
}

class Snake extends Animal {
  constructor() {
    super("Snake", "Crawl", "sound.mp3");
  }
}

class Dog extends Animal {
  constructor() {
    super("Dog", "Walk", "sound.mp3");
  }
}

class Bird extends Animal {
  constructor() {
    super("Bird", "Fly", "sound.wav");
  }
}

const s = new Snake();
s.move();

const d = new Dog();
d.move();

const b = new Bird();
b.move();
