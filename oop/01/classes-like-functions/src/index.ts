// functional programming
const move = (characterName: string) => console.log(`move ${characterName}`);

move("snake");

const character = (walkType: any) => (dynamic: string) =>
  `${dynamic} ${walkType}`;

const snake = character("crawling");
const bird = character("flying");
console.log(snake("I'm "));
console.log(bird("I'm "));
