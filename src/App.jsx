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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ColorSelectorProvider>
        <CssBaseline />
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item>
            <Matrix />
          </Grid>
        </Grid>
        <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
          <Toolbar>Content?</Toolbar>
        </AppBar>
        <Toolbar />
      </ColorSelectorProvider>
    </ThemeProvider>
  );
};

export default App;
