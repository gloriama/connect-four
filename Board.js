var DEFAULT_NUM_COLS = 7;
var DEFAULT_NUM_ROWS = 6;

var EMPTY_PIECE = 0;
var PLAYER_ONE_PIECE = 1;
var PLAYER_TWO_PIECE = 2;

var Board = function() {
  this.numCols = DEFAULT_NUM_COLS;
  this.numRows = DEFAULT_NUM_ROWS;
  this.matrix = [];

  //initialize matrix:
  for (var r = 0; r < this.numRows; r++) {
    var newRow = [];
    for (var c = 0; c < this.numCols; c++) {
      newRow.push(EMPTY_PIECE);
    }
    this.matrix.push(newRow);
  }
};

Board.prototype.print = function() {
  console.log(this.matrix.map(function(row) {
    return row.map(function(square) {
      if (square === EMPTY_PIECE) {
        return '-';
      } else if (square === PLAYER_ONE_PIECE) {
        return 'o';
      } else {
        return 'x';
      }
    }).join(' ');
  }).join('\n'));
};

// Adds piece for given player at given col
// Do nothing if the col is already full
// Returns the row for where the piece was added, or else -1 if not added
Board.prototype.addPiece = function(playerPiece, c) {
  for (var r = this.numRows - 1; r >= 0; r--) {
    // once we find an empty spot in that col, fill it
    if (this.matrix[r][c] === EMPTY_PIECE) {
      this.matrix[r][c] = playerPiece;
      return r;
    }
  }
  return -1;
};

// Check if there is a winning streak through the position (r, c)
Board.prototype.hasWon = function(targetR, targetC) {
  // check the row, column, major diagonal, and minor diagonal
  
  var playerPiece = this.matrix[targetR][targetC];

  return (
    this.checkWinningStreakWithOffsets(targetR, targetC, 0, 1) ||
    this.checkWinningStreakWithOffsets(targetR, targetC, 1, 0) ||
    this.checkWinningStreakWithOffsets(targetR, targetC, 1, 1) ||
    this.checkWinningStreakWithOffsets(targetR, targetC, -1, 1)
  );
}

Board.prototype.isInBounds = function(r, c) {
  return (
    r >= 0 && r < this.numRows &&
    c >= 0 && c < this.numCols
  );
}

// The following function will let us check all 7 items in
// a specific direction

// rOffset and cOffset will indicate direction of movement
// they can be -1, 0, or 1 each

// to check the row:
// rOffset = 0, cOffset = 1

// to check the col:
// rOffset = 1; cOffset = 0

// to check the major diagonal (top-left to bottom-right)
// rOffset = 1; cOffset = 1

// to check the minor diagonal
// rOffset = -1, cOffset = 1

Board.prototype.checkWinningStreakWithOffsets = function(targetR, targetC, rOffset, cOffset) {
  var playerPiece = this.matrix[targetR][targetC];
  var maxStreakLength = 0;
  var currStreakLength = 0;

  for (var offsetMultiple = -3; offsetMultiple <= 3; offsetMultiple++) {
    var r = targetR + offsetMultiple * rOffset; 
    var c = targetC + offsetMultiple * cOffset;

    if (!this.isInBounds(r, c)) {
      continue;
    }
    if (this.matrix[r][c] === playerPiece) {
      currStreakLength++;
      maxStreakLength = Math.max(currStreakLength, maxStreakLength);
      if (rOffset === 0 && cOffset === 1) {
        console.log(rOffset, cOffset, ":", r, c, this.matrix[r][c]);
        console.log('currStreakLength', currStreakLength, 'max', maxStreakLength);
      }
    } else {
      currStreakLength = 0;
    }
  }

  return maxStreakLength >= 4;
}

Board.prototype.rotateBoardClockwise = function() {
  // swap numRows and numCols
  var oldNumRows = this.numRows;
  var oldNumCols = this.numCols;
  this.numRows = oldNumCols;
  this.numCols = oldNumRows;

  // create a new matrix with numRows and numCols
  var newMatrix = [];
  // copy over the information from the old matrix
    // when we rotate clockwise,
    // the position (r, c) of the NEW matrix is going to be
    // (c, oldNumRows - 1 - r)  of the old matrix
  for (var r = 0; r < this.numRows; r++) {
    var newRow = [];
    for (var c = 0; c < this.numCols; c++) {
      newRow[c] = this.matrix[c][this.numRows - 1 - r];
    }
    newMatrix.push(newRow);
  }

  // filter downward

  this.matrix = newMatrix;
};

module.exports = Board;