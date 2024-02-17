const ColorAddForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}> 
      <label for="colorText">Color Name</label>
      <input
        type="text"
        id="colorText"
        name="colorText"
        placeholder="Enter a name for the color"
      />
      <label for="colorHexCode">Color Value</label>
      <input type="color" value="#ffffff" />
      <button>Add color</button>
    </form>
  );
}

export default ColorAddForm;
