import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";

const emptyCellColor = "#444";

// needs factored
// updating grid too heavy handed, poor selection and clearing critera

export const Cell = ({ x, y, handleCellClick, id }) => {
  const { colorPalette, selectedColor } = useColorSelector();
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);
  const { focusedMatrix } = useMatrixProvider();

  const colorIdForCoordinate = focusedMatrix?.[y]?.[x];
  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  const hasColorValue = !!colorIdForCoordinate;

  useEffect(() => {
    setBackgroundColor(
      hasColorValue ? colorValueForCoordinate : emptyCellColor
    );
  }, [colorPalette, focusedMatrix]);

  const handleClick = () => {
    handleCellClick(x, y, selectedColor);
  };

  return (
    <div
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
