const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent name="TestName" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
