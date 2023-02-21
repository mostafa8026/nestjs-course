export function generateRandomPositions(players: any[], fieldWidth: number, fieldHeight: number, playerWidth: number, playerHeight: number) {
  for (var i = 0; i < players.length; i++) {
    var maxX = fieldWidth - playerWidth;
    var maxY = fieldHeight - playerHeight;
    players[i].x = Math.floor(Math.random() * maxX);
    players[i].y = Math.floor(Math.random() * maxY);
  }
  return players;
}
