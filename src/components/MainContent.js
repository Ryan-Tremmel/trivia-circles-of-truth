import { useState } from 'react';
import { useSelector } from 'react-redux';

import AmountIncorrect from './AmountIncorrect';
import TriviaContainer from './TriviaContainer';
import Score from './Score';
import Highscore from './Highscore';

export default function MainContent() {
  const currentUser = useSelector(state => state.currentUser?.username);
  const [questionIndex, setQuestionIndex] = useState(0); // Placed here in case triviaContainer is re-rendered or needed in other component

  return (
    <div className="mainContent">
      <AmountIncorrect />
      <TriviaContainer
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
      />
      <div className="scoreContainer">
        <Score
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
        {!currentUser ? '' : <Highscore />}
      </div>
    </div>
  );
}
