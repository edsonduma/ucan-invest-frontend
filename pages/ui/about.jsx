import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function StickyFooter() {
    return (
        <ThemeProvider theme={theme}>
            <MyAppBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '91vh',
                }}
            >
                {/* <CssBaseline /> */}
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                    <Typography variant="h2" component="h1" gutterBottom>
                        UCAN Projects
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {'Projectos desenvolvidos pela UCAN. '}
                        {'No ambito da investigação e da pesquisa necessaria para o desenvolvimento.'}
                    </Typography>
                    <Typography variant="body1">Esta é uma pequena apresentação dos varios projectos que a ucan produz no seu dia a dia..</Typography>
                </Container>
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                    style={{ 
                      position: 'relative',
                      bottom: '0px', 
                      width: '100%'
                    }}
                >
                    <Container maxWidth="sm">
                        {/* <Typography variant="body1">
                            UCAN Projects
                        </Typography> */}
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}