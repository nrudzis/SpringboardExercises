class Pokemon {

  constructor() {
    this.threeRandPokemon = this.getThreeRandPokemon()
  }

  getRandPokemon() {
    return axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(pAll => {
        const randIndex = Math.floor(Math.random() * pAll.data.results.length);
        return pAll.data.results[randIndex];
      })
      .catch(err => console.log('ERROR!', err));
  }

  getSpeciesURL(pokemon) {
    return axios
      .get(pokemon.url)
      .then(p => {
        return p.data.species.url;
      })
      .catch(err => console.log('ERROR!', err));
  }

  getFormsURL(pokemon) {
    return axios
      .get(pokemon.url)
      .then(p => {
        return p.data.forms[0]['url']
      })
  }

  getDescription(speciesURL) {
    return axios
      .get(speciesURL)
      .then(s => {
        if (s.data.flavor_text_entries.length > 0) {
          const entry = s.data.flavor_text_entries.find(e => e.language.name === 'en');
          return `${ entry.flavor_text }`;
        } else {
          return 'No description available.';
        }
      })
      .catch(err => console.log('ERROR!', err));
  }

  getNameDescription() {
    return this.getRandPokemon()
      .then(randPokemon => {
        const pName = randPokemon.name;
        return this.getSpeciesURL(randPokemon)
          .then(speciesURL => {
            return this.getDescription(speciesURL)
              .then(pDescription => {
                return {'name': pName, 'description': pDescription};
              });
          });
      });
  }

  getThreeRandPokemon() {
    let threeRandPokemon = []
    for (let i=0; i<3; i++) {
      this.getNameDescription().then(p => {
        threeRandPokemon.push(p);
      });
    }
    return threeRandPokemon;
  }

}

const pokemonSection = document.getElementById('pokemon-section');
const pokemonBtn = document.getElementById('pokemon-btn');
let pokemon = new Pokemon();

const displayPokemon = (ps) => {
  pokemonSection.innerHTML = '';
  for (let p of ps) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const par = document.createElement('p');
    h2.innerHTML = p.name;
    par.innerHTML = p.description;
    div.appendChild(h2);
    div.appendChild(par);
    pokemonSection.appendChild(div);
  }
  pokemon = new Pokemon();
}


pokemonBtn.addEventListener('click', e => {
  const threeRandPokemon = pokemon.threeRandPokemon;
  displayPokemon(threeRandPokemon);
});
