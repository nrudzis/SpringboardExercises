async function submitScore() {
  let score = parseInt($('#score').text());
  const response = await axios.post('/scores', { score });
}

function removeMessage() {
  if( $('#word-form').next('p') ) {
    $('#word-form').next('p').remove();
  }
}

function wordFormToggle() {
  $('#wordSubmit').prop('disabled') ? $('#wordSubmit').prop('disabled', false) : $('#wordSubmit').prop('disabled', true);
  $('#wordInput').prop('disabled') ? $('#wordInput').prop('disabled', false) : $('#wordInput').prop('disabled', true);
}

function timeout() {
  setTimeout(function() {
    wordFormToggle();
    submitScore();
    removeMessage();
    const $newGame = $(`<button>New Game</button>`).click(function() {
      $.ajax('/').done(function(board) {
        $('body').html(board);
      });
      wordFormToggle();
    });
    $('#word-form').after($newGame);
  }, 60000);
}

function keepScore(word, result) {
  if(result === "ok") {
    let score = parseInt($('#score').text());
    score = score + word.length;
    $('#score').text(score.toString());
  }
}

async function checkWord(e) {
  e.preventDefault();
  const word = $('#wordInput').val();
  const response = await axios.get('/check-word', { params: { word } });
  const result = response.data.result;
  const $message = $(`<p>${ word } is ${ result.replace(/-/g, " ") }</p>`);
  removeMessage();
  $('#word-form').after($message);
  $('#wordInput').val('');
  $('#wordInput').focus();
  keepScore(word, result);
}

$(document).ready(timeout());
$('#word-form').on('submit', checkWord);
