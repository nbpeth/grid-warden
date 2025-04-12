import { Grid } from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

export const Frames = () => {
  const { matrices, focusedMatrixIndex, handleMatrixFocusChange, pushNewMatrix } =
    useMatrixProvider();
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
              {i}
            </Grid>
          );
        })}
        <Grid
          onClick={pushNewMatrix}
          item
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{
            border: "1px dashed #aaa",
            height: "100px",
            width: "100px",
            cursor: "pointer",
          }}
        >
          <div>+</div>
        </Grid>
      </>
    </Grid>
  );
};
