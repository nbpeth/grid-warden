import { Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Cell } from "../cell/Cell";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "0" }}>
      {children}
    </Paper>
  );
};

export const Matrix = () => {
  const {
    handleCellClick,
    focusedMatrixIndex,
    matrices,
    gridSize,
    resetMatrix,
  } = useMatrixProvider();
  const thisMaxtrix = matrices?.[focusedMatrixIndex];

  const containerRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);

  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const start = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setStartPos(start);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !startPos) return;

    const rect = containerRef.current.getBoundingClientRect();
    const current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const box = {
      left: Math.min(startPos.x, current.x),
      top: Math.min(startPos.y, current.y),
      right: Math.max(startPos.x, current.x),
      bottom: Math.max(startPos.y, current.y),
    };
    // console.log("handleMouseMove", box)
    setCurrentBox(box);
  };

  

  const handleMouseUp = () => {
 
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Grid container direction="column">
      <Grid container item>
        <Grid item>
          <Container>
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
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
                    className="selectableCell"
                    handleCellClick={handleCellClick}
                    x={x}
                    y={y}
                    replicaGrid={thisMaxtrix}
                    id={cellId}
                    key={cellId}
                    isSelected={thisMaxtrix[y][x] != 0}
                  ></Cell>
                );
              })}
            </div>
          </Container>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth={true} onClick={resetMatrix}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
