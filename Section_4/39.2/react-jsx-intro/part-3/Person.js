const Person = ({name, age, hobbies}) => (
  <div>
    <p>Learn some information about this person.</p>
    <ul>
      <li>Name: {name.substring(0,8)}</li>
      <li>Age: {age}</li>
      <li> Hobbies:
        <ul>
          {hobbies.map(h => <li>{h}</li>)}
        </ul>
      </li>
    </ul>
    <h3>{age >= 18 ? "please go vote!" : "you must be 18"}</h3>
  </div>
);
