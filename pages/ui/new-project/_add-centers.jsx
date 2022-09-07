import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput, Select, Box, MenuItem, Chip, createTheme,  } from '@mui/material';

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, list, theme) {
  return {
    fontWeight:
      list.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddCenters({ investigators, projectData, setProjectData }) {

  const [myCenters, setMyCenters] = useState([])

  // const [centersSelected, setCentersSelected] = useState([])
  // const [colaboratorsSelected, setColaboratorsSelected] = useState([])
  
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters`)
    .then(res => res.json())
    .then(data => {
      // console.log('1:myCenters: ', data)
      setMyCenters(data)
    })

  }, [])

  // useEffect(() => {
  //   console.log('centersSelected', centersSelected)
  //   console.log('colaboratorsSelected', colaboratorsSelected)
    
  //   setProjectData({
  //     ...projectData,
  //     centers: centersSelected,
  //     guestsInvestigators: colaboratorsSelected
  //   })
  // }, [centersSelected, colaboratorsSelected])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Selecione
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="demo-multiple-chip-label">Centros</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={projectData?.centers}
              onChange={e => {
                const {
                  target: { value },
                } = e;
                // setCentersSelected(
                //   // On autofill we get a stringified value.
                //   typeof value === 'string' ? value.split(',') : value,
                // );

                setProjectData({
                  ...projectData,
                  centers: typeof value === 'string' ? value.split(',') : value,
                })

                // changeCentersSelected(centersSelected)
              }}
              input={<OutlinedInput id="select-multiple-centers" label="Selecione os Centros" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(item => (
                    // <Chip key={item.pkInvestigationCenter} label={`${item.designation} ${item.person.lastname}`} />
                    <Chip key={item.pkInvestigationCenter} label={item.designation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {myCenters.map(item => (
                <MenuItem
                  key={item.pkInvestigationCenter}
                  value={item}
                  style={getStyles(item.designation, myCenters, theme)}
                >
                {item.designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>

          <FormControl sx={{ width: 505 }}>
            <InputLabel id="demo-multiple-chip-label">Colaboradores</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={projectData?.guestsInvestigators}
              onChange={e => {
                // colaboratorsSelected.push(e.target.value)
                // setColaboratorsSelected(e.target.value)
                
                const {
                  target: { value },
                } = e;

                // setColaboratorsSelected(typeof value === 'string' ? value.split(',') : value)
                // changeColaboratorsSelected(colaboratorsSelected)
    
                setProjectData({
                  ...projectData,
                  guestsInvestigators: typeof value === 'string' ? value.split(',') : value
                })
              }}
              input={<OutlinedInput id="select-multiple-investigators" label="Selecione os Investigadores" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(item => (
                    // <Chip key={item.pkInvestigator} label={`${item.person.firstname} ${item.person.lastname}`} />
                    <Chip key={item.pkInvestigator} label={`${item.person.firstname} ${item.person.lastname}`} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {investigators?.map(item => (
                <MenuItem
                  key={item.pkInvestigator}
                  value={item}
                  style={getStyles(`${item.person.firstname} ${item.person.lastname}`, investigators, theme)}
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
