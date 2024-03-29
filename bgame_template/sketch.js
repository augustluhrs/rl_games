/* Board Game Template Sketch
  August Luhrs @DeadAugust
  for ml5 RL examples
  Summer 2019

  based on u/Grimmer1025's tf.js tic tac toe repo
*/
//DOM elements
let gameSelect, reset;
//overall variables
let game = { //just for start
  name: 'tic tac toe',
  params: ttt
}
let currentPlayer;
let gameStarted = false;
// let firstMove = false;
let squareSize; //need to make a part of board variable so bigger board still small
//board stats same for all games:
let wideScreen;
let boardWidth, boardLength;
let boardCenterX, boardCenterY;
let boardCornerX, boardCornerY;
// let win = false;
let gameEnd = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  if (windowWidth < windowHeight) {
    // squareSize = windowWidth/10;
    wideScreen = false;
    boardWidth = width / 2;
    boardHeight = boardWidth;
  } else {
    // squareSize = windowHeight/10;
    wideScreen = true;
    boardHeight = height / 2;
    boardWidth = boardHeight;
  }

  //game dropdown
  gameSelect = createSelect();
  gameSelect.position(width / 2, height / 20);
  gameSelect.option('connect 4');
  
  gameSelect.option('tic tac toe');
  // gameSelect.changed(changeGame);

  //reset game
  reset = createButton('New Game');
  reset.position(width / 2, height / 10);
  reset.mousePressed(resetGame);

  resetGame(); //starts with ttt
}

function draw() {
  background(50, 225, 100); // green
  push();
  noStroke();
  textSize(height/15);
  fill(0);
  if (gameEnd){
    text('GAME OVER ', width / 2, 2 * height / 10);
  } else if (gameStarted) {
    text('Player Turn: ' + currentPlayer, width / 2, 2 * height / 10);
  }
  pop();
  game.board.draw();
}

function mousePressed() { //check if square was clicked
  if (!gameEnd){
    game.board.move();
  }
}

function resetGame() {
  gameStarted = true;
  gameEnd = false;
  //change game data
  game.name = gameSelect.value();
  if (game.name == 'tic tac toe') {
    game.params = ttt;
  } else if (game.name == 'connect 4') {
    game.params = c4;
  }
  game.board = new Board(game.params.bCols, game.params.bRows);
  //choose random first player
  let r = random([0, 1]);
  if (r == 0) {
    currentPlayer = game.params.p1;
  } else {
    currentPlayer = game.params.p2;
  }
}
