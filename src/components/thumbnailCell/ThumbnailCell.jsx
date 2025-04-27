import { useEffect, useState } from "react";
import { useColorSelector } from "../../hooks/useColorSelector";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import { emptyCellColor } from "../cell/Cell";

export const ThumbnailCell = ({ x, y, id, i }) => {
  const { colorPalette } = useColorSelector();
  const [backgroundColor, setBackgroundColor] = useState(emptyCellColor);
  const { getMatrixAtPosition, matrices } = useMatrixProvider();
  const colorIdForCoordinate = getMatrixAtPosition(i)?.[y]?.[x];
  const colorValueForCoordinate =
    colorPalette[colorIdForCoordinate - 1] ?? emptyCellColor;

  const hasColorValue = !!colorIdForCoordinate;

  useEffect(() => {
    setBackgroundColor(
      hasColorValue ? colorValueForCoordinate : emptyCellColor
    );
  }, [matrices]);

  return (
    <div
      // draggable
      id={id}
      style={{
        width: "4px",
        height: "4px",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};
