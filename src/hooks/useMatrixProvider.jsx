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

  const animate = async () => {
    setFocusedMatrixIndex(0);
    for(let i=0; i<matrices.length; i++) {
        await new Promise((resolve) => {
            setTimeout(() => {
                setFocusedMatrixIndex(i)
                resolve()
            }, 250)
        })
    }
  };

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
    setFocusedMatrixIndex(matrices.length);
  };

  const handleMatrixFocusChange = (i) => {
    setFocusedMatrixIndex(i);
  };

  const getFocusedMatrix = () => {
    return matrices?.[focusedMatrixIndex];
  };

  const getMatrixAtPosition = (i) => {
    return matrices?.[i];
  };

  return (
    <MatrixContext.Provider
      value={{
        animate,
        gridSize,
        focusedMatrixIndex,
        getFocusedMatrix,
        getMatrixAtPosition,
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
