async function submitScore() {
  let score = parseInt($('#score').text());
  const response = await axios.post('/scores', { score });
}

function timeout() {
  const $wordSubmit = $('#wordSubmit');
  const $wordInput = $('#wordInput');
  setTimeout(function() {
    $wordSubmit.prop('disabled', true);
    $wordInput.prop('disabled', true);
    submitScore();
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
  if( $('#word-form').next('p') ) {
    $('#word-form').next('p').remove();
  }
  $('#word-form').after($message);
  $('#wordInput').val('');
  $('#wordInput').focus();
  keepScore(word, result);
}

$(document).ready(timeout());
$('#word-form').on('submit', checkWord);
