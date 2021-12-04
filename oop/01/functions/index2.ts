const addEmoji = (input: string) => console.log(input, ":)");
const appendEmoji = (emoji: string) => {
  return (input: string) => {
    console.log(input, emoji);
  };
};

const happyEmoji = appendEmoji(":)");
const sadEmoji = appendEmoji(":(");

happyEmoji("Mostafa ");
sadEmoji("Mostafa ");
