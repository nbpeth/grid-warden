import { createContext, useContext, useState } from "react";

const MatrixContext = createContext();

const generateEmptyMatrix = (gridSize) => {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
};

export const MatrixProvider = ({ children }) => {
  const [gridSize, _] = useState(8);
  const [matrices, setMatrices] = useState([generateEmptyMatrix(gridSize)]);
  const [focusedMatrixIndex, setFocusedMatrixIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const focusedMatrix = matrices?.[focusedMatrixIndex];

  const animate = async () => {
    setFocusedMatrixIndex(0);
    setIsAnimating(true);
    for (let i = 0; i < matrices.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setFocusedMatrixIndex(i);
          resolve();
        }, 50);
      });
    }
    setIsAnimating(false);
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
    const beforeCoordinateValue = updatedFocusedMatrix[y][x];
    updatedFocusedMatrix[y][x] = beforeCoordinateValue === 0 ? colorId : 0;
    updatedMatrices[focusedMatrixIndex] = updatedFocusedMatrix;

    setMatrices(updatedMatrices);
  };

  const pushNewMatrix = () => {
    setMatrices((prev) => {
      return [...prev, generateEmptyMatrix(gridSize)];
    });
    setFocusedMatrixIndex(matrices.length);
  };

  const pushNewMatrixAt = (index) => {
    const updatedMatrices = [...matrices];
    const matrixAtIndex = updatedMatrices[index];
    if (!matrixAtIndex) {
      return;
    }
    const nextIndex = index + 1;
    updatedMatrices.splice(nextIndex, 0, generateEmptyMatrix(gridSize));

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(nextIndex);
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

  const deleteMatrixAt = (index) => {
    const matrixAtIndex = matrices[index];
    if (!matrixAtIndex) {
      return;
    }

    const updatedMatrices = [...matrices];
    updatedMatrices.splice(index, 1);

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(index > 0 ? index - 1 : 0);
  };

  const copyMatrixAt = (index) => {
    const updatedMatrices = [...matrices];
    const matrixAtIndex = updatedMatrices[index];
    if (!matrixAtIndex) {
      return;
    }
    const deepCopy = matrixAtIndex.map((m) => m.slice())?.slice();
    updatedMatrices.splice(index, 0, deepCopy);

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(index + 1);
  };

  return (
    <MatrixContext.Provider
      value={{
        animate,
        isAnimating,
        copyMatrixAt,
        deleteMatrixAt,
        gridSize,
        focusedMatrixIndex,
        getFocusedMatrix,
        getMatrixAtPosition,
        focusedMatrix,
        handleMatrixFocusChange,
        matrices,
        handleCellClick,
        pushNewMatrix,
        pushNewMatrixAt,
        resetMatrix,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrixProvider = () => useContext(MatrixContext);
