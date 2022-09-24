import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '/components/_copyright';
import MyAppBar from '/components/_my-app-bar';
import { useState, useEffect } from 'react';
// import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { HEROKU_BASE_URL } from '../../utils/constants';
import { getCookieFromBrowser } from '../../utils/cookie';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function getStyles(item, typeOfAccount, theme) {
  return {
    fontWeight:
    typeOfAccount.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NewResearcher() {

  const errorStatus = {
    message: ['Salvo com sucesso!', 'Erro ao salvar!'],
    severity: ['success', 'error']
  }

  const [openNotification, setOpenNotification] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open} = openNotification
  const [statusNumber, setStatusNumber] = useState(-1)

  const [typeOfAccounts, setTypeOfAccounts] = useState([])
  const [localities, setLocalities] = useState([])
  const [countries, setCountries] = useState([])
  const [provinces, setProvinces] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])

  // data of account
  const [typeOfAccountSelected, setTypeOfAccountSelected] = useState(1)
  const [myLocality, setMyLocality] = useState(1)
  const [country, setCountry] = useState(1)
  const [province, setProvince] = useState(1)
  const [municipality, setMunicipality] = useState(1)
  const [neighborhood, setNeighborhood] = useState(1)
  const [district, setDistrict] = useState(1)

  const [account, setAccount] = useState({
    username: '',
    password: '',
    typeOfAccount: {
      pkTypeOfAccount: 1
    }
  })
  
  // data of person
  const [person, setPerson] = useState({
    firstname: '',
    lastname: '',
    nif: '',
    birthday_date: '',
    street: '',
    houseNumber: 0,
    locality: {
      pkLocality: 1
    },
    district: {
      pkLocality: 1
    }
  })

  const handleClose = () => setOpenNotification({ ...openNotification, open: false })

  // data of person
  // const [firstname, setFirstname] = useState('')
  // const [lastname, setLastname] = useState('')
  // const [nif, setNif] = useState('')
  // const [birthdayDate, setBirthdayDate] = useState('')
  // const [street, setStreet] = useState('')
  // const [houseNumber, setHouseNumber] = useState('')


  //on select a country
  const handleProvinces = (e) => {
    const value = e.target.value
    setCountry(valuexios.get(`${HER}/places/under/${value}`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
    .then((response) => {
      const places = response.data
      setProvinces(places)
      if (places[0])
        setProvince(places[0].pkLocality)
    })
  }

  //on select a municipality
  const handleMunicipalities = (e) => {
    console.log('init')
    const value = e.target.value
    setProvince(valuexios.get(`${HER}/places/under/${value}`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
    .then((response) => {
      const places = response.data
      // console.log('handleMunicipalities', places)
      setMunicipalities(places)
      if (places[0])
        setMunicipality(places[0].pkLocality)
    })
  }

  //on select a province
  // const handleNeighborhood = (e) => {
  //   const value = e.target.value
  //   setMunicipality(value)
  /xios.get(`${HER}/places/under/${value}`, {
  //     headers: {
  //       "Authorization": getCookieFromBrowser('token')
  //     }
  //   })
  //   .then((response) => {
  //     const places = response.data
  //     setNeighborhood(places)
  //     if (places[0])
  //       setMunicipality(places[0].pkLocality)
  //   })
  // }

  const handleChangeTypeOfAccount = (event) => {
    const {
      target: { value },
    } = event;
    setTypeOfAccounts(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {xios.get(`${HER}/type_of_account`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
    .then((response) => {
      setTypeOfAccounts(response.data)
    })xios.get(`${HER}/places/countries`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
    .then((response) => {
      setCountries(response.data)
    })xios.get(`${HER}/places`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
    .then((response) => {
      setLocalities(response.data)
    })

    // fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/type_of_account`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log('5:data: ', data)
    //   setTypeOfAccounts(data)
    // })

    // fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/places`)
    // .then(res => res.json())
    // .then(data => setLocalities(data))
    
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()

    account.typeOfAccount.pkTypeOfAccount = typeOfAccountSelected

    person.locality.pkLocality = myLocality
    person.district.pkLocality = district

    console.log('2:data: ',
      account,
      'username',
      account.username,
      'another data: ',
      person
    )

    //   firstname,
    //   lastname,
    //   nif,
    //   birthdayDate,
    //   street,
    //   houseNumber
    // )

    // fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/people`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     nif: nif,
    //     firstname: firstname,
    //     lastname: lastname,
    //     birthday_date: birthdayDate,
    //     street: street,
    //     houseNumber: houseNumber,
    //   })
    // }).then(res=> res.json())
    // .then(data => {
    //   console.log('3:data: ', data)

    //   if (data.status === 200) {
    //     setFirstname('')
    //     setLastname('')
    //     setNif('')
    //     setBirthdayDate('')
    //     setStreet('')
    //     setHouseNumber('')
    //   }
    // })

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigators`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        account: account,
        person: person
      })
    }).then(res => res.json())
    .then(data => {
      console.log('4:data: ', data, data.status)

      if (!data.status) {
        // setFirstname('')
        // setLastname('')
        // setNif('')
        // setBirthdayDate('')
        // setStreet('')
        // setHouseNumber('')

        setAccount({
          username: '',
          password: '',
          typeOfAccount: {
            pkTypeOfAccount: 1
          }
        })
        setPerson({
          firstname: '',
          lastname: '',
          nif: '',
          birthday_date: '',
          street: '',
          houseNumber: 0,
          locality: {
            pkLocality: 1
          },
          district: {
            pkLocality: 1
          }
        })

        // alert('cadastrado com sucesso!')
        setStatusNumber(0)
        setOpenNotification({...openNotification, open: true })

      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <MyAppBar />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Novo Pesquisador
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Digite o Nome"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="Nome"
                  autoFocus
                  value={person.firstname}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Apelido"
                  name="lastname"
                  autoComplete="Digite o Apelido"
                  value={person.lastname}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nif"
                  label="Numero de BI"
                  name="nif"
                  autoComplete="Digite o numero do BI"
                  value={person.nif}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="birthday_date"
                  // label="Data de Nascimento"
                  type="date"
                  id="birthday_date"
                  autoComplete="Digite a Data de Nascimento"
                  value={person.birthday_date}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 395 }}>
                  <InputLabel id="country">País</InputLabel>
                  <Select
                    labelId="País"
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleProvinces}
                    input={<OutlinedInput label="country" />}
                    // multiple
                    // MenuProps={MenuProps}
                  >
                    {countries.map(country => (
                      <MenuItem
                        key={country.pkLocality}
                        value={country.pkLocality}
                        style={getStyles(country, localities, theme)}
                      >
                        {country.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 395 }}>
                  <InputLabel id="province">Provincia</InputLabel>
                  <Select
                    labelId="Provincia"
                    id="province"
                    name="province"
                    value={province}
                    onChange={handleMunicipalities}
                    input={<OutlinedInput label="Provincia" />}
                    // multiple
                    // MenuProps={MenuProps}
                  >
                    {provinces.map(province => (
                      <MenuItem
                        key={province.pkLocality}
                        value={province.pkLocality}
                        style={getStyles(province, localities, theme)}
                      >
                        {province.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 395 }}>
                  <InputLabel id="municipality">Municipio</InputLabel>
                  <Select
                    labelId="Municipio"
                    id="municipality"
                    name="municipality"
                    value={municipality}
                    onChange={e => setMyLocality(e.target.value)}
                    input={<OutlinedInput label="Municipio" />}
                    // multiple
                    // MenuProps={MenuProps}
                  >
                    {municipalities.map(itmunicipality => (
                      <MenuItem
                        key={municipality.pkLocality}
                        value={municipality.pkLocality}
                        style={getStyles(item, localities, theme)}
                      >
                        {municipality.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 395 }}>
                  <InputLabel id="bairro">Bairro</InputLabel>
                  <Select
                    labelId="Bairro"
                    id="bairro"
                    name="bairro"
                    value={neighborhood}
                    onChange={e => setMyLocality(e.target.value)}
                    input={<OutlinedInput label="Bairro" />}
                    // multiple
                    // MenuProps={MenuProps}
                  >
                    {neighborhoods.map(item => (
                      <MenuItem
                        key={item.pkLocality}
                        value={item.pkLocality}
                        style={getStyles(item, localities, theme)}
                      >
                        {item.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Rua"
                  id="street"
                  autoComplete="street"
                  value={person.street}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="houseNumber"
                  label="Numero da Casa"
                  id="houseNumber"
                  autoComplete="houseNumber"
                  value={person.houseNumber}
                  onChange={e => setPerson({...person, [e.target.name]: e.target.value})}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nome de Utilizador"
                  name="username"
                  autoComplete="Digite o Nome de Utilizador"
                  value={account.username}
                  onChange={e => setAccount({...account, [e.target.name]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Senha"
                  name="password"
                  type="password"
                  autoComplete="Digite a Senha"
                  value={account.password}
                  onChange={e => setAccount({...account, [e.target.name]: e.target.value})}
                />
              </Grid>

              {/* <FormControl sx={{ m: 1, width: 300 }}> */}
              <Grid item xs={12}>
                <FormControl sx={{ width: 395 }}>
                  <InputLabel id="type_of_account">Tipo de Conta</InputLabel>
                  <Select
                    labelId="Tipo de Conta"
                    id="type_of_account"
                    name="type_of_account"
                    value={typeOfAccountSelected}
                    onChange={e => setTypeOfAccountSelected(e.target.value)}
                    input={<OutlinedInput label="Tipo de Conta" />}
                    // multiple
                    // MenuProps={MenuProps}
                  >
                    {typeOfAccounts.map(item => (
                      <MenuItem
                        key={item.pkTypeOfAccount}
                        value={item.pkTypeOfAccount}
                        style={getStyles(item, typeOfAccounts, theme)}
                      >
                        {item.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
        {/* <Copyright sx={{ mt: 22, mb: 4 }} /> */}
      </Container>

      {/* Footer */}
      <Box
        style={{ marginTop: '21.5vh' }}
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
        anchorOrigin={{vertical, horizontal}}
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