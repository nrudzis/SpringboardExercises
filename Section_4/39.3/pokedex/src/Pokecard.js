const Pokecard = ({id, name, type, base_experience}) => {
  return (
    <div>
      <h4>{name}</h4>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt='Pokemon character'/>
      <p>Type: {type}</p>
      <p>EXP: {base_experience}</p>
    </div>
  );
}

export default Pokecard;
