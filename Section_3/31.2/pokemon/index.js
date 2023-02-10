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
        return p.data.forms[0]['url'];
      })
  }

  getImageURL(formsURL) {
    return axios
      .get(formsURL)
      .then(f => {
        return f.data.sprites.front_default;
      })
      .catch(err => console.log('ERROR!', err));
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

  getNameImageDesc() {
    const pObj = {};
    return this.getRandPokemon()
      .then(randPokemon => {
        const pName = randPokemon.name;
        return Promise.all([
          this.getFormsURL(randPokemon)
            .then(formsURL => {
              return this.getImageURL(formsURL)
                .then(imgURL => {
                  pObj['image'] = imgURL;
                });
            }),
          this.getSpeciesURL(randPokemon)
            .then(speciesURL => {
              return this.getDescription(speciesURL)
                .then(pDescription => {
                  pObj['name'] = pName
                  pObj['description'] = pDescription
                });
            })
        ]);
      })
      .then(() => {
        return pObj
      });
  }

  getThreeRandPokemon() {
    let threeRandPokemon = []
    for (let i=0; i<3; i++) {
      this.getNameImageDesc().then(p => {
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
    const img = document.createElement('img');
    const par = document.createElement('p');
    h2.innerHTML = p.name;
    img.src = p.image;
    par.innerHTML = p.description;
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(par);
    pokemonSection.appendChild(div);
  }
}


pokemonBtn.addEventListener('click', e => {
  const threeRandPokemon = pokemon.threeRandPokemon;
  displayPokemon(threeRandPokemon);
  pokemon = new Pokemon();
});
