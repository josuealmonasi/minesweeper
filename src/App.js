import './App.css';
import Board from './Layout/Board';

function App() {
  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <Board cols={10} rows={10} mines={10} />
    </div>
  );
}

export default App;
