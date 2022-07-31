import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAppBar from './components/MyAppBar';
import Copyright from './components/Copyright';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         UCAN
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <MyAppBar />

      <main style={{ backgroundColor: 'white' }}>
        {/* <main> */}
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Projectos de Investigação da UCAN
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Esta é uma pequena apresentação dos vários projectos que a ucan produz no seu dia a dia.
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>

        {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="mycontent"> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Projecto {card}
                    </Typography>
                    <Typography>
                      Este é um cartão de mídia. Você pode usar esta seção para descrever o conteúdo.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Abrir</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* </Box> */}

      </main>

      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer"> */}
      {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
      {/* <hr /> */}
      {/* <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        > */}
      {/* Something here to give the footer a purpose! */}
      {/* </Typography> */}
      {/* <Copyright /> */}


      {/* <Copyright sx={{ mt: 22, mb: 4 }} /> */}


      {/* </Box> */}

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
      >
        <Container maxWidth="sm">
          {/* <Typography variant="body1">
                            UCAN Projects
                        </Typography> */}
          <Copyright />
        </Container>
      </Box>
      {/* End footer */}

    </ThemeProvider>
  );
}