import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { Box, Chip, createTheme, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { getCookieFromBrowser } from '../../../utils/cookie';

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

export default function AddInvestigadors({ investigators, centerData, setCenterData }) {

    const [areasOfActivity, setAreasOfActivity] = useState([])

    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/area-activity`, {
        headers: {
          "Authorization": getCookieFromBrowser('token')
        }
      })
        .then(res => res.json())
        .then(data => {
          // console.log('1:areasOfActivity: ', data)
          setAreasOfActivity(data)
        })
    }, [])
    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Selecione
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="demo-multiple-chip-label">Investigadores</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={centerData?.members}
              onChange={e => {
                const {
                  target: { value },
                } = e;
                setCenterData({
                  ...centerData,
                  members: typeof value === 'string' ? value.split(',') : value,
                })
              }}
              input={<OutlinedInput id="select-multiple-centers" label="Selecione os Investigadores" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(item => (
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
                  style={getStyles(item.person.firstname, investigators, theme)}
                >
                {item.person.firstname} {item.person.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <FormControl sx={{ width: 505 }}>
            <InputLabel id="demo-multiple-chip-label">Areas de Actuação</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={centerData?.areaOfActivities}
              onChange={e => {
                const {
                  target: { value },
                } = e;
                setCenterData({
                  ...centerData,
                  areaOfActivities: typeof value === 'string' ? value.split(',') : value,
                })
              }}
              input={<OutlinedInput id="select-multiple-centers" label="Selecione as Area de Actuação" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(item => (
                    <Chip key={item.pkAreaOfActivity} label={item.designation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {areasOfActivity.map(item => (
                <MenuItem
                  key={item.pkAreaOfActivity}
                  value={item}
                  style={getStyles(item.designation, areasOfActivity, theme)}
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
