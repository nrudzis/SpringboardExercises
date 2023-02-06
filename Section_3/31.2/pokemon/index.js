axios
  .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  .then(pAll => {
    const pokemon = [];
    pAll.data.results.forEach(p => {
      pokemon.push({ 'name': p.name, 'url': p.url });
    })
    console.log(pokemon[0])
    console.log(pokemon[1])
    console.log(pokemon[2])
  })
  .catch(err => console.log('ERROR!', err));
