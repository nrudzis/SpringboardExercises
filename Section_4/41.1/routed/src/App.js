import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VendingMachine from './VendingMachine';

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

function App() {
  return <RouterProvider router={router} />
}

function Root() {
  return (
    <div className="App">
      <VendingMachine />
    </div>
  );
}

export default App;
