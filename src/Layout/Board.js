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
      .map(() => Array(rows).fill({ ...{ bomb: false, hint: 0 } }));

  const [grid, setGrid] = useState(createGrid(cols, rows));

  const placeMines = useCallback(
    (cols, rows, mines) => {
      let count = 0;
      while (mines > count) {
        let randCol = Math.floor(Math.random() * cols);
        let randRow = Math.floor(Math.random() * rows);
        if (!grid[randCol][randRow].bomb) {
          let temp = [...grid];
          temp[randCol][randRow] = { bomb: true, hint: 0 };
          setGrid(temp);
          count += 1;
        }
      }
    },
    [grid]
  );

  const placeHints = (x, y) => {
    const xy = { x, y };
    let temp = [...grid];
    let countBombs = 0;

    if (!grid[x][y].bomb) {
      /* Checks above */
      if (grid[x - 1]?.[y]?.bomb) {
        countBombs += 1;
      }
      /* Checks below */
      if (grid[x + 1]?.[y]?.bomb) {
        countBombs += 1;
      }
      /* Checks left */
      if (grid[x]?.[y - 1]?.bomb) {
        countBombs += 1;
      }
      /* Checks right */
      if (grid[x]?.[y + 1]?.bomb) {
        countBombs += 1;
      }
      /* Checks above-left */
      if (grid[x - 1]?.[y - 1]?.bomb) {
        countBombs += 1;
      }
      /* Checks below-left */
      if (grid[x + 1]?.[y - 1]?.bomb) {
        countBombs += 1;
      }
      /* Checks above-right */
      if (grid[x - 1]?.[y + 1]?.bomb) {
        countBombs += 1;
      }
      /* Checks below-right */
      if (grid[x + 1]?.[y + 1]?.bomb) {
        countBombs += 1;
      }
      if (countBombs === 0) {
        return;
      }
    }
    temp[x][y] = { bomb: grid[x][y].bomb, hint: countBombs, clicked: false, ...xy };
    setGrid(temp);
  };

  useEffect(() => {
    placeMines(cols, rows, mines);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        placeHints(i, j);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, mines, rows]);

  return (
    <div style={style}>
      {grid.map((c, x) => c.map((r, y) => <Cell key={`${x}${y}`}>{r}</Cell>))}
    </div>
  );
};

export default Board;
