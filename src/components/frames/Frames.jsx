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

export const Frames = () => {
  const {
    matrices,
    focusedMatrixIndex,
    handleMatrixFocusChange,
    pushNewMatrix,
    gridSize,
  } = useMatrixProvider();
  const isFocused = (i) => focusedMatrixIndex === i;

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
            >
              {/* {i} */}
              <ThumbNail i={i} gridSize={gridSize} />
            </Grid>
          );
        })}
        <Grid
          onClick={pushNewMatrix}
          item
          //   justifyContent="center"
          justifyItems="center"
          alignContent="center"
          //   alignItems="center"
          sx={{
            border: "1px dashed #aaa",
            height: "100px",
            width: "100px",
            cursor: "pointer",
          }}
        >
          <Grid>+</Grid>
        </Grid>
      </>
    </Grid>
  );
};
