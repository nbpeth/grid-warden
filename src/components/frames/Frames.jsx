import { Box, Grid, Paper, Typography } from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ThumbNail } from "../thumbnail/Thumbnail";

// todo: drag and reorder frames

export const Frames = () => {
  const {
    matrices,
    focusedMatrixIndex,
    handleMatrixFocusChange,
    pushNewMatrixAt,
    deleteMatrixAt,
    copyMatrixAt,
    gridSize,
  } = useMatrixProvider();
  const isFocused = (i) => focusedMatrixIndex === i;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "scroll",
        gap: 2,
        p: 2,
      }}
    >
      <>
        {matrices?.map((frame, i) => {
          return (
            <Paper
              key={i}
              onClick={() => handleMatrixFocusChange(i)}
              sx={{
                padding: "10px",
                display: "flex",
                border: isFocused(i) ? "3px solid #bbb" : "1px solid #444",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Grid
                container
                direction="column"
                spacing={1}
                alignItems="center"
              >
                <Grid item container spacing={1}>
                  <ThumbNail i={i} gridSize={gridSize} />

                  <Grid
                    conatiner
                    item
                    direction="column"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      {/* <Tooltip title="Insert blank frame" arrow> */}
                      <AddIcon
                        fontSize="xx-small"
                        onClick={() => pushNewMatrixAt(i)}
                        sx={{
                          cursor: "pointer",
                          transition: "color 0.5s ease, transform 0.5s ease",
                          "&:hover": {
                            color: "success.dark",
                            transform: "scale(1.5)",
                          },
                        }}
                      />
                      {/* </Tooltip> */}
                    </Grid>
                    <Grid item>
                      {/* <Tooltip title="Duplicate frame" arrow> */}
                      <ContentCopyIcon
                        fontSize="xx-small"
                        onClick={() => copyMatrixAt(i)}
                        sx={{
                          cursor: "pointer",
                          transition: "color 0.5s ease, transform 0.5s ease",
                          "&:hover": {
                            color: "primary.main",
                            transform: "scale(1.5)",
                          },
                        }}
                      />
                      {/* </Tooltip> */}
                    </Grid>
                    {matrices?.length > 1 && (
                      <Grid item>
                        {/* <Tooltip title="Delete frame" arrow> */}
                        <DeleteIcon
                          fontSize="xx-small"
                          onClick={() => deleteMatrixAt(i)}
                          sx={{
                            cursor: "pointer",
                            transition: "color 0.5s ease, transform 0.5s ease",
                            "&:hover": {
                              color: "error.dark",
                              transform: "scale(1.5)",
                            },
                          }}
                        />
                        {/* </Tooltip> */}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {i}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </>
    </Box>
  );
};
