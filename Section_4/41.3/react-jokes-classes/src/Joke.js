import React from 'react';
import "./Joke.css";

class Joke extends React.Component {
  render() {
    const { text, id, votes, vote } = this.props;

    const upVote = () => vote(id, +1);
    const downVote = () => vote(id, -1);

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={downVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  }
}

export default Joke;
