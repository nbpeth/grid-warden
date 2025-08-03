import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import { Box } from "@mui/material";

export const emptyCellColor = "#444";
export const activeEmptyCellColor = "#555";

export const Cell = ({
  squareSize,
  x,
  y,
  id,
  isSelected,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  isMobile,
}) => {
  const { colorPalette } = useColorSelector();
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);
  const { focusedMatrix } = useMatrixProvider();

  const colorIdForCoordinate = focusedMatrix?.[y]?.[x];

  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  useEffect(() => {
    setBackgroundColor(isSelected ? colorValueForCoordinate : emptyCellColor);
  }, [colorPalette, focusedMatrix, isSelected]);

  return (
    <Box
      onMouseDown={() => handleMouseDown(y, x)}
      onMouseEnter={() => handleMouseEnter(y, x)}
      onMouseUp={handleMouseUp}
      id={id}
      sx={{
        cursor: "pointer",
        width: squareSize,
        height: squareSize,
        border: "1px solid rgb(68, 68, 68)",
        aspectRatio: "1 / 1",
        backgroundColor: backgroundColor,
        transition: "linear 0.15s",
        "&:hover": {
          border: "2px solid #888",
          // background: activeEmptyCellColor,
        },
        "&:active": {
          // boxShadow: "0px 0px 39px 27px rgba(255, 255, 255, 0.4)",
          // zIndex: 100, 
          backgroundColor: `color-mix(in srgb, ${backgroundColor} 70%, white 30%)`,
        },
      }}
    ></Box>
  );
};
