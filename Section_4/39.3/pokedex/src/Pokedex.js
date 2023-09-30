import defaultPokemon from './defaultPokemon';
import Pokecard from './Pokecard';

const Pokedex = ({pokemon = defaultPokemon}) => {
  return (
    <div>
      <h1>Pokedex</h1>
      {pokemon.map(p => (
        <Pokecard id={p.id} name={p.name} type={p.type} base_experience={p.base_experience} />
      ))}
    </div>
  );
}

export default Pokedex;
