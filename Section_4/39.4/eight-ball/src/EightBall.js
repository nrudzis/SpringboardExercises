import { useState } from 'react';
import './EightBall.css';

let eightBallColor = 'black';

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const EightBall = ({ answers }) => {
  const [message, setMessage] = useState('Think of a Question');

  const changeBall = () => {
    const idx = randIndex(answers);
    setMessage(answers[idx].msg);
    eightBallColor = answers[idx].color;
  }

  return (
    <div className={`EightBall ${eightBallColor}`}>
      <div className='EightBall-msg' onClick={() => changeBall()}>
        { message }
      </div>
    </div>
  );
}

export default EightBall;
