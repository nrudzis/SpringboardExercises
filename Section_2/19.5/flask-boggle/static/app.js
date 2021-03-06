class Boggle {
  constructor() {
    this.words = [];
  }

  toggleWordForm() {
    $('#word-submit').prop('disabled') ? $('#word-submit').prop('disabled', false) : $('#word-submit').prop('disabled', true);
    $('#word-input').prop('disabled') ? $('#word-input').prop('disabled', false) : $('#word-input').prop('disabled', true);
  }

  async submitScore() {
    let score = parseInt( $('#score').text() );
    const response = await axios.post('/scores', { score });
  }

  removeMessage() {
    if( $('#word-form').next('p') ) {
      $('#word-form').next('p').remove();
    }
  }

  addMessage(message) {
    this.removeMessage();
    $('#word-form').after(message);
    $('#word-input').val('');
    $('#word-input').focus();
  }

  updateScoreDisplay(word, result) {
    if(result === "ok") {
      let score = parseInt( $('#score').text() );
      score = score + word.length;
      $('#score').text(score.toString());
    }
  }

  async checkWord(word) {
    const response = await axios.get('/check-word', { params: { word } });
    return response.data.result;
  }

  async handleWordSubmit(e) {
    e.preventDefault(e);
    const word = $('#word-input').val();
    if(word === '') {
      this.addMessage('<p>Please submit a word.</p>');
    } else if(this.words.indexOf(word) >= 0){
      this.addMessage( $(`<p>${word} already submitted!</p>`) );
    } else {
      const result = await this.checkWord(word);
      this.addMessage( $(`<p>${ word } is ${ result.replace(/-/g, " ") }</p>`) );
      if(result === "ok") {
        this.words.push(word);
      }
      this.updateScoreDisplay(word, result);
    }
  }

  newGame = () => {
    $.ajax('/').done(boardPage => {
      const $html = $.parseHTML(boardPage);
      const $gameArea = $html[5];
      $('#game-area').remove();
      $('body').prepend($gameArea);
      this.timeout();
      $('#word-form').on('submit', e => this.handleWordSubmit(e));
    });
  }

  timeout = () => {
    setTimeout(() => {
      this.toggleWordForm();
      this.submitScore();
      this.removeMessage();
      const $newGameButton = $(`<button>New Game</button>`).click(this.newGame);
      $('#word-form').after($newGameButton);
    }, 60000);
  }
}

let boggle = new Boggle();
$(document).ready(boggle.timeout);
$('#word-form').on('submit', e => boggle.handleWordSubmit(e));
