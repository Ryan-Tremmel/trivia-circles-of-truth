import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TbSquareX } from 'react-icons/tb';
import { TbSquareXFilled } from 'react-icons/tb';

export default function AmountIncorrect() {
  // State Management //
  const lives = useSelector(state => {
    return state.lives;
  });

  const [renderedIncorrect, setRenderedIncorrect] = useState(null);

  // Functionality //
  useEffect(() => {
    const indexes = [2, 1, 0];

    /* Maps through the indexes (lives, but 0 based), and if the lives are greater than the index, it returns the default icon for no lives taken,
       else the icon will be replaced corresponding with how many lives are left */
    setRenderedIncorrect(
      indexes.map(index => {
        if (index !== lives && index <= lives) return <TbSquareX key={index} />;
        else
          return (
            <TbSquareXFilled
              key={index}
              className="amountIncorrect--incorrect"
            />
          );
      })
    );
  }, [lives]);

  return <div className="amountIncorrect">{renderedIncorrect}</div>;
}
