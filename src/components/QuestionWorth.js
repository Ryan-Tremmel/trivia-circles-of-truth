import { useSelector } from 'react-redux';

export default function QuestionWorth() {
  const { scoreMultiplier } = useSelector(state => {
    return state.score;
  });

  const questionDifficulty = useSelector(state => {
    return state.questionDifficulty;
  });

  const capitalizedQuestionDifficulty =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);

  return (
    <p className="questionWorth text--general">
      The following question is worth $
      <span className="question--underlined">{scoreMultiplier * 100}</span>!
      Difficulty: {capitalizedQuestionDifficulty}
    </p>
  );
}
