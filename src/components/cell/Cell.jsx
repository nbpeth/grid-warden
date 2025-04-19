import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

const emptyCellColor = "#444";

// needs factored
// updating grid too heavy handed, poor selection and clearing critera

export const Cell = ({ x, y, handleCellClick, id, isSelected }) => {
  const { colorPalette, selectedColor } = useColorSelector();
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);
  const { focusedMatrix } = useMatrixProvider();

  const colorIdForCoordinate = focusedMatrix?.[y]?.[x];
  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  useEffect(() => {
    setBackgroundColor(isSelected ? colorValueForCoordinate : emptyCellColor);
  }, [colorPalette, focusedMatrix, isSelected]);

  const handleClick = () => {
    const giveValueIfNotPreviouslySelected = !isSelected ? selectedColor : 0;
    handleCellClick(x, y, giveValueIfNotPreviouslySelected);
  };

  return (
    <div
      draggable
      //    onDragOver={}
      id={id}
      onClick={handleClick}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid #222",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};

export const ThumbnailCell = ({ x, y, id, i }) => {
  const { colorPalette } = useColorSelector();
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);
  const { getMatrixAtPosition, focusedMatrixIndex } = useMatrixProvider();
  const colorIdForCoordinate = getMatrixAtPosition(i)?.[y]?.[x];
  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  const hasColorValue = !!colorIdForCoordinate;

  useEffect(() => {
    setBackgroundColor(
      hasColorValue ? colorValueForCoordinate : emptyCellColor
    );
  }, [focusedMatrixIndex]);

  return (
    <div
      draggable
      id={id}
      style={{
        width: "4px",
        height: "4px",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};
