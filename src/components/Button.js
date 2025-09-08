import './Button.css';

export default function Button({
  children,
  buttonClass,
  classOnAnswer,
  textClass,
  isClickable,
  ...rest
}) {
  return (
    <button className={buttonClass} {...rest} disabled={!isClickable}>
      <p className={textClass}>{children}</p>
    </button>
  );
}
