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
import ProjectData from './_project-data';
import AddInvestigadors from './_add-investigators';
import AddCenters from './_add-centers';
import Review from './_review';
import MyAppBar from '../components/MyAppBar';
import Copyright from '../components/Copyright';
import { useState, useEffect } from 'react';

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

const steps = ['Dados do Projecto', 'Investigadores', 'Centros', 'Rever os Dados'];

const theme = createTheme();

export default function NewProject() {

  // const [teamLeaderSelected, setTeamLeaderSelected] = useState(1)

  // const [title, setTitle] = useState('')
  // const [subtitle, setSubtitle] = useState('')
  // const [pdfFile, setPdfFile] = useState('')

  const [projectData, setProjectData] = useState({
    title: "",
    subtitle: "",
    pdfFile: "",
    teamLeader: {
      pkInvestigator: 0,
    },
    centers: [],
    guestsInvestigators: []
  })

  const [investigators, setInvestigators] = useState([])
  const [activeStep, setActiveStep] = React.useState(0);
  
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigators`)
    .then(res => res.json())
    .then(data => {
      console.log('1:investigators: ', data)
      setInvestigators(data)
    })

  }, [])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProjectData investigators={investigators} />;
      case 1:
        return <AddInvestigadors investigators={investigators} />;
      case 2:
        return <AddCenters />;
      case 3:
        return <Review />;
      default:
        throw new Error('Passo desconhecido');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // projectData.teamLeader.pkInvestigator = teamLeaderSelected


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

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Novo Projecto
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
                  O projecto número #1234 foi criado com sucesso e será publicado após aprovação do conselho.
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