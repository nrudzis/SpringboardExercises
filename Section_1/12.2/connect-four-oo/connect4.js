class Game {
  constructor(width, height, player1, player2) {
    this.width = width;
    this.height = height;
    this.player1 = player1;
    this.player2 = player2;
    this.currPlayer = player1;
    this.board = [];
  }
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById('board');
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    this.handleClick = this.handleClick.bind(this);
    top.addEventListener('click', this.handleClick);
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    board.append(top);
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    this.deactivateBoard();
    setTimeout(() => alert(msg), 0);
  }
  deactivateBoard() {
    const top = document.getElementById('column-top');
    top.removeEventListener('click', this.handleClick);
  }
  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    this.board[y][x] = this.currPlayer.color;
    this.placeInTable(y, x);
    if (this.checkForWin()) {
      return this.endGame(`${this.currPlayer.color} won!`);
    }
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
    this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;
  }
  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer.color
      );
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

const gameArea = document.getElementById('game');
const gameForm = document.createElement('form');
const player1Input = document.createElement('input');
const player2Input = document.createElement('input');
const gameButton = document.createElement('button');
player1Input.setAttribute('type', 'text');
player2Input.setAttribute('type', 'text');
gameButton.innerText = 'Start Game!';
gameButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const board = document.getElementById('board');
  board.innerHTML = '';
  const player1Color = player1Input.value;
  const player2Color = player2Input.value;
  let player1 = new Player(player1Color);
  let player2 = new Player(player2Color);
  let connectFour = new Game(7, 6, player1, player2);
  connectFour.makeBoard();
  connectFour.makeHtmlBoard();
});
gameForm.append(player1Input, player2Input, gameButton);
gameArea.prepend(gameForm);
