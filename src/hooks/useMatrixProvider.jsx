import { createContext, useContext, useState } from "react";

const MatrixContext = createContext();

const generateEmptyMatrix = (gridSize) => {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
};

export const MatrixProvider = ({ children }) => {
  const [gridSize, _] = useState(8);
  const [matrices, setMatrices] = useState([generateEmptyMatrix(gridSize)]);
  const [focusedMatrixIndex, setFocusedMatrixIndex] = useState(0);
  const focusedMatrix = matrices?.[focusedMatrixIndex];

  const resetMatrix = () => {
    const focusedMatrix = getFocusedMatrix();
    if (!focusedMatrix) {
      return;
    }
    const updatedMatrices = [...matrices];
    const updatedFocusedMatrix = generateEmptyMatrix(gridSize);
    updatedMatrices[focusedMatrixIndex] = updatedFocusedMatrix;

    setMatrices(updatedMatrices);
  };

  const handleCellClick = (x, y, colorId) => {
    const focusedMatrix = getFocusedMatrix();
    if (!focusedMatrix) {
      return;
    }
    const updatedMatrices = [...matrices];

    const updatedFocusedMatrix = [...focusedMatrix];
    updatedFocusedMatrix[y][x] = colorId;
    updatedMatrices[focusedMatrixIndex] = updatedFocusedMatrix;

    setMatrices(updatedMatrices);
  };

  const pushNewMatrix = () => {
    setMatrices((prev) => {
      return [...prev, generateEmptyMatrix(gridSize)];
    });
  };

  const handleMatrixFocusChange = (i) => {
    setFocusedMatrixIndex(i);
  };

  const getFocusedMatrix = () => {
    return matrices?.[focusedMatrixIndex];
  };

  return (
    <MatrixContext.Provider
      value={{
        gridSize,
        focusedMatrixIndex,
        getFocusedMatrix,
        focusedMatrix,

        handleMatrixFocusChange,
        matrices,
        handleCellClick,
        pushNewMatrix,

        resetMatrix,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrixProvider = () => useContext(MatrixContext);
