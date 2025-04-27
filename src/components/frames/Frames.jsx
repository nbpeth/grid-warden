import { Box, Grid, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ThumbNail } from "../thumbnail/Thumbnail";

export const Frames = () => {
  const {
    matrices,
    focusedMatrixIndex,
    handleMatrixFocusChange,
    pushNewMatrixAt,
    deleteMatrixAt,
    copyMatrixAt,
    gridSize,
    resetMatrix,
    swapMatrixPositions,
  } = useMatrixProvider();
  const isFocused = (i) => focusedMatrixIndex === i;
  const [dragTarget, setDragTarget] = useState();
  const theme = useTheme();

  const handleDragStart = (e) => {
    const id = e.currentTarget.id;
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    const potentialDropTarget = e.currentTarget.id;
    setDragTarget(potentialDropTarget);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    const dropTargetId = e.currentTarget.id;
    const draggedPosition = draggedId?.split("-")?.[1];
    const droppedPosition = dropTargetId?.split("-")?.[1];

    swapMatrixPositions(draggedPosition, droppedPosition);
  };

  const handleDragEnd = (e) => {
    setDragTarget(null);
  };

  const getFrameBorderStyle = (i) => {
    if (dragTarget === `frame-${i}`) {
      return `3px solid ${theme.palette.success.light}`;
    } else if (isFocused(i)) {
      return "3px solid #bbb";
    }
    return "3px solid #444";
  };

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
            <div
              id={`frame-${i}`}
              draggable
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
            >
              <Paper
                key={i}
                onClick={() => handleMatrixFocusChange(i)}
                sx={{
                  padding: "10px",
                  display: "flex",
                  border: getFrameBorderStyle(i),
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
                        <Tooltip title="Insert" arrow placement="right">
                          <AddIcon
                            fontSize="xx-small"
                            onClick={() => pushNewMatrixAt(i)}
                            sx={{
                              cursor: "pointer",
                              transition:
                                "color 0.5s ease, transform 0.5s ease",
                              "&:hover": {
                                color: "success.dark",
                                transform: "scale(1.5)",
                              },
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Duplicate" arrow placement="right">
                          <ContentCopyIcon
                            fontSize="xx-small"
                            onClick={() => copyMatrixAt(i)}
                            sx={{
                              cursor: "pointer",
                              transition:
                                "color 0.5s ease, transform 0.5s ease",
                              "&:hover": {
                                color: "primary.main",
                                transform: "scale(1.5)",
                              },
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Clear" arrow placement="right">
                          <ClearAllIcon
                            fontSize="xx-small"
                            onClick={() => resetMatrix(i)}
                            sx={{
                              cursor: "pointer",
                              transition:
                                "color 0.5s ease, transform 0.5s ease",
                              "&:hover": {
                                color: "warning.main",
                                transform: "scale(1.5)",
                              },
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      {matrices?.length > 1 && (
                        <Grid item>
                          <Tooltip title="Delete" arrow placement="right">
                            <DeleteIcon
                              fontSize="xx-small"
                              onClick={() => deleteMatrixAt(i)}
                              sx={{
                                cursor: "pointer",
                                transition:
                                  "color 0.5s ease, transform 0.5s ease",
                                "&:hover": {
                                  color: "error.dark",
                                  transform: "scale(1.5)",
                                },
                              }}
                            />
                          </Tooltip>
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
            </div>
          );
        })}
      </>
    </Box>
  );
};
