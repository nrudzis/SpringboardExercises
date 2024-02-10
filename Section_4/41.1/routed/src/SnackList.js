import { Link } from 'react-router-dom';

const SnackList = ({ snacks }) => {
  return (
      <ul>
        {snacks.map((snack, index) => (
          <li key={index}>
            <Link to={`/${snack}`}>{snack.charAt(0).toUpperCase() + snack.slice(1)}</Link>
          </li>
        ))}
      </ul>
  );
};

export default SnackList;
