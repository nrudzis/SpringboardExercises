import defaultPokemon from './defaultPokemon';
import Pokecard from './Pokecard';
import './Pokedex.css';

const Pokedex = ({pokemon = defaultPokemon}) => {
  return (
    <>
      <h1 className='Pokedex-title'>Pokedex</h1>
      <div className='Pokedex'>
        {pokemon.map(p => (
          <Pokecard key={p.id} id={p.id} name={p.name} type={p.type} base_experience={p.base_experience} />
        ))}
      </div>
    </>
  );
}

export default Pokedex;
