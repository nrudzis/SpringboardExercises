import React from 'react';
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numJokesToGet: this.props.numJokesToGet || 10,
      jokes: [],
    };
    this.setJokes = this.setJokes.bind(this);
    this.getJokesAndUpdate = this.getJokesAndUpdate.bind(this);
    this.vote = this.vote.bind(this);
  }

  setJokes(jokes) {
    this.setState({ jokes: jokes });
  }

  /* get jokes if there are no jokes */

  getJokesAndUpdate() {
    const getJokes = async () => {
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.state.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setJokes(j);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.state.jokes.length === 0) getJokes();
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setJokes([]);
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    let allJokes = this.state.jokes;
    this.setJokes(allJokes.map(j => (
      j.id === id ? { ...j, votes: j.votes + delta } : j
    )));
  }

  /* get jokes and update state when component mounts or updates */

  componentDidMount() {
    this.getJokesAndUpdate();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.numJokesToGet !== prevState.numJokesToGet || this.state.jokes !== prevState.jokes) {
      this.getJokesAndUpdate();
    }
  }

  /* render: either loading spinner or list of sorted jokes. */

  render() {
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={() => this.generateNewJokes()}>
            Get New Jokes
          </button>

          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }
    return null;
  }
}

export default JokeList;
