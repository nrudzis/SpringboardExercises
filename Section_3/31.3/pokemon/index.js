class Pokemon {

  constructor() {
    this.threeRandPokemon = this.getThreeRandPokemon();
  }

  async getRandPokemon() {
    try {
      const { data: pAll } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      const randIndex = Math.floor(Math.random() * pAll.results.length);
      return pAll.results[randIndex];
      } catch (err) {
        console.log('ERROR!', err);
      }
  }

  async getSpeciesURL(pokemon) {
    try {
      const { data: p } = await axios.get(pokemon.url);
      return p.species.url;
      } catch (err) {
        console.log('ERROR!', err);
      }
  }

  async getFormsURL(pokemon) {
    try {
      const { data: p } = await axios.get(pokemon.url);
      return p.forms[0]['url'];
      } catch (err) {
        console.log('ERROR!', err);
      }
  }

  async getImageURL(formsURL) {
    try {
      const { data: f } = await axios.get(formsURL);
      return f.sprites.front_default;
      } catch (err) {
        console.log('ERROR!', err);
      }
  }

  async getDescription(speciesURL) {
    try {
      const { data: s } = await axios.get(speciesURL);
      if (s.flavor_text_entries.length > 0) {
        const entry = s.flavor_text_entries.find(e => e.language.name === 'en');
        return `${ entry.flavor_text }`;
      } else {
        return 'No description available.';
      }
    } catch (err) {
      console.log('ERROR!', err);
    }
  }

  async getNameImageDesc() {
    const pObj = {};
    const randPokemon = await this.getRandPokemon();
    const formsURL = await this.getFormsURL(randPokemon);
    const imgURL = await this.getImageURL(formsURL);
    const speciesURL = await this.getSpeciesURL(randPokemon);
    const pDescription = await this.getDescription(speciesURL);
    pObj['name'] = randPokemon.name;
    pObj['image'] = imgURL;
    pObj['description'] = pDescription;
    return pObj
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
