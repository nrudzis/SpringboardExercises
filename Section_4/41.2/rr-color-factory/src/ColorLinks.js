import { Link } from 'react-router-dom';

const ColorLinks = ({ colors }) => {
  return (
    <>
      <h2>Welcome to the Color Factory.</h2>
      <h1>
        <Link to={'/colors/new'}>Add a color</Link>
      </h1>
      <ul>
        {colors.map((color, index) => (
          <li key={index} style={{ listStyle: 'none' }}>
            <Link to={`/colors/${color.text}`}>{color.text}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColorLinks;
