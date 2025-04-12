import "./App.css";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Matrix } from "./components/matrix/Matrix";
import { ColorSelectorProvider } from "./hooks/useColorSelector";
import { Frames } from "./components/frames/Frames";
import { MatrixProvider } from "./hooks/useMatrixProvider";

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

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ColorSelectorProvider>
        <CssBaseline />
        <MatrixProvider>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            <Grid item>
              <Matrix />
            </Grid>
          </Grid>

          <FrameBar />
        </MatrixProvider>
      </ColorSelectorProvider>
    </ThemeProvider>
  );
};

export default App;
