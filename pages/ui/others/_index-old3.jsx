import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}










// import styles from "../styles/Home.module.css";
// import Switch from "@mui/material/Switch";
// import { Card } from "@mui/material";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// const Home = () => {
//   return (
//     <div className={styles.container}>
//       {/* <div>
//        <span>With default Theme:</span>
//      </div>
//      <Switch {...label} defaultChecked />
//      <Switch {...label} />
//      <Switch {...label} disabled defaultChecked /> */}








//       <Card variant="outlined">{card}</Card>
//     </div>
//   );
// }

// export default Home