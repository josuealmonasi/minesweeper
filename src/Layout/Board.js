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
          temp[randCol][randRow] = true;
          setGrid(temp);
          count += 1;
        }
      }
    },
    [grid]
  );

  const handleUncoverCell = (pos) => {
    if (grid[pos[0]][pos[1]] !== true) {
      let countBombs = 0;
      /* Checks above */
      if (grid[pos[0] - 1]?.[pos[1]] === true) {
        countBombs += 1;
      }
      /* Checks below */
      if (grid[pos[0] + 1]?.[pos[1]] === true) {
        countBombs += 1;
      }
      /* Checks left */
      if (grid[pos[0]]?.[pos[1] - 1] === true) {
        countBombs += 1;
      }
      /* Checks right */
      if (grid[pos[0]]?.[pos[1] + 1] === true) {
        countBombs += 1;
      }
      /* Checks above-left */
      if (grid[pos[0] - 1]?.[pos[1] - 1] === true) {
        countBombs += 1;
      }
      /* Checks below-left */
      if (grid[pos[0] + 1]?.[pos[1] - 1] === true) {
        countBombs += 1;
      }
      /* Checks above-right */
      if (grid[pos[0] - 1]?.[pos[1] + 1] === true) {
        countBombs += 1;
      }
      /* Checks below-right */
      if (grid[pos[0] + 1]?.[pos[1] + 1] === true) {
        countBombs += 1;
      }
      if (countBombs === 0) {
        return;
      }
      const temp = [...grid];
      temp[pos[0]][pos[1]] = countBombs;
      setGrid(temp);
    }
  };

  useEffect(() => {
    placeMines(cols, rows, mines);
  }, [cols, mines, rows]);

  return (
    <div style={style}>
      {grid.map((c, x) =>
        c.map((r, y) => (
          <Cell key={`${x}${y}`} pos={[x, y]} onUncoverCell={handleUncoverCell}>
            {r}
          </Cell>
        ))
      )}
    </div>
  );
};

export default Board;
