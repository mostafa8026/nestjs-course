const move = (name: string) => {
  let sound = "sound.mp3";
  let walkType = "";
  if (name == "snake") {
    walkType = "crawl";
  } else if (name == "dog") {
    walkType = "walk";
  } else if (name == "bird") {
    sound = "sound.wav";
    walkType = "fly";
  }
  console.log(name, walkType, " with sound", sound);
};
move("snake");
move("dog");
move("bird");
