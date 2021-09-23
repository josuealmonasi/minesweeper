import React, { useCallback, useEffect, useState } from 'react';
import Cell from './Cell';

const Board = ({ cols, rows, mines }) => {
  const style = {
    width: 'max-content',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`
  };

  const createGrid = (cols, rows) =>
    Array(cols)
      .fill(null)
      .map(() => Array(rows).fill(false));

  const [grid, setGrid] = useState(createGrid(cols, rows));

  const placeMines = useCallback(
    (cols, rows, mines) => {
      let count = 0;
      while (mines > count) {
        let randCol = Math.floor(Math.random() * cols);
        let randRow = Math.floor(Math.random() * rows);
        if (!grid[randCol][randRow]) {
          const temp = [...grid];
          temp[randCol][randRow] = '*';
          console.log('object');
          setGrid(temp);
          count += 1;
        }
      }
      console.table(grid);
    },
    [grid]
  );

  useEffect(() => {
    placeMines(cols, rows, mines);
  }, [cols, mines, rows]);

  return (
    <div style={style}>
      {grid.map((c) =>
        React.Children.toArray(c.map((r) => React.Children.toArray(<Cell>{r}</Cell>)))
      )}
    </div>
  );
};

export default Board;
