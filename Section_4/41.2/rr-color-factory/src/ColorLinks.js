const ColorLinks = ({ colors }) => {
  return (
    <>
      <h2>Welcome to the Color Factory.</h2>
      <h1>Add a color</h1>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>
          {color.text}
          {/*<Link to={`/colors/${color.src}`}>{color.text}</Link>*/}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColorLinks;
