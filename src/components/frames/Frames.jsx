import { Grid, Typography } from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import { ThumbnailCell } from "../cell/Cell";
import { Container } from "../matrix/Matrix";

export const ThumbNail = ({ i, gridSize }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gap: "6px",
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const cellId = `thumbnailcell_${x}-${y}`;

            return (
              <ThumbnailCell
                x={x}
                y={y}
                id={cellId}
                key={cellId}
                i={i}
              ></ThumbnailCell>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
};

import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const Frames = () => {
  const {
    matrices,
    focusedMatrixIndex,
    handleMatrixFocusChange,
    // pushNewMatrix,
    pushNewMatrixAt,
    deleteMatrixAt,
    copyMatrixAt,
    gridSize,
  } = useMatrixProvider();
  const isFocused = (i) => focusedMatrixIndex === i;
  console.log("m", matrices.length);
  return (
    <Grid
      container
      sx={{ padding: "10px" }}
      justifyContent="center"
      justifyItems="center"
      alignContent="center"
      alignItems="center"
      spacing={3}
    >
      <>
        {matrices?.map((frame, i) => {
          return (
            <Grid container item direction="row" spacing={1}>
              <Grid
                onClick={() => handleMatrixFocusChange(i)}
                item
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                sx={{
                  border: isFocused(i) ? "3px solid #bbb" : "1px solid #aaa",
                  height: "100px",
                  width: "100px",
                  cursor: "pointer",
                }}
                direction="row"
              >
                <ThumbNail i={i} gridSize={gridSize} />
              </Grid>
              <Grid conatiner direction="column" justifyContent="space-between">
                <Grid item>
                  <AddIcon
                    fontSize="xx-small"
                    onClick={() => pushNewMatrixAt(i)}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                <Grid item>
                  <ContentCopyIcon
                    fontSize="xx-small"
                    onClick={() => copyMatrixAt(i)}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                {matrices?.length > 1 && (
                  <Grid item>
                    <DeleteIcon
                      fontSize="xx-small"
                      onClick={() => deleteMatrixAt(i)}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          );
        })}
      </>
    </Grid>
  );
};
