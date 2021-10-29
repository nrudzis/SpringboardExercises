const movies = {};

$('form').on('submit', (e) => {
  e.preventDefault();
  let title = $('#title').val();
  let rating = $('#rating').val();
  if(title.length < 2) {
    alert('Title must be at least 2 characters!');
    resetForm();
    return;
  }
  if(rating < 0 || rating > 10) {
    alert('Rating must be between 0 and 10!');
    resetForm();
    return;
  }
  movies[title] = rating;
  generateMovie(title);
  resetForm();
});

$('#title-sort').on('click', () => {
  $('#movie-area').empty();
  Object.keys(movies)
    .sort()
    .forEach(title => generateMovie(title));
});

$('#rating-sort').on('click', () => {
  $('#movie-area').empty();
  Object.keys(movies)
    .sort((firstTitle, nextTitle) => movies[nextTitle] - movies[firstTitle])
    .forEach(title => generateMovie(title));
});

$('#movie-area').on('click', 'button', (e) => {
  delete movies[$(e.currentTarget).parent().data('title')]
  $(e.currentTarget).parent().remove();
});

const generateMovie = (title) => {
  $('#movie-area').append(
    `<div data-title="${title}">
      <p>${title} - ${movies[title]}</p>
      <button>Remove</button>
    </div>`
  );
}

const resetForm = () => {
  $('#title').val('');
  $('#rating').val('');
}
