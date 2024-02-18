import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ColorLinks from './ColorLinks';
import ColorAddForm from './ColorAddForm';
import ColorPage from './ColorPage';
import colors from './colorData';
import useLocalStorageState from './hooks/useLocalStorageState';

const App = () => {

  const [colorData, setColorData] = useLocalStorageState('colors', colors);
  const router = createBrowserRouter([
    {
      element: <ColorLinks colors={colorData} />,
      path: '/colors'
    },
    {
      element: <ColorAddForm colorData={colorData} setColorData={setColorData} />,
      path: '/colors/new'
    },
    {
      element: <ColorPage />,
      path: '/colors/:color',
      loader: ({ params }) => {
        const color = colorData.find(color => color.text === params.color);
        return color || null;
      }
    },
    {
      path: "*",
      element: <Navigate to='/colors' />
    }
  ]);

  return (
  <div className="App">
    <RouterProvider router={router} />
  </div>
  );
}

export default App;
