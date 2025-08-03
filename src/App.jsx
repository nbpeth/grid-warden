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
  Box,
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

export const FrameBar = ({ isMobile }) => {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          top: "auto",
          bottom: 0,
          // height: isMobile ? 100 : 200,
          height: 200,
          overflowX: "scroll",
        }}
      >
        <Frames isMobile={isMobile} />
      </Toolbar>
    </AppBar>
  );
};

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RepeatIcon from "@mui/icons-material/Repeat";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const SideBar = ({ handleCodeToggle, handleColorCodeToggle, displayState }) => {
  const { animate, isAnimating } = useMatrixProvider();
  const { colorCodeVisible, codeVisible } = displayState;

  return (
    <Grid
      container
      item
      direction="cell"
      id="gridpapertop"
      sx={{
        width: "250px",
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <Paper
        sx={{ minHeight: "100vh", width: "20vw" }}
        elevation={1}
        id="papertop"
      >
        <Grid container justifyContent="space-between" id="top">
          <Grid
            container
            direction="column"
            alignItems="center"
            id="second"
            spacing={1}
          >
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
              {/* <Button
                disabled={isAnimating}
                fullWidth
                variant="outlined"
                onClick={animate}
              >
                Play
              </Button> */}
              <Tooltip title="Play" arrow placement="right">
                <PlayCircleIcon
                  onClick={animate}
                  sx={{
                    fontSize: "xxx-large",
                    cursor: "pointer",
                    transition: "color 0.5s ease, transform 0.5s ease",
                    "&:hover": {
                      color: "success.main",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Loop Animation" arrow placement="right">
                <RepeatIcon
                  onClick={animate}
                  sx={{
                    fontSize: "xxx-large",
                    cursor: "pointer",
                    transition: "color 0.5s ease, transform 0.5s ease",
                    "&:hover": {
                      color: "warning.main",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Tooltip>
              <Grid container item>
                <Grid item>
                  <SaveButtonModal />
                </Grid>
                <Grid item>
                  <LoadButtonModal />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export const CopyContentButton = ({ data }) => {
  const [checkitychecked, setCheckitychecked] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCheckitychecked(true);
        setTimeout(() => {
          setCheckitychecked(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "32px",
        height: "32px",
        display: "inline-block",
      }}
    >
      <Box
        onClick={() => copyToClipboard(data)}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: checkitychecked ? "default" : "pointer",
          opacity: checkitychecked ? 0 : 1,
          transform: checkitychecked ? "scale(0.5)" : "scale(1)",
          transition: "opacity 0.5s ease, transform 0.5s ease, color 0.5s ease",
          color: "text.primary",
          "&:hover": {
            color: checkitychecked ? "text.primary" : "success.dark",
          },
          pointerEvents: checkitychecked ? "none" : "auto",
        }}
      >
        {" "}
        <Tooltip title="Copy Raw JSON" arrow placement="right">
          <ContentCopyIcon sx={{ fontSize: "1.5rem" }} />
        </Tooltip>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          opacity: checkitychecked ? 1 : 0,
          transform: checkitychecked ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          pointerEvents: checkitychecked ? "auto" : "none",
        }}
      >
        ✅
      </Box>
    </Box>
  );
};

export const CodeDisplay = () => {
  const { matrices } = useMatrixProvider();
  const { colorHexFromPaletteForPosition } = useColorSelector();

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
      <CopyContentButton data={JSON.stringify(matrices?.data)} />
      <pre style={{ fontSize: "x-small" }}>
        {chunk(matrices?.data, 3).map((matricesRow, rowIndex) => (
          <Grid
            container
            spacing={1}
            key={"row" + rowIndex}
            sx={{ marginBottom: 1 }}
          >
            {matricesRow?.map((matrix, mIndex) => (
              <Grid item xs={4} key={"m-" + mIndex}>
                <Grid container direction="column" spacing={0}>
                  {matrix?.map((line, lineIndex) => {
                    return (
                      <Grid item key={"line" + lineIndex}>
                        <Typography
                          sx={{
                            key: `openbracket-${rowIndex}-${mIndex}-${lineIndex}`,
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
import { SaveButtonModal } from "./components/save/Save";
import { LoadButtonModal } from "./components/load/Load";
import { NewApp } from "./NewApp";

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
      <CopyContentButton data={JSON.stringify(colorpaletteMappedToRGB)} />
      <Grid container item>
        <pre style={{ fontSize: "x-small" }}>
          <Grid container item direction="column">
            {colorpaletteMappedToRGB?.map((l, i) => {
              return (
                <Grid item>
                  <Typography
                    sx={{
                      key: `rgbColorCode-${i}`,
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
          <NewApp />
          {/* <Grid spacontainer sx={{ height: "100vh", width: "100vw" }}>
            <Grid
              item
              sx={{
                marginLeft: "250px",
                flexGrow: 1,
                display: "flex",
                padding: "20px",
                overflow: "scroll",
                id:"sidebar-grid",
              }}
            >
              <SideBar
                displayState={{ codeVisible, colorCodeVisible }}
                handleColorCodeToggle={handleColorCodeToggle}
                handleCodeToggle={handleCodeToggle}
              />

              <Grid container spacing={2} xs={12} sx={{ padding: "20px" }}>
                <Grid item>
                  <Matrix />
                </Grid>

                <Grid container direction="column" sx={{ overflow: "scroll" }}>
                  <Grid item>
                    {codeVisible && <CodeDisplay />}
                  </Grid>
                  <Grid item xs={3}>
                    {colorCodeVisible && <ColorPaletteCodeDisplay />}
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            
          </Grid>
          <FrameBar /> */}
        </MatrixProvider>
      </ColorSelectorProvider>
    </ThemeProvider>
  );
};

export default App;
