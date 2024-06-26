import { useSelector } from 'react-redux';

export default function Highscore() {
  const highscore = useSelector(state => state.currentUser?.highscore);

  return (
    <p className="highscore highscore__text">
      Highscore: $
      <span className="score__amount">{highscore.toLocaleString()}</span>
    </p>
  );
}
