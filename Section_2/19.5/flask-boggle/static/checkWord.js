async function checkWord(e) {
    e.preventDefault();
    const word = $('#word').val();
    const response = await axios.get('/check-word', { params: { word } });
    const result = response.data.result;
    const $message = $(`<p>${ word } is ${ result.replace(/-/g, " ") }</p>`);
    $('#word-form').after($message);
    $('#word').val('');
}

$('#word-form').on('submit', checkWord);
