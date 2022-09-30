import React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { approveProject } from "../../api/projects";
import Router from "next/router";

let globalId;

const ProjectCard = ({id, title, subtitle, teamLeader}) => {
  globalId = id
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Investigador Lider: ${teamLeader.person.firstname} ${teamLeader.person.lastname}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" size="large" onClick={handleApprove}>
          Aprovar
        </Button>
      </CardActions>
    </Card>
  )
}

async function handleApprove() {
  const newProject = {
    "title": null,
    "subtitle": null,
    "pdfFile": null,
    "teamLeader": null,
    "approved": true
  }

  await approveProject(newProject, globalId)
  Router.push('/ui/approve-projects')
}

export default ProjectCard