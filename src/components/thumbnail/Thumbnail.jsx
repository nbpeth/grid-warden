import { Grid } from "@mui/material";
import { ThumbnailCell } from "../thumbnailCell/ThumbnailCell";

export const ThumbNail = ({ i, gridSize }) => {
  return (
    <Grid container alignItems="center" justifyContent="center" >
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
