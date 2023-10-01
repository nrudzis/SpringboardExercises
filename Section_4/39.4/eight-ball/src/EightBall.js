import defaultAnswers from './answers';

const EightBall = ({answers = defaultAnswers}) => {
    {answers.map(a => console.log(a.msg))};
}

export default EightBall;
