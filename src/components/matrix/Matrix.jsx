import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { Cell } from "../cell/Cell";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "25px" }}>
      {children}
    </Paper>
  );
};

export const Matrix = () => {
  const { handleCellClick, getFocusedMatrix, gridSize, resetMatrix } =
    useMatrixProvider();
  const thisMaxtrix = getFocusedMatrix();

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
