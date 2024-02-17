import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ColorLinks from './ColorLinks';
import ColorPage from './ColorPage';
import colors from './colorData';

const router = createBrowserRouter([
  {
    element: <ColorLinks colors={colors} />,
    path: '/colors'
  },
  {
    element: <ColorPage />,
    path: '/colors/:color',
    loader: ({ params }) => {
      const color = colors.find(color => color.text === params.color);
      return color || null;
    }
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
