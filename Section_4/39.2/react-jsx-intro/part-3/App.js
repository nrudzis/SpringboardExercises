const App = () => {

  const firstPersonHobbies = ["Scuba diving", "Rock climbing", "Tuba"];
  const secondPersonHobbies = ["Chess", "Classic films", "History"];
  const thirdPersonHobbies = ["Extreme ironing", "Yodeling"];

  return (
    <div>
      <Person name="Jason" age="16" hobbies={firstPersonHobbies}/>
      <Person name="Stephanie" age="55" hobbies={secondPersonHobbies}/>
      <Person name="Quixote" age="37" hobbies={thirdPersonHobbies}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
