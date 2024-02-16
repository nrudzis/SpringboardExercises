import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ColorLinks from './ColorLinks';
import colors from './colorData';

const router = createBrowserRouter([
  {
    element: <ColorLinks colors={colors} />,
    path: '/colors'
  },
  {
    path: "*",
    element: <Navigate to='/colors' />
  }
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
