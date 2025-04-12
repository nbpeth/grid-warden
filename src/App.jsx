import "./App.css";
import { Grid } from "@mui/material";
import { Matrix } from "./components/matrix/Matrix";
import { ColorSelector } from "./components/colorSelector/ColorSelector";
import { ColorSelectorProvider } from "./hooks/useColorSelector";

const App = () => {
  return (
    <ColorSelectorProvider>
      <Grid container spacing={2} style={{ padding: "20px" }}>
        <Grid item>
          <Matrix />
        </Grid>
        <Grid item>
          {/* <ColorSelector /> */}
        </Grid>
      </Grid>
    </ColorSelectorProvider>
  );
};

export default App;
