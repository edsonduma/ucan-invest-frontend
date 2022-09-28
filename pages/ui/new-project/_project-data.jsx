import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useState, useEffect } from 'react';

const theme = createTheme();

function getStyles(item, typeOfAccount, theme) {
  return {
    fontWeight:
    typeOfAccount.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ProjectData({ investigators, projectData, setProjectData }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descrição do Projecto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Nome"
            fullWidth
            autoComplete="Digite o Nome"
            variant="standard"
            value={projectData?.title}
            onChange={e => setProjectData({
              ...projectData,
              [e.target.name]: e.target.value
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="subtitle"
            name="subtitle"
            label="Descrição"
            fullWidth
            autoComplete="Digite a Descrição"
            variant="standard"
            value={projectData?.subtitle}
            onChange={e => setProjectData({
              ...projectData,
              [e.target.name]: e.target.value
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="teamLeader">Lider do Projecto</InputLabel>
            <Select
              labelId="Lider do Projecto"
              id="teamLeader"
              name="teamLeader"
              value={projectData?.teamLeader.pkInvestigator}
              onChange={e => setProjectData({
                  ...projectData,
                  teamLeader: {
                    pkInvestigator: e.target.value
                  }
                })}
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
      </Grid>
    </React.Fragment>
  );
}