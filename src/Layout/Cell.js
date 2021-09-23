import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';

const style = {
  border: 'solid 1px grey',
  borderRadius: '5px',
  height: '40px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
};

const Cell = ({ children }) => {
  return <div style={style}>{children === '*' ? <FontAwesomeIcon icon={faBomb} /> : 'vacio'}</div>;
};

export default Cell;
