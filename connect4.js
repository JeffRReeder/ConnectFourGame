/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // const board = [
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  // ];
  // better way to do it
  for(let y = 0; y < HEIGHT; y++){
    board.push(Array.from({ length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');

  // create new table row, set its id = 'column-top', listen for clicks
  // only the very top line is "column-top"
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // for selecting which column you will "drop your piece"
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // add top row (where you drop your piece) to board
  htmlBoard.append(top);

  // setAttribute for every position it's y-x coordinates (for later logic)
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // Walk bottom to top of columns 
  for(let y = HEIGHT -1; y >= 0; y--){
    // if there is data in cell move up 1, if there is something return position y
    if(!board[y][x]){
      return y;
    } 
  }
  // all y column is full don't let them do anything
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // which column they went to, get to bottom
  const pieceDiv = document.createElement('div');
  pieceDiv.classList.add("piece");

  // dynamically add class of p1 or p2
  pieceDiv.classList.add(`p${currPlayer}`);

  //pieceDiv.style.top = -50 * (y + 2);
  // get the spot where you want to drop it, append player piece div to y-x
  const pieceLocation = document.getElementById(`${y}-${x}`);
  pieceLocation.append(pieceDiv);
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  // adding the "+" sign converts the value from a string to a number
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory (2D array) board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win, send alert message
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // check every cell is "true/false" on cell
  // check every row is "true/false" on row
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie Game, Nobody won!');
  }
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  
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

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // check horizontal win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // check vertical win
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // check diagonal slanting up and to the right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // check diagonal slanting up and to the left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // if ANY are true = win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

// Add reset later
// const reset = document.addEventListener("click", function(){

// })