import "./App.css";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  ThemeProvider,
  createTheme,
  Drawer,
  // useTheme,
  Paper,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import { Matrix } from "./components/matrix/Matrix";
import {
  ColorSelectorProvider,
  useColorSelector,
} from "./hooks/useColorSelector";
import { Frames } from "./components/frames/Frames";
import { MatrixProvider, useMatrixProvider } from "./hooks/useMatrixProvider";
import { ColorSelector } from "./components/colorSelector/ColorSelector";
import { useMemo, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FrameBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          top: "auto",
          bottom: 0,
          height: "150px",
          overflowX: "scroll",
        }}
      >
        <Frames />
      </Toolbar>
    </AppBar>
  );
};

const SideBar = ({ handleCodeToggle, handleColorCodeToggle, displayState }) => {
  const { animate, isAnimating } = useMatrixProvider();
  const { colorCodeVisible, codeVisible } = displayState;

  return (
    <Grid
      container
      item
      direction="cell"
      sx={{
        width: "250px",
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <Paper sx={{ minHeight: "100vh", width: "20vw" }} elevation={1}>
        <Grid container>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <ColorSelector />
            </Grid>
            <Grid item sx={{ width: "95%" }}>
              <Button
                fullWidth
                color="secondary"
                variant={codeVisible ? "contained" : "outlined"}
                onClick={handleCodeToggle}
              >
                Matrix JSON
              </Button>
            </Grid>
            <Grid item sx={{ width: "95%" }}>
              <Button
                fullWidth
                color="warning"
                variant={colorCodeVisible ? "contained" : "outlined"}
                onClick={handleColorCodeToggle}
              >
                Pallete JSON
              </Button>
            </Grid>
            <Grid item sx={{ width: "95%" }}>
              <Button
                disabled={isAnimating}
                fullWidth
                variant="outlined"
                onClick={animate}
              >
                Play
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

export const CodeDisplay = () => {
  const { matrices } = useMatrixProvider();
  const { colorHexFromPaletteForPosition } = useColorSelector();
  // wouldn't it be nice to color code each number ?
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  return (
    <Paper
      elevation={1}
      sx={{
        padding: "10px",
        maxHeight: "40vh",
        minWidth: "25vw",
        overflow: "auto",
      }}
    >
      <ContentCopyIcon
        onClick={() => copyToClipboard(JSON.stringify(matrices))}
        sx={{
          cursor: "pointer",
          transition: "color 0.5s ease, transform 0.5s ease",
          "&:hover": {
            color: "success.dark",
            transform: "scale(1.5)",
          },
        }}
      />
      <pre style={{ fontSize: "x-small" }}>
        {chunk(matrices, 3).map((matricesRow, rowIndex) => (
          <Grid
            container
            spacing={1}
            key={"row" + rowIndex}
            sx={{ marginBottom: 1 }}
          >
            {matricesRow.map((matrix, mIndex) => (
              <Grid item xs={4} key={"m-" + mIndex}>
                <Grid container direction="column" spacing={0}>
                  {matrix?.map((line, lineIndex) => {
                    // return JSON.stringify(line) + "\n"

                    return (
                      <Grid item key={"line" + lineIndex}>
                        <Typography
                          sx={{
                            key: `openbracket-${rowIndex}-${mIndex}-${lineIndex}`,

                            // color: colorHexFromPaletteForPosition(i - 1),
                            fontWeight: "bold",
                            display: "inline",
                            mr: 1,
                          }}
                        >
                          [
                        </Typography>
                        {line.map((i, itemIndex) => (
                          <Typography
                            key={`point-${rowIndex}-${mIndex}-${lineIndex}-${itemIndex}`}
                            sx={{
                              color: colorHexFromPaletteForPosition(i - 1),
                              fontWeight: "bold",
                              display: "inline",
                              mr: 1,
                            }}
                          >
                            {i},
                          </Typography>
                        ))}
                        <Typography
                          sx={{
                            key: `endbracket-${rowIndex}-${mIndex}-${lineIndex}`,
                            fontWeight: "bold",
                            display: "inline",
                            mr: 1,
                          }}
                        >
                          ]
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </pre>
    </Paper>
  );
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return { r, g, b };
};

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export const ColorPaletteCodeDisplay = () => {
  const { colorPalette } = useColorSelector();
  const [colorpaletteMappedToRGB, setColorpaletteMappedToRGB] = useState();
  const mapPaletteHexToRGB = () => {
    return colorPalette?.map((p) => {
      return hexToRgb(p);
    });
  };

  useMemo(() => {
    setColorpaletteMappedToRGB(mapPaletteHexToRGB());
  }, [colorPalette]);

  return (
    <Paper
      elevation={1}
      sx={{
        padding: "10px",
        maxHeight: "20vh",
        minWidth: "25vw",
        overflow: "auto",
      }}
    >
      <ContentCopyIcon
        onClick={() => copyToClipboard(JSON.stringify(colorpaletteMappedToRGB))}
        sx={{
          cursor: "pointer",
          transition: "color 0.5s ease, transform 0.5s ease",
          "&:hover": {
            color: "success.dark",
            transform: "scale(1.5)",
          },
        }}
      />
      <Grid container item>
        <pre style={{ fontSize: "x-small" }}>
          <Grid container item direction="column">
            
            {colorpaletteMappedToRGB?.map((l, i) => {
              return (
                <Grid item>
                  <Typography
                    sx={{
                      key: `rgbColorCode-${i}`,
                      // color: colorHexFromPaletteForPosition(i - 1),
                      fontWeight: "bold",
                      display: "inline",
                      mr: 1,
                    }}
                  >
                    {JSON.stringify(l)},
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </pre>
      </Grid>
    </Paper>
  );
};

const App = () => {
  const [codeVisible, setCodeVisible] = useState(true);
  const [colorCodeVisible, setColorCodeVisible] = useState(true);

  const handleCodeToggle = () => {
    setCodeVisible(!codeVisible);
  };

  const handleColorCodeToggle = () => {
    setColorCodeVisible(!colorCodeVisible);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ColorSelectorProvider>
        <CssBaseline />
        <MatrixProvider>
          <Grid container sx={{ minHeight: "100vh", width: "100vw" }}>
            <Grid
              item
              sx={{
                marginLeft: "250px",
                flexGrow: 1,
                display: "flex",
                padding: "20px",
              }}
            >
              <SideBar
                displayState={{ codeVisible, colorCodeVisible }}
                handleColorCodeToggle={handleColorCodeToggle}
                handleCodeToggle={handleCodeToggle}
              />
              <Grid container spacing={2} xs={12} sx={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <Matrix />
                </Grid>
                <Grid container direction="column" sx={{ overflow: "scroll" }}>
                  <Grid item xs={3}>
                    {codeVisible && <CodeDisplay />}
                  </Grid>
                  <Grid item xs={3}>
                    {colorCodeVisible && <ColorPaletteCodeDisplay />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <FrameBar />
        </MatrixProvider>
      </ColorSelectorProvider>
    </ThemeProvider>
  );
};

export default App;
