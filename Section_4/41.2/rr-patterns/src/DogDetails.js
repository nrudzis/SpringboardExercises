import { useLoaderData, Navigate } from 'react-router-dom';

const DogDetails = () => {

  const dog = useLoaderData();

  if (dog) {
    console.log(dog)
    return (
      <>
        <h1>Dog Details</h1>
        <img src={dog.img} alt={dog.name} style={{ width: 300 }} />
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
    return (
      <Navigate to='/dogs' />
    );
  }
};

export default DogDetails;
