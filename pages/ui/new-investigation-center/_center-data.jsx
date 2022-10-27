import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { createTheme, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { getCookieFromBrowser } from '../../../utils/cookie';

const theme = createTheme();

function getStyles(item, typeOfAccount, theme) {
  return {
    fontWeight:
      typeOfAccount.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CenterData({ investigators, centerData, setCenterData }) {

  // const [investigationCenterData, setInvestigationCenterData] = useState({})
  // const [teamLeaderSelected, setTeamLeaderSelected] = useState('')
  // const [collegeSelected, setcollegeSelected] = useState('')

  const [colleges, setColleges] = useState([])

  const handleChange = name  => event => {
    const value = name === 'image' ? 
    event.target.files[0] : 
    event.target.value

    setCenterData({...centerData, [name]: value})
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/faculties`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log('1:colleges: ', data)
        setColleges(data)
      })
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descrição do Centro
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="designation"
            name="designation"
            label="Nome"
            fullWidth
            autoComplete="Digitar o Nome"
            variant="standard"
            value={centerData?.designation}
            onChange={e => setCenterData({
              ...centerData,
              [e.target.name]: e.target.value
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Descrição"
            fullWidth
            autoComplete="Descrição"
            variant="standard"
            value={centerData?.description}
            onChange={e => setCenterData({
              ...centerData,
              [e.target.name]: e.target.value
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="centerLeader">Responsável do Centro</InputLabel>
            <Select
              labelId="Responsável do Centro"
              id="centerLeader"
              name="centerLeader"
              value={centerData?.centerLeader.pkInvestigator}
              onChange={e => setCenterData({
                ...centerData,
                centerLeader: {
                  pkInvestigator: e.target.value
                }
              })}
              input={<OutlinedInput label="Responsável do Centro" />}
            >
              {investigators?.map(item => (
                <MenuItem
                  key={item.pkInvestigator}
                  value={item.pkInvestigator}
                  style={getStyles(item, investigators, theme)}
                >
                  {item.person.firstname} {item.person.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="faculties">Faculdade</InputLabel>
            <Select
              labelId="Faculdade"
              id="faculties"
              name="faculties"
              value={centerData?.faculties.pkCollege}
              onChange={e => setCenterData({
                ...centerData,
                faculties: {
                  pkCollege: e.target.value
                }
              })}
              input={<OutlinedInput label="Selecione a Faculdade" />}
            >
              {colleges.map(item => (
                <MenuItem
                  key={item.pkCollege}
                  value={item.pkCollege}
                  style={getStyles(item, colleges, theme)}
                >
                  {item.designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="file"
            required
            id="image"
            name="image"
            label="Imagem"
            fullWidth
            autoComplete="Imagem"
            variant="standard"
            // value={centerData?.image}
            onChange={handleChange('image')}
          />
          <span></span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}