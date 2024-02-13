import { useParams, Navigate } from 'react-router-dom';

const DogDetails = ({ dogs }) => {

  const { name } = useParams();

  const dog = dogs.find(dog => dog.src === name);

  if (dog) {
    return (
      <>
        <h1>Dog Details</h1>
        <p>
          <span style={{ fontWeight: 'bold' }}>Name: </span>
          {dog.name}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Age: </span>
          {dog.age}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Facts:</span>
        </p>
        {dog.facts.map((fact, index) => (
          <p key={index}>{fact}</p>
        ))}
      </>
    );
  } else {
    return (<Navigate to='/dogs' />);
  }
};

export default DogDetails;
