import { createContext, useContext, useState } from "react";

const MatrixContext = createContext();

const generateEmptyMatrix = (gridSize) => {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
};

export const MatrixProvider = ({ children }) => {
  const [gridSize, _] = useState(8);

  const [matrices, setMatrices] = useState({id: undefined, data: [generateEmptyMatrix(gridSize)]});

  const [focusedMatrixIndex, setFocusedMatrixIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const focusedMatrix = matrices?.data?.[focusedMatrixIndex];

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

  const setMatricesProperties = ({id, projectName, username}) => {
    setMatrices((prev) => {
      return {...prev, id, projectName, username}
    })
  }

  const loadMatrices = (loadedMatrics) => {
    if(!loadedMatrics || !loadedMatrics.data) {
      return;
    }
    setMatrices(loadedMatrics);
  }

  const swapMatrixPositions = (i, n) => {
    const source = matrices?.data?.[i];
    const destination = matrices?.data?.[n];

    const tempMatrix = {...matrices, data: [...matrices.data]}
    const tempData = tempMatrix?.data;
    tempData[i] = destination;
    tempData[n] = source;

    setMatrices(tempMatrix);
  };

  const resetMatrix = () => {
    const focusedMatrix = getFocusedMatrix();
    if (!focusedMatrix) {
      return;
    }
    const updatedMatrices = {...matrices, data: [...matrices.data]};
    const updatedMetricesData = updatedMatrices?.data;
    const updatedFocusedMatrix = generateEmptyMatrix(gridSize);

    updatedMetricesData[focusedMatrixIndex] = updatedFocusedMatrix;

    setMatrices(updatedMatrices);
  };

  const handleCellClick = (x, y, colorId) => {
    const focusedMatrix = getFocusedMatrix();

    if (!focusedMatrix) {
      return;
    }
    const updatedMatrices = {...matrices, data: [
      ...matrices.data
    ]};

    const updatedFocusedMatrix = [...focusedMatrix];
    const beforeCoordinateValue = updatedFocusedMatrix[y][x];

    updatedFocusedMatrix[y][x] = beforeCoordinateValue === 0 ? colorId : 0;
    const updatedData = updatedMatrices?.data;
    updatedData[focusedMatrixIndex] = updatedFocusedMatrix;

    setMatrices(updatedMatrices);
  };

  const pushNewMatrixAt = (index) => {
    const updatedMatrices = {...matrices, data: [...matrices.data]};
    const matrixAtIndex = updatedMatrices?.data?.[index];

    if (!matrixAtIndex) {
      return;
    }

    const nextIndex = index + 1;
    updatedMatrices?.data?.splice(nextIndex, 0, generateEmptyMatrix(gridSize));

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(nextIndex);
  };

  const handleMatrixFocusChange = (i) => {
    setFocusedMatrixIndex(i);
  };

  const getFocusedMatrix = () => {
    return matrices?.data?.[focusedMatrixIndex];
  };

  const getMatrixAtPosition = (i) => {
    return matrices?.data?.[i];
  };

  const deleteMatrixAt = (index) => {
    const updatedMatrices = {...matrices, data: [...matrices.data]};
    const matrixAtIndex = updatedMatrices?.data?.[index];
    if (!matrixAtIndex) {
      return;
    }
    updatedMatrices?.data?.splice(index, 1);

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(index > 0 ? index - 1 : 0);
  };

  const copyMatrixAt = (index) => {
    const updatedMatrices = {...matrices, data: [...matrices.data]};
    const matrixAtIndex = updatedMatrices?.data?.[index];
    if (!matrixAtIndex) {
      return;
    }

    const deepCopy = matrixAtIndex?.map((m) => m.slice())?.slice(); 
    updatedMatrices?.data?.splice(index, 0, deepCopy);

    setMatrices(updatedMatrices);
    setFocusedMatrixIndex(index + 1);
  };

  return (
    <MatrixContext.Provider
      value={{
        animate,
        loadMatrices,
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
        pushNewMatrixAt,
        resetMatrix,
        swapMatrixPositions,
        setMatricesProperties
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrixProvider = () => useContext(MatrixContext);
