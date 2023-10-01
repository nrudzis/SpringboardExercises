import { useState } from 'react';

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const EightBall = ({ answers }) => {
  const [message, setMessage] = useState("Think of a Question");
  const randAnswer = answers[randIndex(answers)].msg;
  return (
    <div onClick={() => setMessage(randAnswer)}>
      { message }
    </div>
  );
}

export default EightBall;
