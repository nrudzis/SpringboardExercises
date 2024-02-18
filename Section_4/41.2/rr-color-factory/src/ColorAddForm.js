import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ColorAddForm = ({ colorData, setColorData }) => {

  const [formData, setFormData] = useState({
    text: '',
    hexCode: '#000000'
  });

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setColorData([
      formData,
      ...colorData
    ]);
    navigate('/colors');
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="colorText">Color Name </label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="Enter a name for the color"
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="colorHexCode">Color Value </label>
        <input
          type="color"
          id="hexCode"
          name="hexCode"
          value={formData.hexCode}
          onChange={handleChange}
        />
      </p>
      <button type="submit">Add color</button>
    </form >
  );
}

export default ColorAddForm;
