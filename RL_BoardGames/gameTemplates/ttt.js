/// game parameters and functions for Tic Tac Toe

let ttt = {
  bRows: 3,
  bCols: 3,
  p1: 'X',
  p2: 'O',
  selfTrainedModel: null,
  downloadedModel: null,
  selfTrainedModelStatus: 'red',
  downloadedModelStatus: 'red',
  display: function(board, y, x){
    //space and text
    rect(board.grid[y][x].centerX, board.grid[y][x].centerY, squareSize, squareSize);
    text(board.grid[y][x].slot, board.grid[y][x].centerX, board.grid[y][x].centerY);
  },
  update: function(board, y, x){ //update grid after legal move
    board.grid[y][x].slot = currentPlayer;
  },
  drawCheck: function(board){
    for (let y = 0; y < board.rows; y++){
      for (let x = 0; x < board.cols; x++){
        if (board.grid[y][x].slot == ''){
          //exits as soon as it sees board not full
          return false;
        }
      }
    }
    //if board is full
    return true;
  },
  winCheck: function(board, player){ //need to pass game.board as board
    let winCount = 3;
    let count = 0;
    //vertical check
    for (let x = 0; x < board.cols; x++){
      count = 0;
      for (let y = 0; y < board.rows; y++) {
        if (board.grid[y][x].slot === player) {
          count += 1;
        }
      }
      if (count == winCount) {
        for (let w = 0; w < board.rows; w++){
          board.grid[w][x].win = 'gold';
          board.grid[w][x].winWeight = 10;
        }
        return true;
      }
    }
    //horizontal check
    for (let y = 0; y < board.rows; y++) {
      count = 0;
      for (let x = 0; x < board.cols; x++){
        if (board.grid[y][x].slot === player) {
          count += 1;
        }
      }
      if (count == winCount) {
        for (let w = 0; w < board.cols; w++){
          board.grid[y][w].win = 'gold';
          board.grid[y][w].winWeight = 10;
        }
        return true;
      }
    }
    //diagonal checks
    count = 0;
    for (let d = 0; d < board.rows; d++){ //hmm how to do diagonal for c4?
      if (board.grid[d][d].slot === player){
        count += 1;
      }
    }
    if (count == winCount) {
      for (let w = 0; w < board.rows; w++){
        board.grid[w][w].win = 'gold';
        board.grid[w][w].winWeight = 10;
      }
      return true;
    }
    count = 0;
    for (let d = 0; d < board.rows; d++){
      if (board.grid[d][board.rows - d - 1].slot === player){
        count += 1;
      }
    }
    if (count == winCount){
      for (let w = 0; w < board.rows; w++){
        board.grid[w][board.rows - w - 1].win = 'gold';
        board.grid[w][board.rows - w - 1].winWeight = 10;
      }
      return true;
    }
  }
}

function tttTrain(){

}

// async function blueTest(){
//   ttt.downloadedModelStatus == 'blue'; //need to put draw, this doesn't work
//   push();
//   fill(ttt.downloadedModelStatus);
//   ellipse(3*width/12, 7*height/20, circleSize);
//   pop();
// }
async function tttDownload(){
// function tttDownload(){
  if (ttt.downloadedModelStatus == 'red') {
    console.log('TTT start to download');
    ttt.downloadedModelStatus = 'blue'; //need to put draw, this doesn't work
    // push();
    // fill(ttt.downloadedModelStatus);
    // ellipse(3*width/12, 7*height/20, circleSize);
    // pop();
    await tttDownloadPretrained();
    console.log('TTT model downloaded');
    ttt.downloadedModelStatus = 'green';
  }
}

async function tttDownloadPretrained(){
  if (!ttt.downloadedModel){
    //starting to blend with Grimmer
    const humanGame = new TicTacToeGame();
    ttt.downloadedModel = new NNetWrapper(humanGame);
    await ttt.downloadedModel.loadPretrained('https://grimmer.io/alphago-tictactoe-keras-trained/model.json');
  }
}
