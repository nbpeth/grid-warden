import {
    Box,
    Button
} from "@mui/material";
import { useColorSelector } from "../../hooks/useColorSelector";

export const ColorSelectorV2 = () => {
  const {
    colorPalette,
    handleSelectedColorChange,
    handleColorSelectorValueChange,
    selectedColor,
  } = useColorSelector();
  // remove the index offsetting from this and localize it to the matrix specific hook because this index + 1 crap is irritating
  return (
    <Box sx={{ px: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {colorPalette?.map((color, index) => {
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Button
                color="secondary"
                variant={selectedColor == index + 1 ? "contained" : "outlined"}
                onClick={(e) => {
                  handleSelectedColorChange(index + 1);
                }}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "white",
                  },
                }}
              >
                {" "}
              </Button>

              <Box
                component="input"
                type="color"
                value={color}
                onChange={(e) =>
                  handleColorSelectorValueChange(index, e?.target?.value)
                }
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: color,
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  "&::-webkit-color-swatch-wrapper": {
                    padding: 0,
                  },
                  "&::-webkit-color-swatch": {
                    border: "none",
                    borderRadius: "4px",
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
