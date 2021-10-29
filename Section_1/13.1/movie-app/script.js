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
  console.log(movies);
  $('#movie-area').append(
    `<div data-title="${title}">
      <p>${title} - ${movies[title]}</p>
      <button>Remove</button>
    </div>`
  );
  resetForm();
});

$('#movie-area').on('click', 'button', (e) => {
  delete movies[$(e.currentTarget).parent().data('title')]
  console.log(movies);
  $(e.currentTarget).parent().remove();
});

const resetForm = () => {
  $('#title').val('');
  $('#rating').val('');
}
