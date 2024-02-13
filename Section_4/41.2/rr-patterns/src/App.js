import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import dogData from './dogsData';
import DogList from './DogList';
import DogDetails from './DogDetails';

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

function App() {
  return <RouterProvider router={router} />
};

function Root({ dogs=dogData }) {
  return (
    <div className="App">
      <Routes>
        <Route path='/dogs' element={<DogList dogs={dogs} />} />
        <Route path='/dogs/:name' element={<DogDetails dogs={dogs} />} />
        <Route path='*' element={<Navigate to='/dogs' />} />
      </Routes>
    </div>
  );
};

export default App;
