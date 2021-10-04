const $gifSearch = $('#gifSearch');

$('#gifSearchForm').on('submit', async function getGif(e) {
  e.preventDefault();
  let res = await axios.get('http://api.giphy.com/v1/gifs/search',
    {params: { 
      q: $gifSearch.val(),
      api_key: 'z9jcxCB03iip1t6xy609JyogrPQDhIzA'
    }
  });
  console.log(res.data.data);
  $gifSearch.val('');
});

console.log("Let's get this party started!");
