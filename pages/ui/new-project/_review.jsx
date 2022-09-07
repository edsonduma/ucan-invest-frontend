import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// const products = [
//   {
//     name: 'Product 1',
//     desc: 'A nice thing',
//     price: '$9.99',
//   },
//   {
//     name: 'Product 2',
//     desc: 'Another thing',
//     price: '$3.45',
//   },
//   {
//     name: 'Product 3',
//     desc: 'Something else',
//     price: '$6.51',
//   },
//   {
//     name: 'Product 4',
//     desc: 'Best thing of all',
//     price: '$14.11',
//   },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
const products = [
  {
    name: 'Projecto teste',
    type: 'Novo Projecto',
    author: 'Edson Duma',
  },
];

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