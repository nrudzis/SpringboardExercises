const movies = {};

$('form').on('submit', (e) => {
  e.preventDefault();
  let title = $('#title').val();
  let rating = $('#rating').val();
  movies[title] = rating;
  $('#movie-area').append(
    `<div data-title="${title}">
      <p>${title} - ${movies[title]}</p>
      <button>Remove</button>
    </div>`
  );
});
