const movies = {};

$('form').on('submit', (e) => {
  e.preventDefault();
  let title = $('#title').val();
  let rating = $('#rating').val();
  movies[title] = rating;
  console.log(movies);
  $('#movie-area').append(
    `<div data-title="${title}">
      <p>${title} - ${movies[title]}</p>
      <button>Remove</button>
    </div>`
  );
  $('#title').val('');
  $('#rating').val('');
});

$('#movie-area').on('click', 'button', (e) => {
  delete movies[$(e.currentTarget).parent().data('title')]
  console.log(movies);
  $(e.currentTarget).parent().remove();
});
