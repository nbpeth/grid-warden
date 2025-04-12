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
} from "@mui/material";
import { Matrix } from "./components/matrix/Matrix";
import { ColorSelectorProvider } from "./hooks/useColorSelector";
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

const SideBar = () => {
  const { matrices } = useMatrixProvider();
  const [codeVisible, setCodeVisible] = useState(false);

  const handleCodeToggle = () => {
    setCodeVisible(!codeVisible);
  };

  return (
    <Grid
      container
      item
      direction="cell"
      sx={{
        // width: "250px",
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <Paper sx={{ minHeight: "100vh" }} elevation={1}>
        <Grid container>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <ColorSelector />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleCodeToggle}>
                Toggle Code
              </Button>
            </Grid>
          </Grid>
          <Grid item sx={{                  overflowY: "scroll",
}}>
            {codeVisible && (
              <Paper
                elevation={6}
                sx={{
                  overflowY: "scroll",
                  // overflowX: "scroll",
                  minHeight: "100vh",
                  padding: "20px",
                  minWidth: "200px",
                }}
              >
                <pre style={{ fontSize: "xx-small", whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(matrices, null, 1)}
                </pre>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const App = () => {
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
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <SideBar />

              <Matrix />
            </Grid>
          </Grid>

          <FrameBar />
        </MatrixProvider>
      </ColorSelectorProvider>
    </ThemeProvider>
  );
};

// const App = () => {
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <ColorSelectorProvider>
//         <CssBaseline />
//         <Grid
//           container
//           spacing={2}
//           justifyItems="center"
//           // justifyContent="space-between"
//           id="main-body"
//           xs={12}
//           sx={{
//             padding: "20px",
//             border: "1px solid green",
//             width: "100vw", // fills entire screen width
//             minHeight: "100vh", // optional: fill screen vertically too
//           }}
//         >
//           <MatrixProvider>
//             <Grid
//               container
//               item
//               spacing={2}
//               xs={12}
//               sx={{ border: "1px solid red", padding: "10px", width: "100%" }}
//             >
//               <Grid
//                 item
//                 xs={4}
//                 sx={{ border: "1px solid blue", padding: "10px" }}
//               >
//                 <ColorSelector />
//               </Grid>

//               <Grid
//                 xs={8}
//                 container
//                 item
//                 sx={{ border: "1px solid yellow", padding: "10px" }}
//                 // justify="center"
//               >
//                 <Grid item xs={12}>
//                   <Matrix />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <FrameBar />
//           </MatrixProvider>
//         </Grid>
//       </ColorSelectorProvider>
//     </ThemeProvider>
//   );
// };

export default App;
