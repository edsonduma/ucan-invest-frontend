import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAppBar from '/components/_my-app-bar';
import Copyright from '/components/_copyright';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './Projects.module.css';
import { getCookieFromBrowser } from '../../../utils/cookie';
import Image from 'next/image';
import { Link, ListItem, ListItemText } from '@mui/material';

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [centers, setCenters] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/projects`
    ).then((response) => {
      console.log('projects: ', response.data);
      setProjects(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getCookieFromBrowser('token')
        }
      }
    ).then((response) => {
      // console.log('centers: ', response.data);
      setCenters(response.data)
    })
  }, [])

  const showProjectsById = (pkInvestigationCenter) => {
    console.log('pkProject: ', pkInvestigationCenter);
    projects.map(item => {
      console.log('item: ', item, item.cover);
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.panel_centros}>
          <div className={styles.centros}>
            <h2>Centros</h2>
            <ul>
              {centers.map(item =>
                <li key={item.pkInvestigationCenter}>
                  <button
                    className={styles.button}
                    onClick={() => showProjectsById(item.pkInvestigationCenter)}
                  >
                    {item.designation}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.panel_listagem}>
          <form className={styles.form}>
            <div className={styles.panel_search}>
              <select className={styles.select}>
                <option value="Nenhuma">Tipo de pesquisa</option>
                <option value="Projectos">Projectos</option>
                <option value="Centros">Centros</option>
              </select>
              <input className={styles.search} type="text" placeholder="Pesquise aqui!" />
              <button type="button" className={styles.button}>Buscar</button>
            </div>
            <div className={styles.container_project}>
              {
                projects.map(item =>
                  <div
                    key={item.pkProject}
                    className={styles.project}
                  >
                  {/* <div key={item.pkProject} className={styles.project}>
                    <div className={styles.foto}>
                      {item.image && (<Image src={item.image} alt={item.description} width={200} height={200} />)} */}
                      
                      {/* <img src={`/img/logos/${item.cover}`} alt={item.description} /> */}
                    <div className={styles.foto}>
                      <img src={`/img/covers/${item.cover}`} alt={item.description} />
                    </div>
                    <div className={styles.descricao}>
                      <h2>{item.title}</h2>

                      {/* <button 
                        // href={`/ui/projects/${item.pkProject}`}
                        className={styles.button}
                        >
                        Ver mais
                      </button> */}

                      <Link
                        // variant="button"
                        // color="inherit"
                        // sx={{ my: 1, mx: 1.5 }}
                        // sx={{ bgcolor: 'primary.main' }}
                        href={`/ui/projects/${item.pkProject}`}
                        // passHref
                      >
                        {/* Ver mais */}
                        <ListItem
                          button
                          component="a"
                          className={styles.button}
                        >
                          <ListItemText>Ver mais</ListItemText>
                        </ListItem>
                      </Link>

                    </div>
                  </div>
                )
              }
            </div>
          </form>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <Box
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
        style={{
          position: 'fixed',
          bottom: '0px',
          width: '100%'
        }}
      >
        <Container maxWidth="sm">
          {/* <Typography variant="body1">
                            UCAN Projects
                        </Typography> */}
          <Copyright />
        </Container>
      </Box>
      {/* End footer */}
    </>

  );
}