import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useMatrix } from "../../hooks/useMatrix";
import { Cell } from "../cell/Cell";
import { ColorSelector } from "../colorSelector/ColorSelector";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "25px" }}>
      {children}
    </Paper>
  );
};

export const Matrix = () => {
  const { handleCellClick, gridSize, replicaGrid, resetMatrix } = useMatrix();

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
                    replicaGrid={replicaGrid}
                    id={cellId}
                    key={cellId}
                  ></Cell>
                );
              })}
            </div>
          </Container>
        </Grid>
        <Grid item>
          <ColorSelector />
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item>
          <Button variant="outlined" onClick={resetMatrix}> Reset </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
