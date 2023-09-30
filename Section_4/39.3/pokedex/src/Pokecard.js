import './Pokecard.css';

const Pokecard = ({id, name, type, base_experience}) => {
  return (
    <div id={`Pokecard-${id}`} className='Pokecard'>
      <h4 className='Pokecard-name'>{name}</h4>
      <img className='Pokecard-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt='Pokemon character'/>
      <p className='Pokecard-type'>Type: {type}</p>
      <p className='Pokecard-exp'>EXP: {base_experience}</p>
    </div>
  );
}

export default Pokecard;
