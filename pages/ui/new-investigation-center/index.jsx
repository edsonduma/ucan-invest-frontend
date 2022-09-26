import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CenterData from './_center-data';
import AddInvestigadors from './_add-investigators';
import Review from './_review';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LOCAL_BASE_URL } from '../../../utils/constants';
import { getCookieFromBrowser } from '../../../utils/cookie';

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

const steps = ['Dados do Centro', 'Investigadores e Areas de Actuação', 'Rever os Dados'];

const theme = createTheme();

export default function NewProject() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [investigators, setInvestigators] = useState([])
  const [faculties, setFaculties] = useState([])
  const [areasOfActivity, setAreasOfActivity] = useState([])

  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/area-activity`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
   })
    .then((response) => {
      console.log(response.data)
      setAreasOfActivity(response.data)
    })

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/faculties`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
   })
    .then((response) => {
      setFaculties(response.data)

    })

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/investigators`, {
      headers: {
         "Authorization": getCookieFromBrowser('token') 
      }
   })
    .then((response) => {
      setInvestigators(response.data)
    })

    // fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigators`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('1:investigators: ', data)
    //     setInvestigators(data)
    //   })

  }, [])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CenterData investigators={investigators} faculties={faculties} />;
      case 1:
        return <AddInvestigadors investigators={investigators} areasOfActivity={areasOfActivity} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Passo desconhecido');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <MyAppBar />

      {/* <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Ucan Projects
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Novo Centro de Investigação
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Cadastro concluido.
                </Typography>
                <Typography variant="subtitle1">
                  O centro número #1234 foi criado com sucesso e será publicado após aprovação do conselho.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Voltar
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Confirmar' : 'Próximo'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
        {/* <Copyright sx={{ mt: 22, mb: 4 }} /> */}
      </Container>
      
      {/* Footer */}
      <Box
        style={{ marginTop: '14vh' }}
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
          <Copyright />
          {/* <Copyright sx={{ mt: 22, mb: 4 }} /> */}
        </Container>
      </Box>
      {/* End footer */}
      
    </ThemeProvider>
  );
}