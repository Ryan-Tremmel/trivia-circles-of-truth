import Form from './Form';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoginUserMutation } from '../store';

export default function Rules({ setShowRules }) {
  // State Management //
  const [loginUser, { isSuccess }] = useLoginUserMutation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginText, setLoginText] = useState(
    'Do you have a highscore already saved? Log in!'
  );
  const [submitText, setSubmitText] = useState('Log in!'); // Passed in to Form for form component reusablity

  const currentUsername = useSelector(
    state => state.currentUser?.username ?? null
  );

  // Functionality //
  useEffect(() => {
    // If login successful, changes loginText
    if (isSuccess) {
      setLoggedIn(true);
      setLoginText('Successfully logged in!');
      setTimeout(() => {
        setLoginText(`Welcome, ${currentUsername}`);
      }, 1500);
    }
  }, [currentUsername]);

  const handleLoginSubmit = async (username, password) => {
    try {
      await loginUser({ username, password }).unwrap();
    } catch (err) {
      console.log(err);
      if (err.status === 'FETCH_ERROR') {
        setLoginText(
          'Could not contact server - please try again later to log in.'
        );
        setTimeout(() => {
          setLoginText('Do you have a highscore already saved? Log in!');
        }, 5000);
      } else {
        // If login is not successful, shows error text to user
        setLoginText(err.data.message);
        setTimeout(() => {
          setLoginText('Do you have a highscore already saved? Log in!');
        }, 3000);
      }
    }
  };

  return (
    <div className="rules__container">
      <h3 className="text-general">Rules</h3>
      <p className="rules__text text--general mb-2">
        Thank you for playing my trivia game! The rules are pretty simple.
        Questions will be randomly generated starting off easy. The more you
        progress, the harder they will get. You have three (3) lives, designated
        by three X's at the top of the screen. If you answer correctly, you gain
        money! If you answer incorrectly, you lose a life. You can buy a life,
        but it'll cost you some of your current score. You'll have a chance to
        save your highscore at the end, or if you've already saved, you can sign
        in. Good luck and see how far you can get!
      </p>
      <Button
        buttonClass={'btn btn--long btn--primary mb-3'}
        textClass={'answer__text'}
        onClick={() => setShowRules(false)}
        isClickable={true}
      >
        Got it!
      </Button>
      <h3 className="text-general">{loginText}</h3>

      {!loggedIn ? (
        <Form
          submitType={'login'}
          submitText={submitText}
          loggedIn={loggedIn}
          handleLoginSubmit={handleLoginSubmit}
        />
      ) : (
        ''
      )}
    </div>
  );
}
