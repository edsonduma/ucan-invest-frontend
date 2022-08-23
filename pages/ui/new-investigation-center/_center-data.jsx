import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

export default function CenterData() {

  const [projectData, setProjectData] = useState({
    title: "",
    subtitle: "",
    pdfFile: "",
    teamLeader: {
      pkInvestigator: 0,
    }
  })

  const [investigationCenterData, setInvestigationCenterData] = useState({})

  // useEffect(() => {

  //   fetch(`${process.env.NEXT_PUBLUC_}/projects`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: {
  //       "title": title,
  //       "subtitle": subtitle,
  //       "pdfFile": pdfFile,
  //     }
  //   })
  //     .t 

  // }, [])

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
          <TextField
            required
            id="team_leader"
            name="team_leader"
            label="Lider do Projecto"
            fullWidth
            autoComplete="Lider do Projecto"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="action_field"
            name="action_field"
            label="Area de Actuacao"
            fullWidth
            autoComplete="Digite a Area de Actuacao"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="college"
            name="college"
            label="Faculdade"
            fullWidth
            autoComplete="Digite a Faculdade"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}