import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { createTheme, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import axios from 'axios';
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

export default function CenterData({ investigators, faculties }) {

  const [projectData, setProjectData] = useState({
    title: "",
    subtitle: "",
    pdfFile: "",
    teamLeader: {
      pkInvestigator: 0,
    }
  })

  const [investigationCenterData, setInvestigationCenterData] = useState({})

  const [teamLeaderSelected, setTeamLeaderSelected] = useState('')
  const [collegeSelected, setcollegeSelected] = useState('')



  useEffect(() => {

    // fetch(`${process.env.NEXT_PUBLUC_}/projects`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: {
    //     "title": title,
    //     "subtitle": subtitle,
    //     "pdfFile": pdfFile,
    //   }
    // }) 

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
            id="name"
            name="name"
            label="Nome"
            fullWidth
            autoComplete="Digitar o Nome"
            variant="standard"
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
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="teamLeader">Responsavel do Centro</InputLabel>
            <Select
              labelId="Lider do Projecto"
              id="teamLeader"
              name="teamLeader"
              value={teamLeaderSelected}
              onChange={e => setTeamLeaderSelected(e.target.value)}
              input={<OutlinedInput label="Lider do Projecto" />}
              // multiple
              // MenuProps={MenuProps}
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
            <InputLabel id="college">Faculdade</InputLabel>
            <Select
              labelId="Faculdade"
              id="college"
              name="college"
              value={collegeSelected}
              onChange={e => setcollegeSelected(e.target.value)}
              input={<OutlinedInput label="Selecione a Faculdade" />}
              // multiple
              // MenuProps={MenuProps}
            >
              {faculties?.map(item => (
                <MenuItem
                  key={item.pkCollege}
                  value={item.pkCollege}
                  style={getStyles(item, faculties, theme)}
                >
                  {item.designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            required
            id="team_leader"
            name="team_leader"
            label="Lider do Projecto"
            fullWidth
            autoComplete="Lider do Projecto"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <TextField
            id="action_field"
            name="action_field"
            label="Area de Actuação"
            fullWidth
            autoComplete="Digite a Area de Actuação"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <TextField
            required
            id="college"
            name="college"
            label="Faculdade"
            fullWidth
            autoComplete="Digite a Faculdade"
            variant="standard"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}