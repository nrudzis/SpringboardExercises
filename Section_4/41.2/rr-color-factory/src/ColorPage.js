import { useLoaderData, Navigate } from 'react-router-dom';

const ColorPage = () => {

  const color = useLoaderData();

  return color
    ? (
      <h1 style={{ color: `${color.hexCode}` }}>Color</h1>
    )
    : (
      <Navigate to='/colors' />
    );
};

export default ColorPage;
