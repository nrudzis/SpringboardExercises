import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ snacks }) => {
  return (
    <nav className='Navbar'>
      {snacks.map((snack, index) => (
        <NavLink
          key={index}
          to={`/${snack}`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          {snack.charAt(0).toUpperCase() + snack.slice(1)}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
