import { useState } from 'react';
import './EightBall.css';

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const EightBall = ({ answers }) => {
  const [message, setMessage] = useState('Think of a Question');
  const randAnswer = answers[randIndex(answers)].msg;
  return (
    <div className='EightBall'>
      <div className='EightBall-msg' onClick={() => setMessage(randAnswer)}>
        { message }
      </div>
    </div>
  );
}

export default EightBall;
