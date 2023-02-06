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
      const pName = pokemon.name;
      axios
        .get(pokemon.url)
        .then(p => {
          axios
            .get(p.data.species.url)
            .then(s => {
              if (s.data.flavor_text_entries.length > 0) {
                const entry = s.data.flavor_text_entries.find(e => e.language.name === 'en');
                console.log('Name: ', pName );
                console.log('Description: ', entry.flavor_text);
              } else {
                console.log('Name: ', pName);
                console.log('Description: No description available.');
              }
            })
            .catch(err => console.log('ERROR!', err));
        })
        .catch(err => console.log('ERROR!', err));
    }
  })
  .catch(err => console.log('ERROR!', err));
