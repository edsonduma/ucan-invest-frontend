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

function getStyles(name, centers, theme) {
  return {
    fontWeight:
      centers.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddCenters() {

  const [centers, setCenters] = useState([])
  
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters`)
    .then(res => res.json())
    .then(data => {
      console.log('1:centers: ', data)
      setCenters(data)
    })

  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCenters(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
              value={centers}
              onChange={handleChange}
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
              {centers.map(item => (
                <MenuItem
                  key={item.pkInvestigationCenter}
                  value={item}
                  style={getStyles(item.designation, centers, theme)}
                >
                {item.designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
