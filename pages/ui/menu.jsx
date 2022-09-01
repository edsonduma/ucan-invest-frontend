import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'Novo Projecto', 'Novo Centro', 'Novo Investigador', 'Sobre'];
const linkItems = ['projects', 'new-project', 'new-investigation-center', 'new-researcher', 'about'];

const theme = createTheme();

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img src="/img/logo.png" alt="ucanic" style={{
        maxWidth: 160,
        marginRight: '10px',
        padding: '0.3em',
        borderRadius: '5em',
        boxShadow: '1px 2px 9px black',
        backgroundColor: 'white'
      }} />
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* MUI */}
      </Typography>
      <Divider />
      <List>
        
        {navItems.map((item, index) => (
          <ListItem 
            key={item} 
            disablePadding
            // href={`/ui/${linkItems[index]}`}
            >
            <ListItemButton 
              component="a" 
              // href="#simple-list"
              href={`/ui/${linkItems[index]}`}
            >
              <ListItemText primary={item} />
            </ListItemButton>
{/* 
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton> */}
          </ListItem>

        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src="/img/logo.png" alt="ucanic" style={{
              maxWidth: 160,
              marginRight: '10px',
              padding: '0.3em',
              borderRadius: '5em',
              boxShadow: '1px 2px 9px black',
              backgroundColor: 'white'
            }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {/* MUI */}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => (
                <Button 
                  key={item} 
                  sx={{ color: '#fff' }}
                  href={`/ui/${linkItems[index]}`}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
            fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
            aliquam dolore excepturi quae.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
