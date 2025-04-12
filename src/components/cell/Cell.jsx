import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";

const emptyCellColor = "#eee";

export const Cell = ({ x, y, handleCellClick, id, replicaGrid }) => {
  const { colorPalette, selectedColor } = useColorSelector();

  const [isSelected, setIsSelected] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);

  useEffect(() => {
    handleCellClick(x, y, isSelected ? selectedColor : 0);
    setBackgroundColor(
      isSelected ? colorPalette[selectedColor - 1] : emptyCellColor
    );
  }, [isSelected]);

  useEffect(() => {
    const colorIdForCoordinate = replicaGrid[y][x];
    const colorValueForCoordinate = colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;
    // console.log(
    //   colorPalette[colorPalette.length - 1],
    //   colorIdForCoordinate,
    //   x,
    //   y,
    //   colorValueForCoordinate
    // );
    setBackgroundColor(isSelected ? colorValueForCoordinate : emptyCellColor);
  }, [colorPalette]);

  const handleClick = () => {
    const _isSelected = !isSelected;

    setIsSelected(_isSelected);
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
