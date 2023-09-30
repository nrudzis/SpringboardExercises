import defaultPokemon from './defaultPokemon';

const Pokedex = ({pokemon = defaultPokemon}) => {
  return (
    <div>
      <h1>Pokedex</h1>
      {pokemon.map(p => (
        <div>
          <h4>{p.name}</h4>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt='Pokemon character'/>
          <p>Type: {p.type}</p>
          <p>EXP: {p.base_experience}</p>
        </div>
      ))}
    </div>
  );
}

export default Pokedex;
