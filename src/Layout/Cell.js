import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Cell = ({ children }) => {
  const [style, setstyle] = useState({
    border: 'solid 1px grey',
    borderRadius: '5px',
    height: '40px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  });

  const [state, setState] = useState(null);

  useEffect(() => {
    setState(null);
  }, [children]);

  const handleClick = (c) => {
    console.log(children);
    setState(c === true ? <FontAwesomeIcon icon={faBomb} /> : children);
    setstyle({
      ...style,
      background: children >= 2 ? '#ff6b8b' : children === 1 ? '#ffc5d2' : '#b9d8ff'
    });
    if (children === true) {
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
