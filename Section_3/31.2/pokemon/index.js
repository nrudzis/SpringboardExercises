class Pokemon {

  getThreeRandPokemon() {
    return axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(pAll => {
        const randThreePokemon = [];
        while (randThreePokemon.length < 3) {
          let randIndex = Math.floor(Math.random() * pAll.data.results.length);
          let randPokemon = pAll.data.results[randIndex];
          if (!randThreePokemon.includes(randPokemon)) {
            randThreePokemon.push(randPokemon);
          }
        }
        return randThreePokemon;
      })
      .catch(err => console.log('ERROR!', err));
  }

  getSpeciesURL(pokemon) {
    return axios
      .get(pokemon.url)
      .then(p => {
        return p.data.species.url
      })
      .catch(err => console.log('ERROR!', err));
  }

  getDescription(speciesURL) {
    return axios
      .get(speciesURL)
      .then(s => {
        if (s.data.flavor_text_entries.length > 0) {
          const entry = s.data.flavor_text_entries.find(e => e.language.name === 'en');
          return `Description: ${ entry.flavor_text }`;
        } else {
          return 'Description: No description available.';
        }
      })
      .catch(err => console.log('ERROR!', err));
  }

  consoleLogThreePokemon() {
    this.getThreeRandPokemon()
      .then(threeRandPokemon => {
        for (const pokemon of threeRandPokemon) {
          const pName = pokemon.name;
          this.getSpeciesURL(pokemon)
            .then(speciesURL => {
              this.getDescription(speciesURL)
                .then(pDescription => {
                  console.log({'name': pName, 'description': pDescription});
                });
            });
        }
      });
  }

}
