var addEmoji = function (input) { return console.log(input, ":)"); };
var appendEmoji = function (emoji) {
    return function (input) {
        console.log(input, emoji);
    };
};
var happyEmoji = appendEmoji(":)");
var sadEmoji = appendEmoji(":(");
happyEmoji("Mostafa ");
sadEmoji("Mostafa ");
