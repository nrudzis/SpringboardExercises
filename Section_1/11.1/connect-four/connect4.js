/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array - DONE
  for(let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for(let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" - DONE
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code - DONE
  const top = document.createElement("tr");         // create table row element called top
  top.setAttribute("id", "column-top");             // give top an id
  top.addEventListener("click", handleClick);       // run handleClick when top is clicked

  for (let x = 0; x < WIDTH; x++) {                 // do the contained WIDTH times
    const headCell = document.createElement("td");  // create table data cell element called headCell
    headCell.setAttribute("id", x);                 // give headCell an id
    top.append(headCell);                           // make headCell a child element of top
  }
  htmlBoard.append(top);                            // make top a child element of htmlBoard

  for(let y = 0; y < HEIGHT; y++) {                 // do the contained HEIGHT times
    const row = document.createElement("tr");       // create table row element called row
    for (let x = 0; x < WIDTH; x++) {               // do the contained WIDTH times
      const cell = document.createElement("td");    // create table data cell element called cell
      cell.setAttribute("id", `${y}-${x}`);         // give cell an id that is unique y-x combination
      row.append(cell);                             // make cell a child element of row
    }
    htmlBoard.append(row);                          // make row a child element of htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0 - DONE
  for(let y = board.length - 1; y >= 0; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell - DONE
  const piece = document.createElement("div");
  currPlayer === 1 ? piece.setAttribute("class", "piece player1") : piece.setAttribute("class", "piece player2");
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message - DONE
  const top = document.getElementById("column-top");
  top.removeEventListener("click", handleClick);
  setTimeout(() => alert(msg), 0);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board - DONE
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame - DONE
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie game!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2 - DONE
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
