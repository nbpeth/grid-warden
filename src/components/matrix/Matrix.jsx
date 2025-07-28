import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Cell } from "../cell/Cell";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import { useColorSelector } from "../../hooks/useColorSelector";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "0" }}>
      {children}
    </Paper>
  );
};

export const Matrix = () => {
  const { handleCellClick, focusedMatrixIndex, matrices, gridSize } =
    useMatrixProvider();
  const thisMaxtrix = matrices?.data?.[focusedMatrixIndex];
  
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDragSelectedCell, setMouseDragSelectedCell] = useState(null);

  
  const { selectedColor } = useColorSelector();

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    selectCell(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      selectCell(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const selectCell = (row, col) => {
    const key = { x: col, y: row };

    setMouseDragSelectedCell(key);
  };

  useEffect(() => {
    if (!isDragging) {
      setMouseDragSelectedCell(null);
    }
  }, [isDragging]);

  useEffect(() => {
    if (!mouseDragSelectedCell) {
      return;
    }
    const { x, y } = mouseDragSelectedCell;
    handleCellClick(x, y, selectedColor, isDragging);
  }, [mouseDragSelectedCell]);

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  }, []);

  return (
    <Grid container direction="column">
      <Grid container item>
        <Grid item>
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                gap: "5px",
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                const x = index % gridSize;
                const y = Math.floor(index / gridSize);
                const cellId = `cell_${x}-${y}`;

                return (
                  <Cell
                    handleCellClick={handleCellClick}
                    x={x}
                    y={y}
                    id={cellId}
                    key={cellId}
                    isSelected={thisMaxtrix?.[y]?.[x] != 0}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}
                  ></Cell>
                );
              })}
            </div>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
};
