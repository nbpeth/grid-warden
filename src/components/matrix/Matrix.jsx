import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import { Cell } from "../cell/Cell";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "0" }}>
      {children}
    </Paper>
  );
};

export const Matrix = ({ isMobile }) => {
  const { handleCellClick, focusedMatrixIndex, matrices, gridSize } =
    useMatrixProvider();
  const thisMaxtrix = matrices?.data?.[focusedMatrixIndex];
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDragSelectedCell, setMouseDragSelectedCell] = useState(null);
  const [squareSize, setSquareSize] = useState(0);

  useEffect(() => {
    const updateSquareSize = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      const availableSize = Math.min(70 * vh, 70 * vw);
      setSquareSize(availableSize / 9);
    };

    updateSquareSize();
    window.addEventListener("resize", updateSquareSize);
    return () => window.removeEventListener("resize", updateSquareSize);
  }, []);

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
    <Grid
      container
      direction="column"
      // ref={parentRef}
      id="matrix-container"
      sx={{
        // width: "80vw", height: "80vh"
        width: "min(80vh, 80vw)",
        height: "min(80vh, 80vw)",
      }}
    >
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
                    squareSize={squareSize}
                    isMobile={isMobile}
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
