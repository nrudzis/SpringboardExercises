import { Link } from 'react-router-dom';

const Snack = ({ snackType }) => {
  return (
    <>
      <p>Clunk! Thunk! Whirr! Crinkle! THUD! There's your {snackType}.</p>
      <Link exact to='/'>Back to Snack List</Link>
    </>
  );
};

export default Snack;
