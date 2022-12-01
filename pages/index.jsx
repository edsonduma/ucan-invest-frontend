import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
import Copyright from '/components/_copyright';
import { useEffect } from 'react';
import { useState } from 'react';
import { borderRadius } from '@mui/system';
import axios from 'axios';
import Projects from './ui/projects';

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

// const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Home() {

  const [projects, setProjects] = useState([])

  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/projects`)
    .then((response) => {
      setProjects(response.data)
    })
    // fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/projects`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log('data: ', data)
    //   setProjects(data)
    // })

  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          {/* import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; */}
          {/* <MonetizationOnIcon sx={{ mr: 2 }} /> */}
          <img src="/img/logo.png" alt="ucanic" style={{
            // maxWidth: 120,
            // marginRight: '10px',
            // borderRadius:'30px',
            // boxShadow: '1px 2px 9px black'
            maxWidth: 160,
            marginRight: '10px',
            padding: '0.3em',
            borderRadius:'5em',
            boxShadow: '1px 2px 9px black',
            backgroundColor: 'white'
          }}  />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {/* UCAN Projects */}
          </Typography>
          {/* <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav> */}
          <Button style={{ backgroundColor: 'white' }} href="/ui/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          {/* <Button href="/ui/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}> */}
            Login
          </Button>
        </Toolbar>
      </AppBar>
      
      <Projects />

    </ThemeProvider>
  );
}