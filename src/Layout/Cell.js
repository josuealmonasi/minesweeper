import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Cell = ({ children }) => {
  const [style, setstyle] = useState({
    height: '40px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    background: '#dadada',
    margin: '1px'
  });

  const [state, setState] = useState(null);

  const handleClick = (c) => {
    console.log(c);
    setState(c.bomb ? <FontAwesomeIcon icon={faBomb} /> : c.hint !== 0 ? c.hint : null);
    setstyle({
      ...style,
      background: c.hint >= 2 ? '#ff6b8b' : c.hint === 1 ? '#ffc5d2' : '#b9d8ff'
    });
    if (c.bomb) {
      setstyle({ ...style, background: 'red' });
    }
  };

  return (
    <div style={style} onClick={() => handleClick(children)}>
      {state}
    </div>
  );
};

export default Cell;
