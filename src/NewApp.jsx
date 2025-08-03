import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  PlayArrow,
  Repeat,
  Save,
  FolderOpen,
  Menu
} from '@mui/icons-material';
import { FrameBar } from './App';
import { Matrix } from './components/matrix/Matrix';
import { useMatrixProvider } from './hooks/useMatrixProvider';
import { LoadButtonModal } from './components/load/Load';
import { SaveButtonModal } from './components/save/Save';

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
  },
});

const ColorSelector = () => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [colors, setColors] = useState([
    '#ef4444', // red
    '#3b82f6', // blue  
    '#10b981', // green
    '#8b5cf6', // purple
    '#f97316', // orange
    '#ec4899', // pink
    '#eab308', // yellow
    '#6b7280'  // gray
  ]);

  const updateColor = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {colors.map((color, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="button"
              onClick={() => setSelectedColorIndex(index)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                border: selectedColorIndex === index ? '2px solid white' : '2px solid #9ca3af',
                backgroundColor: selectedColorIndex === index ? 'white' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'white',
                },
              }}
            />

            <Box
              component="input"
              type="color"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: color,
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                '&::-webkit-color-swatch-wrapper': {
                  padding: 0,
                },
                '&::-webkit-color-swatch': {
                  border: 'none',
                  borderRadius: '4px',
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const NewApp = () => {
  const [drawerWidth, setDrawerWidth] = useState("10vw");
  const [bottomBarHeight, setBottomBarHeight] = useState(200);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { animate, isAnimating } = useMatrixProvider();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    setBottomBarHeight(isMobile ? 150 : 200);
  }, [isMobile])

  const drawerContent = (
    <Box
      id= 'drawer-content'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        gap: 2,
        
      }}
    >
      {mobileDrawerOpen && <Box sx={{height:50}} />}
      <ColorSelector />
      <Divider 
        sx={{ 
          width: '80%', 
          backgroundColor: '#4b5563',
          my: 1
        }} 
      />
      <Tooltip title="Play" arrow placement="right">
        <IconButton
            disabled={isAnimating} 
            sx={{ 
            color: 'white', 
            '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.2)' } 
            }}
        >
            <PlayArrow sx={{fontSize: "xxx-large"}} onClick={animate} />
        </IconButton>
      </Tooltip>
      <IconButton 
        sx={{ 
          color: 'white', 
          '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.2)' } 
        }}
      >
        <Repeat sx={{fontSize: "xxx-large"}} />
      </IconButton>
      <IconButton 
        sx={{ 
            
          color: 'white', 
          '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.2)' } 
        }}
      >
        {/* <Save sx={{fontSize: "xxx-large"}} /> */}
        <SaveButtonModal />
      </IconButton>
      <LoadButtonModal />
      {/* <IconButton 
        // onClick={handleClickOpen}
        sx={{ 
          color: 'white', 
          '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.2)' } 
        }}
      >
        <FolderOpen sx={{fontSize: "xxx-large"}} />
      </IconButton> */}
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1300,
              backgroundColor: '#1f2937',
              color: 'white',
              '&:hover': { backgroundColor: '#374151' },
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
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileDrawerOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#1f2937',
              height: `calc(100vh - ${bottomBarHeight}px)`,
              overflowY: 'auto',
              overflowX: 'hidden',
              border: 'none',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#374151',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#6b7280',
                borderRadius: '4px',
              },
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
            height: `calc(100vh - ${bottomBarHeight}px)`,
            overflow: 'auto',
            backgroundColor: '#111827',
            ml: isMobile ? 0 : 0, // No margin on mobile since drawer is temporary
            justifyContent: "center"
          }}
        >
          <Matrix isMobile={isMobile} />
        </Box>

        {/* Bottom Toolbar */}
        <AppBar
          position="fixed"
          sx={{
            top: 'auto',
            bottom: 0,
            height: bottomBarHeight,
            backgroundColor: '#1f2937',
          }}
        >
          <Toolbar
            sx={{
              minHeight: `${bottomBarHeight}px !important`,
              overflowX: 'auto',
              overflowY: 'hidden',
              px: 2,
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#374151',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#6b7280',
                borderRadius: '4px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                whiteSpace: 'nowrap',
                minWidth: 'max-content',
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

