import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";

const emptyCellColor = "#eee";

// needs factored
// updating grid too heavy handed, poor selection and clearing critera

export const Cell = ({ x, y, handleCellClick, id, replicaGrid }) => {
  const { colorPalette, selectedColor } = useColorSelector();
  const [isSelected, setIsSelected] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);

  const colorIdForCoordinate = replicaGrid[y][x];
  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  const hasColorValue = !!colorIdForCoordinate;

  useEffect(() => {
    handleCellClick(x, y, isSelected ? selectedColor : 0);
  }, [isSelected]);

  useEffect(() => {
    if (!hasColorValue) {
      setIsSelected(false);
    }

    setBackgroundColor(isSelected ? colorValueForCoordinate : emptyCellColor);
  }, [colorPalette, replicaGrid]);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid #ccc",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};
