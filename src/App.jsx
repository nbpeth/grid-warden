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
} from "@mui/material";
import { Matrix } from "./components/matrix/Matrix";
import {
  ColorSelectorProvider,
  useColorSelector,
} from "./hooks/useColorSelector";
import { Frames } from "./components/frames/Frames";
import { MatrixProvider, useMatrixProvider } from "./hooks/useMatrixProvider";
import { ColorSelector } from "./components/colorSelector/ColorSelector";
import { useState } from "react";

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
  const { animate } = useMatrixProvider();
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
              <Button fullWidth variant="outlined" onClick={animate}>
                Play
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
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

export const ColorPaletteCodeDisplay = ({ colorCodeVisible }) => {
  const { colorPalette } = useColorSelector();

  const mapPaletteHexToRGB = () => {
    return colorPalette?.map((p) => {
      return hexToRgb(p);
    });
  };

  // const mapRGBToHTML = () => {
  //   return mapPaletteHexToRGB()?.map((p) => {
  //     return JSON.stringify(p);
  //   });
  // };

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

              mapPaletteHexToRGB()
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
                // justifyContent: "center",
                // justifyContent: "space-between",
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
