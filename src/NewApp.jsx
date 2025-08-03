import { Menu, PlayArrow, Repeat, Stop } from "@mui/icons-material";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Slider,
  ThemeProvider,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FrameBar } from "./App";
import { ColorSelectorV2 } from "./components/colorSelector/ColorSelector";
import { LoadButtonModal } from "./components/load/Load";
import { Matrix } from "./components/matrix/Matrix";
import { SaveButtonModal } from "./components/save/Save";
import { useMatrixProvider } from "./hooks/useMatrixProvider";

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },
});

export const NewApp = () => {
  const [drawerWidth, setDrawerWidth] = useState("15vw");
  const [bottomBarHeight, setBottomBarHeight] = useState(200);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { animate, isAnimating } = useMatrixProvider();
  const {
    isRepeating,
    animationSpeed,
    handleRepeatingButtonClick,
    setAnimationSpeed,
    stopAnimation,
  } = useMatrixProvider();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // useEffect(() => {
  //   setBottomBarHeight(isMobile ? 200 : 200);
  // }, [isMobile]);

  const drawerContent = (
    <Box
      id="drawer-content"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
        gap: 2,
      }}
    >
      {mobileDrawerOpen && <Box sx={{ height: 50 }} />}
      <ColorSelectorV2 />
      <Divider
        sx={{
          width: "80%",
          backgroundColor: "#4b5563",
          my: 1,
        }}
      />
      <Box sx={{ width: "50%" }}>
        <Slider
          value={animationSpeed}
          onChange={(e, value) => setAnimationSpeed(value)}
          min={0.1}
          max={1}
          step={0.05}
          size="small"
          sx={{ color: "warning.main" }}
        />
      </Box>

      {isAnimating ? (
        <Tooltip title="Stop Animation" arrow placement="right">
          <IconButton
            sx={{
              color: "white",
              transition: "color 0.5s ease, transform 0.5s ease",
              "&:hover": {
                color: "error.main",
                transform: "scale(1.5)",
              },
            }}
          >
            <Stop sx={{ fontSize: "xxx-large" }} onClick={stopAnimation} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Play Animation" arrow placement="right">
          <IconButton
            disabled={isAnimating}
            sx={{
              color: "white",
              transition: "color 0.5s ease, transform 0.5s ease",
              "&:hover": {
                color: "success.main",
                transform: "scale(1.5)",
              },
            }}
          >
            <PlayArrow sx={{ fontSize: "xxx-large" }} onClick={animate} />
          </IconButton>
        </Tooltip>
      )}

      <IconButton
        onClick={() => handleRepeatingButtonClick()}
        sx={{
          color: "white",
          "&:hover": { backgroundColor: "rgba(107, 114, 128, 0.2)" },
        }}
        disabled={isAnimating}
      >
        <Repeat
          sx={{
            color: isRepeating && !isAnimating ? "warning.main" : "inherit",
            fontSize: "xxx-large",
            transition: "color 0.5s ease, transform 0.5s ease",
            "&:hover": {
              color: "warning.main",
              transform: "scale(1.5)",
            },
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          color: "white",
          "&:hover": { backgroundColor: "rgba(107, 114, 128, 0.2)" },
        }}
      >
        {/* <Save sx={{fontSize: "xxx-large"}} /> */}
        <SaveButtonModal />
      </IconButton>
      <LoadButtonModal />
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1300,
              backgroundColor: "#1f2937",
              color: "white",
              "&:hover": { backgroundColor: "#374151" },
              width: 48,
              height: 48,
            }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        )}

        {/* Left Sidebar Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileDrawerOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 1300, // Lower than AppBar
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1f2937",
              // Proper height calculation for iPad
              height: isMobile
                ? `calc(100vh - ${bottomBarHeight}px - env(safe-area-inset-bottom))`
                : `calc(100vh - ${bottomBarHeight}px)`,
              overflowY: "auto",
              overflowX: "hidden",
              border: "none",
              // Ensure drawer doesn't overlap bottom bar
              bottom: isMobile ? `${bottomBarHeight}px` : "auto",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            display: "flex",
            flexGrow: 1,
            height: `calc(100vh - ${300}px)`,
            overflow: "auto",
            backgroundColor: "#111827",
            ml: isMobile ? 0 : 0, // No margin on mobile since drawer is temporary
            justifyContent: "center",
          }}
        >
          <Matrix isMobile={isMobile} />
        </Box>

        {/* Bottom Toolbar */}
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            height: bottomBarHeight,
            backgroundColor: "#1f2937",
            zIndex: 1400, // Move z-index here and make it higher
            // Add iPad-specific bottom padding
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: `${bottomBarHeight}px !important`,
              overflowX: "auto",
              overflowY: "hidden",
              px: 2,
              "&::-webkit-scrollbar": {
                height: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#374151",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#6b7280",
                borderRadius: "4px",
              },
              // Remove these misplaced drawer styles:
              // zIndex: 1000,  // ❌ Remove this
              // width: drawerWidth,  // ❌ Remove this
              // boxSizing: "border-box",  // ❌ Remove this
              // backgroundColor: "#1f2937",  // ❌ Remove this
              // height: isMobile ? `calc(100vh - ${bottomBarHeight}px - env(safe-area-inset-bottom))` : `calc(100vh - ${bottomBarHeight}px)`,  // ❌ Remove this
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                whiteSpace: "nowrap",
                minWidth: "max-content",
              }}
            >
              <FrameBar isMobile={isMobile} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
