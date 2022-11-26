import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { IconButton, ImageListItem, ImageListItemBar, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const theme = createTheme();

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function SingleProject() {

    const [singleProject, setSingleProject] = useState({})
    const router = useRouter()
    const { id } = router.query
    // console.log('pkProject', id)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/projects/${id}`)
            .then(res => {
                console.log('my project: ', res.data);
                setSingleProject(res.data)
            })
            .catch(err => {
                console.log(err)
                // router.replace('/ui/projects')
            })
    }, [id])

    return (
        <ThemeProvider theme={theme}>
            <MyAppBar />

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Projecto
                    </Typography>

                    {/* <CssBaseline /> */}
                    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                        {/* AQUI APRESENTAMOS PROJECTOS: {id} */}

                        <List disablePadding>

                            <ImageListItem key={singleProject.cover} cols={2} rows={2}>
                                <img
                                    {...srcset(`/img/covers/${singleProject.cover}`, 250, 200, 2, 2)}
                                    alt={singleProject.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={singleProject.title}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            aria-label={`star ${singleProject.title}`}
                                        >
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={singleProject.title} secondary={singleProject.subtitle} />
                                <Typography variant="body2">{singleProject.teamLeader?.person.firstname + ' ' + singleProject.teamLeader?.person.lastname}</Typography>
                            </ListItem>

                            {
                                singleProject.centers &&
                                <Typography component="h4" variant="h6" align="center">
                                    Centros
                                </Typography>
                            }

                            {singleProject.centers?.map((item, index) =>
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={item.designation} secondary={item.description} />
                                    <Typography variant="body2">Centro {index + 1}</Typography>
                                </ListItem>
                            )}

                            {
                                singleProject.guestsInvestigators &&
                                <Typography component="h4" variant="h6" align="center">
                                    Investigadores Convidados
                                </Typography>
                            }

                            {singleProject.guestsInvestigators?.map((item, index) =>
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={item.person.firstname + ' ' + item.person.lastname} />
                                    <Typography variant="body2">Investigador {index + 1}</Typography>
                                </ListItem>
                            )}

                        </List>
                    </Container>

                </Paper>
                {/* <Copyright /> */}
                {/* <Copyright sx={{ mt: 22, mb: 4 }} /> */}
            </Container>

            <Box
                style={{ marginTop: '14vh' }}
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            // style={{
            //     position: 'relative',
            //     bottom: '0px',
            //     width: '100%'
            // }}
            >
                <Container maxWidth="sm">
                    {/* <Typography variant="body1">
                        UCAN Projects
                    </Typography> */}
                    <Copyright />
                </Container>
            </Box>
        </ThemeProvider>
    );
}