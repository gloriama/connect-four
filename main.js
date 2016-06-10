var Board = require('./Board');
var prompt = require('prompt');
prompt.start();

var EMPTY_PIECE = 0;
var PLAYER_ONE_PIECE = 1;
var PLAYER_TWO_PIECE = 2;


var board = new Board();

var currPlayer = PLAYER_ONE_PIECE;

var getOppositePlayer = function(currPlayer) {
  if (currPlayer === PLAYER_ONE_PIECE) {
    return PLAYER_TWO_PIECE;
  } else {
    return PLAYER_ONE_PIECE;
  }
};

// Will run one turn for the current player
var runTurn = function() {
  // print board
  board.print();

  // console log out which is currently going
  console.log('Current player:', currPlayer);

  // prompt for a column number
  prompt.get(['c'], function(err, result) {
    // ideally we would validate the c right now
    // also do error checking
    // TODO for later

    var c = parseInt(result.c);
    var r = board.addPiece(currPlayer, c);

    // Overall idea:
    // addedPiece = add the piece
    // if we did actually add a piece
      // check if the game was won
      // if so,
        // print congratulations to currPlayer
      // else
        // switch the player
    // else
      // print a warning message to say "that col is already full, try again"

    // if we did actually add a piece (i.e. col was not full)
    if (r !== -1) {
      if (board.hasWon(r, c)) {
        board.print();
        console.log('Congratulations!', currPlayer, 'has won.');
        return;
      } else {
        currPlayer = getOppositePlayer(currPlayer); // todo
        runTurn();
      }
    } else {
      console.log('Warning: That column is already full. Please try again.');
      runTurn();
    }
  });
};

// runTurn();

// Testing addPiece function
// var addedPiece; // boolean
// addedPiece = board.addPiece(PLAYER_ONE_PIECE, 3);
// board.print();
// console.log(addedPiece);


var b = new Board();
b.addPiece(PLAYER_ONE_PIECE, 2);
b.addPiece(PLAYER_ONE_PIECE, 2);
b.addPiece(PLAYER_ONE_PIECE, 2);
b.print();

b.rotateBoardClockwise();
b.print();