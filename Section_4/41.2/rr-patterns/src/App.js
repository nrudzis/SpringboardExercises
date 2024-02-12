import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import dogsData from './dogsData';
import Nav from './Nav';

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


function App() {
  return <RouterProvider router={router} />
}

function Root({ dogs=dogsData }) {
  return (
    <div className="App">
      <Nav dogs={dogs} />
    </div>
  );
}

export default App;
