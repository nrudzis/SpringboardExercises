import { Routes, Route } from 'react-router-dom';
import SnackList from './SnackList';
import Snack from './Snack';

const VendingMachine = () => {

  const snacks = ['chips', 'pretzels', 'nuts', 'popcorn', 'crackers', 'cookies', 'jerky', 'gum', 'fruit', 'cheese', 'granola', 'soda', 'juice', 'water'];

  return (
    <>
      <h1>IT IS I, VENDING MACHINE</h1>
      <Routes>
        <Route key={0} exact path={'/'} element={<SnackList snacks={snacks} />} />
        {snacks.map((snack, index) => (
          <Route key={index + 1} exact path={`/${snack}`} element={<Snack snackType={snack} />} />
        ))}
      </Routes>
    </>
  );
};

export default VendingMachine;
