words = [];

async function submitScore() {
  let score = parseInt($('#score').text());
  const response = await axios.post('/scores', { score });
}

function removeMessage() {
  if( $('#word-form').next('p') ) {
    $('#word-form').next('p').remove();
  }
}

function toggleWordForm() {
  $('#wordSubmit').prop('disabled') ? $('#wordSubmit').prop('disabled', false) : $('#wordSubmit').prop('disabled', true);
  $('#wordInput').prop('disabled') ? $('#wordInput').prop('disabled', false) : $('#wordInput').prop('disabled', true);
}

function newGame() {
  $.ajax('/').done(function(board) {
    $('body').html(board);
  });
  toggleWordForm();
}

function timeout() {
  setTimeout(function() {
    toggleWordForm();
    submitScore();
    removeMessage();
    const $newGameButton = $(`<button>New Game</button>`).click(newGame);
    $('#word-form').after($newGameButton);
  }, 60000);
}

function keepScore(word, result) {
  if(result === "ok") {
    let score = parseInt($('#score').text());
    score = score + word.length;
    $('#score').text(score.toString());
  }
}

function addMessage(message) {
  removeMessage();
  $('#word-form').after(message);
  $('#wordInput').val('');
  $('#wordInput').focus();
}

async function checkWord(e) {
  e.preventDefault();
  const word = $('#wordInput').val();
  if(words.indexOf(word) >= 0) {
    addMessage( $(`<p>${word} already submitted!</p>`) );
  } else {
    words.push(word);
    console.log(words);
    const response = await axios.get('/check-word', { params: { word } });
    const result = response.data.result;
    addMessage( $(`<p>${ word } is ${ result.replace(/-/g, " ") }</p>`) );
    keepScore(word, result);
  }
}

$(document).ready(timeout());
$('#word-form').on('submit', checkWord);
