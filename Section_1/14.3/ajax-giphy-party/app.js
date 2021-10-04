const $gifSearch = $('#gifSearch');

$('<ul>').attr('id', 'gifList').insertAfter('#gifSearchForm');

$('#gifSearchForm').on('submit', async function getGif(e) {
  e.preventDefault();
  let res = await axios.get('http://api.giphy.com/v1/gifs/search',
    {params: { 
      q: $gifSearch.val(),
      api_key: 'z9jcxCB03iip1t6xy609JyogrPQDhIzA'
    }
  });
  randIndex = Math.floor(Math.random() * (res.data.data.length + 1))
  imgSrc = res.data.data[randIndex].images.original.url;
  $('#gifList').append('<li>').append(`<img src=${imgSrc}>`);
  $gifSearch.val('');
});

console.log("Let's get this party started!");
