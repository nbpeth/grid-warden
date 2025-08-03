import { createContext, useContext, useState } from "react";

const defaultPalette = [
  // "#FF5733",
  // "#C70039",
  // "#900C3F",
  // "#581845",
  // "#FFC300",
  // "#FF8D1A",
  // "#FF3377",
  // "#DAF7A6",
  "#33FF57",
  "#00BFFF",
  "#1A75FF",
  "#8C33FF",
  "#FF33EC",
  "#00FFCC",
  "#FF4444",
  "#3366FF",
];

const ColorSelectorContext = createContext();
export const ColorSelectorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(1);
  const [colorPalette, setColorPalette] = useState(defaultPalette);

  const handleSelectedColorChange = (index) => {
    setSelectedColor(Number(index));
  };

  const handleColorSelectorValueChange = (newColorPosition, value) => {
    console.log(
      "# handleColorSelectorValueChange",
      newColorPosition, value
    );
    setColorPalette((prev) => {
      const copy = [...prev];
      copy[newColorPosition] = value;

      return copy;
    });
  };

  const colorHexFromPaletteForPosition = (colorCode) => {
    return colorPalette[colorCode];
  };

  return (
    <ColorSelectorContext.Provider
      value={{
        colorHexFromPaletteForPosition,
        selectedColor,
        colorPalette,
        handleSelectedColorChange,
        handleColorSelectorValueChange,
      }}
    >
      {children}
    </ColorSelectorContext.Provider>
  );
};

export const useColorSelector = () => useContext(ColorSelectorContext);
