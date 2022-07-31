import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      <Link color="inherit" target="_blank" href="https://www.ucan.persistec.com/">
        UCAN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}