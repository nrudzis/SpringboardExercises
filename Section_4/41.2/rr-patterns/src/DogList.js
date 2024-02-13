import { Link } from 'react-router-dom';

const DogList = ({ dogs }) => {
  return (
    <>
      <h1>Dog List</h1>
      <ul>
        {dogs.map((dog, index) => (
          <li key={index}>
            <Link to={`/dogs/${dog.src}`}>{dog.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DogList;
