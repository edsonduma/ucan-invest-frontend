import { AppBar, Button, CssBaseline, Link, Toolbar, Typography } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MyAppBar() {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <MonetizationOnIcon sx={{ mr: 2 }} /> */}
                    <img src="/img/logoCEIC.jpg" alt="ucanic" style={{
                        maxWidth: 120,
                        marginRight: '10px',
                        borderRadius:'30px',
                        boxShadow: '1px 2px 9px black'
                    }}  />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        {/* UCAN Projects */}
                    </Typography>
                    <nav>
                        {/* <Box sx={{ bgcolor: 'primary.main' }}>

                </Box> */}
                        <Link
                            variant="button"
                            // color="text.secondary"
                            color="inherit"
                            href="/ui/projects"
                            // sx={{ my: 1, mx: 1.5 }}
                            sx={{ bgcolor: 'primary.main' }}
                        >
                            Home
                        </Link>
                        <Link
                            variant="button"
                            // color="text.secondary"
                            color="inherit"
                            href="/ui/new-project"
                            sx={{ my: 1, mx: 1.5 }}
                            // sx={{ bgcolor: 'primary.main' }}
                        >
                            Novo Projecto
                        </Link>
                        <Link
                            variant="button"
                            color="inherit"
                            // color="text.primary"
                            href="/ui/new-researcher"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Novo Investigador
                        </Link>
                        <Link
                            variant="button"
                            // color="text.primary"
                            color="inherit"
                            href="/ui/about"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Ajuda
                        </Link>
                    </nav>
                    <Button style={{ backgroundColor: 'white' }} href="/" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        <LogoutIcon />
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}