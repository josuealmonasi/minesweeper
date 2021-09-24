import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Cell = ({ children, onUncoverCell, pos }) => {
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

  const [state, setState] = useState(<></>);

  useEffect(() => {
    setState(children);
  }, [children]);

  const handleClick = (c) => {
    console.log(children);
    onUncoverCell(pos);
    setState(c === true ? <FontAwesomeIcon icon={faBomb} /> : children);
    setstyle({ ...style, background: '#b9d8ff' });
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
