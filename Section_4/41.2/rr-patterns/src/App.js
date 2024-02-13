import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import dogs from './dogsData';
import DogList from './DogList';
import DogDetails from './DogDetails';

const router = createBrowserRouter([
  {
    element: <DogList dogs={dogs} />,
    path: '/dogs'
  },
  {
    element: <DogDetails />,
    path: '/dogs/:name',
    loader: ({ params }) => {
      const dog = dogs.find(dog => dog.src === params.name);
      return dog || null;
    }
  },
  {
    path: "*",
    element: <Navigate to='/dogs' />
  }
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
