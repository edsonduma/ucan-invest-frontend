import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CenterData from './_center-data';
import AddInvestigadors from './_add-investigators';
import Review from './_review';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookieFromBrowser } from '../../../utils/cookie';
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { saveInvestigationCenter, uploadImage } from '../../../api/centers';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Dados do Centro', 'Investigadores e Areas de Actuação', 'Rever os Dados'];

const theme = createTheme();

export default function NewCenter() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter()

  const [investigators, setInvestigators] = useState([])
  const [centerLeaderName, setCenterLeaderName] = useState('')
  const [centerNumber, setCenterNumber] = useState('')

  const [centerData, setCenterData] = useState({
    designation: "",
    description: "",
    image: "",
    centerLeader: {
      pkInvestigator: '',
    },
    faculties: {
      pkCollege: '',
    },
    members: [],
    areaOfActivities: []
  })

  // handleSubmit and fix errors
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

  const handleClose = () => {
    setOpenNotification({ ...openNotification, open: false })

    setTimeout(() => {
      router.replace('/ui/new-investigation-center')
    }, 1000 * 6)
  }

  useEffect(() => {

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

  useEffect(() => {
    investigators.find(e => {
      if (e.pkInvestigator === centerData.centerLeader.pkInvestigator)
        setCenterLeaderName(e.person.firstname + ' ' + e.person.lastname)
    })
  }, [centerData.centerLeader.pkInvestigator])

  useEffect(() => {
    if (activeStep === steps.length) handleSubmit()
  }, [activeStep])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CenterData
          investigators={investigators}
          centerData={centerData}
          setCenterData={setCenterData}
        />;
      case 1:
        return <AddInvestigadors
          investigators={investigators}
          centerData={centerData}
          setCenterData={setCenterData}
        />;
      case 2:
        return <Review
          centerData={centerData}
          centerLeaderName={centerLeaderName}
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

  const handleSubmit = async () => {

    const savedCenter = await saveInvestigationCenter(centerData,
      getCookieFromBrowser('token'),
      setStatusNumber,
      setCenterNumber,
      setSubmitSuccess,
      setOpenNotification,
      openNotification)

      setCenterNumber(savedCenter.pkInvestigationCenter)

    let imageData = new FormData()
    imageData.append('file', centerData.image)
    uploadImage(savedCenter.pkInvestigationCenter, getCookieFromBrowser('token'), imageData)

  }

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
                  {
                    submitSuccess ?
                      'Cadastro concluido.'
                      :
                      'Em processamento...'
                  }
                </Typography>
                {submitSuccess &&
                  <Typography variant="subtitle1">
                    O centro número #{centerNumber} foi criado com sucesso.
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
          sx={{ width: '110%' }}
        >
          {errorStatus.message[statusNumber]}
        </Alert>
      </Snackbar>

    </ThemeProvider>
  );
}