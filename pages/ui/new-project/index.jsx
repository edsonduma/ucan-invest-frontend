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
import AddCenters from './_add-centers';
import Review from './_review';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Dados do Projecto', 'Centros e Colaboradores', 'Rever os Dados'];

const theme = createTheme();

export default function NewProject() {

  const errorStatus = {
    message: ['Salvo com sucesso!', 'Erro ao salvar!'],
    severity: ['success', 'error']
  }

  const [openNotification, setOpenNotification] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = openNotification
  const [statusNumber, setStatusNumber] = useState(-1)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [teamLeaderName, setTeamLeaderName] = useState('')
  const [projectNumber, setProjectNumber] = useState('')

  const [investigators, setInvestigators] = useState([])
  const [activeStep, setActiveStep] = useState(0);
  const [projectData, setProjectData] = useState({
    title: '',
    subtitle: '',
    pdfFile: '',
    teamLeader: {
      pkInvestigator: '',
    },
    centers: [],
    guestsInvestigators: []
  })

  const handleClose = () => setOpenNotification({ ...openNotification, open: false })

  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/investigators`,
      {
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
    //     // console.log('1:investigators: ', data)
    //     setInvestigators(data)
    //   })
    //   .catch(err => console.error('err', err))

  }, [])

  useEffect(() => {
    investigators.find(e => {
      // e.pkInvestigator === projectData.teamLeader.pkInvestigator ? e.person.firstname + ' ' + e.person.lastname : ''

      if (e.pkInvestigator === projectData.teamLeader.pkInvestigator)
        setTeamLeaderName(e.person.firstname + ' ' + e.person.lastname)
    })

    // console.log('teamLeaderName', teamLeaderName);
  }, [projectData.teamLeader.pkInvestigator])

  useEffect(() => {
    // console.log('testando...', activeStep, steps.length);
    if (activeStep === steps.length) handleSubmit()
  }, [activeStep])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProjectData
          investigators={investigators}
          projectData={projectData}
          setProjectData={setProjectData}
        />;
      case 1:
        return <AddCenters
          investigators={investigators}
          projectData={projectData}
          setProjectData={setProjectData}
        />;
      case 2:
        return <Review
          projectData={projectData}
          teamLeaderName={teamLeaderName}
        />;
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

  const handleSubmit = () => {

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/projects`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": getCookieFromBrowser('token')
        },
        body: JSON.stringify(projectData)
      }).then(res => res.json())
      .then(data => {
        // console.log('10:data.status: ', data.status)
        if (data.status) {
          // console.log('10:data error: ', data)
          setStatusNumber(1)
        } else {
          // console.log('10:data: ', data)
          setProjectNumber(data.pkProject)
          setStatusNumber(0)
          setSubmitSuccess(true)
        }
        setOpenNotification({ ...openNotification, open: true })
      }).catch(error => {
        console.log('10:error ', error)
        alert('Ocorreu um erro no servidor!')
        throw (error)
      })
  }

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
                  {
                    submitSuccess ?
                      'Cadastro concluido.'
                      :
                      'Em processamento...'
                  }
                </Typography>
                {submitSuccess &&
                  <Typography variant="subtitle1">
                    {/* 'O projecto número #1234 foi criado com sucesso e será publicado após aprovação do conselho.' */}
                    O projecto número #{projectNumber} foi criado com sucesso e será publicado após aprovação do conselho.
                  </Typography>
                }
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

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={errorStatus.severity[statusNumber]}
          sx={{ width: '100%' }}
        >
          {errorStatus.message[statusNumber]}
        </Alert>
      </Snackbar>

    </ThemeProvider>
  );
}