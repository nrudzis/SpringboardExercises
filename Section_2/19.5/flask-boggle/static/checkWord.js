function keepScore(word, result) {
  if(result === "ok") {
    let score = parseInt($('#score').text());
    score = score + word.length;
    $('#score').text(score.toString());
  }
}

async function checkWord(e) {
  e.preventDefault();
  const word = $('#word').val();
  const response = await axios.get('/check-word', { params: { word } });
  const result = response.data.result;
  const $message = $(`<p>${ word } is ${ result.replace(/-/g, " ") }</p>`);
  if( $('#word-form').next('p') ) {
    $('#word-form').next('p').remove();
  }
  $('#word-form').after($message);
  $('#word').val('');
  keepScore(word, result);
}

$('#word-form').on('submit', checkWord);
