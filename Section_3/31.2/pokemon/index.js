axios
  .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  .then(pAll => {
    const pokemonAll = [];
    pAll.data.results.forEach(p => {
      pokemonAll.push({ 'name': p.name, 'url': p.url });
    })
    const randThreePokemon = [];
    while (randThreePokemon.length < 3) {
      let randIndex = Math.floor(Math.random() * pokemonAll.length);
      let randPokemon = pokemonAll[randIndex];
      if (!randThreePokemon.includes(randPokemon)) {
        randThreePokemon.push(randPokemon);
      }
    }
    for (const pokemon of randThreePokemon) {
      console.log(pokemon);
    }
  })
  .catch(err => console.log('ERROR!', err));
