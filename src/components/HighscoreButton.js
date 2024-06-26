import Button from './Button';

export default function HighscoreButton({
  handleHighscoreClick,
  buttonText,
  isClickable,
}) {
  return (
    <Button
      buttonClass={`btn btn--long ${
        isClickable ? 'btn--primary' : 'btn--disabled'
      }`}
      textClass={'loseGame__btn__text'}
      onClick={handleHighscoreClick}
      isClickable={isClickable}
    >
      {buttonText}
    </Button>
  );
}
