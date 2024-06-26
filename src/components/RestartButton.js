import Button from './Button';

export default function RestartButton({ isClickable, handleClickRestart }) {
  return (
    <Button
      onClick={handleClickRestart}
      buttonClass={'btn btn--long btn--primary'}
      textClass={'loseGame__btn__text'}
      isClickable={isClickable}
    >
      Restart Game
    </Button>
  );
}
