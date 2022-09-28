import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Review({ projectData, teamLeaderName }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumo
      </Typography>
      <List disablePadding>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={projectData?.title} secondary={projectData?.subtitle} />
          <Typography variant="body2">{teamLeaderName}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
        </ListItem>
      </List>
    </React.Fragment>
  );
}