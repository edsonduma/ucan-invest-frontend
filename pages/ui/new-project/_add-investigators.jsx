import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddInvestigadors({ investigators }) {

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
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
            <InputLabel id="demo-multiple-chip-label">Investigadores</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
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
              {investigators.map(item => (
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
