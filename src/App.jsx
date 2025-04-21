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
      <Paper sx={{ minHeight: "100vh", width: "250px" }} elevation={1}>
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
              {/* {!isAnimating && ( */}
              <Button
                disabled={isAnimating}
                fullWidth
                variant="outlined"
                onClick={animate}
              >
                Play
              </Button>
              {/* )} */}
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

export const CodeDisplay = ({ codeVisible }) => {
  const { matrices } = useMatrixProvider();
  // wouldn't it be nice to color code each number ?

  return (
    <Grid item>
      {codeVisible && (
        <Paper
          elevation={6}
          sx={{
            overflowY: "scroll",
            overflowX: "scroll",
            maxHeight: "80vh",
            minHeight: "80vh",
            padding: "20px",
            minWidth: "200px",
          }}
        >
          <Tooltip title="Copy to clipboard" arrow>
            <ContentCopyIcon
              onClick={() => copyToClipboard(JSON.stringify(matrices))}
              sx={{
                cursor: "pointer",
                transition: "color 0.5s ease, transform 0.5s ease",
                "&:hover": {
                  color: "success.light",
                  transform: "scale(1.3)",
                },
              }}
            />
          </Tooltip>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: "x-small",
              // color: "lightgreen",
            }}
          >
            {[
              "[",
              matrices
                .map(
                  (m) =>
                    "  [\n" +
                    m.map((im) => `    [${im.join(", ")}],`).join("\n") +
                    "\n  ],"
                )
                .join("\n") + "\n]",
            ].join("\n")}
          </pre>
        </Paper>
      )}
    </Grid>
  );
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return { r, g, b };
};
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export const ColorPaletteCodeDisplay = ({ colorCodeVisible }) => {
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
    <Grid item>
      {colorCodeVisible && (
        <Paper
          elevation={6}
          sx={{
            overflowY: "scroll",
            overflowX: "scroll",
            maxHeight: "80vh",
            minHeight: "80vh",
            padding: "20px",
            minWidth: "200px",
          }}
        >
          <Tooltip title="Copy to clipboard" arrow>
            <ContentCopyIcon
              onClick={() =>
                copyToClipboard(JSON.stringify(colorpaletteMappedToRGB))
              }
              sx={{
                cursor: "pointer",
                transition: "color 0.5s ease, transform 0.5s ease",
                "&:hover": {
                  color: "success.light",
                  transform: "scale(1.3)",
                },
              }}
            />
          </Tooltip>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: "x-small",
              // color: "lightgreen",
            }}
          >
            {[
              "[",

              colorpaletteMappedToRGB
                ?.map((x) => `    ${JSON.stringify(x)}`)
                .join("\n"),

              "]",
            ].join("\n")}
          </pre>
        </Paper>
      )}
    </Grid>
  );
};

const App = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [colorCodeVisible, setColorCodeVisible] = useState(false);

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
              <Grid container item spacing={2}>
                <Grid item>
                  <Matrix />
                </Grid>
                <Grid item>
                  <CodeDisplay codeVisible={codeVisible} />
                </Grid>
                <Grid item>
                  <ColorPaletteCodeDisplay
                    colorCodeVisible={colorCodeVisible}
                  />
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
