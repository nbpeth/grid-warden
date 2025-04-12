import { Grid, Paper } from "@mui/material";
import React from "react";
import { useMatrix } from "../../hooks/useMatrix";
import { Cell } from "../cell/Cell";

export const Container = ({ children }) => {
  return (
    <Paper elevation={3} style={{ padding: "25px", margin: "25px" }}>
      {children}
    </Paper>
  );
};

export const Matrix = () => {
  const { handleCellClick, gridSize, replicaGrid } = useMatrix();

  return (
    <Grid container>
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
    </Grid>
  );
};
