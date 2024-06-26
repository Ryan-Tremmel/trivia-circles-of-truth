import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './Header';
import Rules from './Rules';
import MainContent from './MainContent';
import Copyright from './Copyright';

export default function App() {
  const currentUser = useSelector(state => state.currentUser?.username);

  const [message, setMessage] = useState(''); // Unused - for server testing only
  const [showRules, setShowRules] = useState(true);

  return (
    <div className="app">
      <Header />
      {showRules ? <Rules setShowRules={setShowRules} /> : <MainContent />}
      <div className="copyrightLoginContainer">
        <Copyright />
        {!currentUser ? (
          ''
        ) : (
          <p className="loginUsername">Playing as {currentUser}</p>
        )}
      </div>
    </div>
  );
}
