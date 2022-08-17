import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import FileInput from './_file-input';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ProjectData() {

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [pdfFile, setPdfFile] = useState('')

  // const [projectData, setProjectData] = useState({
  //   "title": "",
  //   "subtitle": "",
  //   "pdfFile": "",
  // })

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

  // useEffect(() => {

  //   fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/projects`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('data: ', data)
  //       setProjects(data)
  //     })

  // }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descrição do Projecto
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            id="project"
            name="project"
            label="Nome do Projecto"
            fullWidth
            autoComplete="shipping project"
            variant="standard"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            id="type"
            name="type"
            label="Tipo de Projecto"
            fullWidth
            autoComplete="shipping type"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          /> */}

          {/* <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button> */}

          <input
            accept="image/*"
            // className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
              fullWidth
              // variant="contained"
              variant="raised"
              component="span"
            >
              <AttachmentIcon />
              Anexo
            </Button>
          </label>

          {/* <FileInput label="Anexo" error={{ message: "Error" }} /> */}

        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="type"
            name="type"
            label="Tipo de Projecto"
            fullWidth
            autoComplete="shipping type"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}