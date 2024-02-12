import { Link } from 'react-router-dom';

const Nav = ({ dogs }) => {
  return ( 
    <ul>
      {dogs.map((dog, index) => (
        <li key={index}>
          <Link to={`/dogs/${dog.src}`}>{dog.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
