import { useState } from "react";

export const useMatrix = () => {
  const [gridSize, setGridSize] = useState(8);
  const [replicaGrid, setReplicaGrid] = useState(
    Array.from({ length: 8 }, () => Array(8).fill(0))
  );

  const handleCellClick = (x, y, colorId) => {
    // console.log(x,y,color);
    setReplicaGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[y][x] = colorId;

      return newGrid;
    });
  };

  return {
    gridSize,
    handleCellClick,
    replicaGrid,
  };
};
