import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import { findUnpprovedProjects } from "../../api/projects";
import ProjectCard from "../../components/approve-project/project-card.component";
import MyAppBar from "../../components/_my-app-bar";

export async function getServerSideProps() {  
  const response = await findUnpprovedProjects()
  const unpprovedProjects = response.data

  return {
    props: {
      unpprovedProjects
    }
  }

}

const theme = createTheme();

const ApproveProjects = ({ unpprovedProjects }) => {
  return (
    <ThemeProvider theme={theme}>
      <MyAppBar />
      <Container>
        {unpprovedProjects.map(({ pkProject,  ...otherProps}) => (
          <ProjectCard key={pkProject} id={pkProject} {...otherProps} />
        ))}
      </Container>
    </ThemeProvider>
  )
}

export default ApproveProjects