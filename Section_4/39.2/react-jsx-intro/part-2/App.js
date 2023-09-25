const App = () => (
  <div>
    <Tweet username="firstuser" name="NameOne" date="Tuesday, Aug 1, 2034 8:45 AM" message="Here is the first user tweet." />
    <Tweet username="seconduser" name="NameTwo" date="Monday, Jan 23, 1974 2:12 AM" message="Here is the second user tweet." />
    <Tweet username="thirduser" name="NameThree" date="Friday, Oct 16, 2012 5:54 PM" message="Here is the third user tweet." />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
