import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

export const emptyCellColor = "#444";

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
    <div
      onMouseDown={() => handleMouseDown(y, x)}
      onMouseEnter={() => handleMouseEnter(y, x)}
      onMouseUp={handleMouseUp}
      id={id}
      style={{
        width: squareSize,
        height: squareSize,
        border: "1px solid #222",
        aspectRatio: "1 / 1",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};
