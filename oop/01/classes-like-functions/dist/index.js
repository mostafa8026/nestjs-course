"use strict";
// functional programming
const move = (characterName) => console.log(`move ${characterName}`);
move("snake");
const character = (walkType) => (dynamic) => `${dynamic} ${walkType}`;
const snake = character("crawling");
const bird = character("flying");
console.log(snake("I'm "));
console.log(bird("I'm "));
