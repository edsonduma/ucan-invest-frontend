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

const theme = createTheme();

export default function Project() {

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
    projects.map(item =>{
      console.log('item: ', item, item.cover);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <MyAppBar />

      <div className={styles.container}>
        <div className={styles.panel_centros}>
          <div className={styles.centros}>
            <h2>Centros</h2>
            <ul>
              {centers.map(item =>
                <li key={item.pkProject}>
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

              {/* <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                  <input type="text" value="jkfhsjkdhfdjkfhdsfkjhfkjsdfhsdkjfdhskjfhdfjkhfhdsjkhfskjfhdjkkfhjk" />
                </div>
              </div> */}

              {
                projects.map(item =>
                  <div 
                    key={item.pkProject}
                    className={styles.project}
                  >
                    <div className={styles.foto}>
                      {/* <img src="/img/covers/caricatura_resgatedosvalores.jpeg" alt="myProject" /> */}
                      <img src={`/img/covers/${item.cover}`} alt={item.description} />
                    </div>
                    <div className={styles.descricao}>
                      <h2>{item.title}</h2>
                      <button className={styles.button}>Ver mais</button>
                    </div>
                  </div>
                  // <>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  //   <div 
                  //     className={styles.project}
                  //   >
                  //     <div className={styles.foto}>
                  //       <img src="/img/logoCEIC.jpg" alt="myProject" />
                  //     </div>
                  //     <div className={styles.descricao}>
                  //       <h2>{item.title}</h2>
                  //       <button className={styles.button}>Ver mais</button>
                  //     </div>
                  //   </div>
                  // </>
                )
              }
              {/* <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.foto}>
                  <img src="/img/logo.png" alt="" />
                </div>
                <div className={styles.descricao}>
                  <h2>Titulo</h2>
                  <button className={styles.button}>Ver mais</button>

                </div>
              </div> */}
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

    </ThemeProvider>
  );
}