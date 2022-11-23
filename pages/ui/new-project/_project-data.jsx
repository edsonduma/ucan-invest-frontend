import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, createTheme, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
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

  const handleChange = ({ target }) => {

    if (target.files) {
      const file = target.files[0]
      console.log('file', file)
      setProjectData({...projectData, [target.name]: file})
    }
  }

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
          {/* <TextField
            required
            id="cover"
            name="cover"
            label="Capa"
            fullWidth
            autoComplete="Selecione a capa do projecto"
            variant="standard"
            value={projectData?.cover}
            onChange={e => setProjectData({
              ...projectData,
              [e.target.name]: e.target.value
            })}
          /> */}

          {/* <Button
            variant="contained"
            component="label"
          >
            Selecione a capa do projecto
            <input
              type="file"
              // hidden
              id="cover"
              name="cover"
              value={projectData?.cover}
              onChange={e => setProjectData({
                ...projectData,
                [e.target.name]: e.target.value
              })
            }
            />
          </Button> */}

          <TextField
            type="file"
            required
            id="cover"
            name="cover"
            label="Cover"
            fullWidth
            autoComplete="Cover"
            variant="standard"
            // value={centerData?.image}
            onChange={handleChange}
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
            {/* <TextField
              fullWidth
              select
            /> */}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}