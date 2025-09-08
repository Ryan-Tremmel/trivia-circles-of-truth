import Answer from './Answer';
import './AnswersContainer.css';

export default function AnswersContainer({ currentQuestion, isClickable }) {
  // Maps through the currentQuestion object's answers array (containing all the answers to that particular question)
  const renderedAnswers = currentQuestion.answers.map((answer, i) => {
    if (answer === currentQuestion.correctAnswer) {
      return (
        <Answer
          key={i}
          children={answer}
          currentQuestion={currentQuestion}
          isCorrectAnswer={'btn--correct'}
          isClickable={isClickable}
        />
      );
    } else {
      return (
        <Answer
          key={i}
          children={answer}
          currentQuestion={currentQuestion}
          isCorrectAnswer={'btn--incorrect'}
          isClickable={isClickable}
        />
      );
    }
  });

  return <div className="answersContainer">{renderedAnswers}</div>;
}
