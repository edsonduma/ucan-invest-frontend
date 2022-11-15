import axios from "axios";
import { getCookieFromBrowser } from "../utils/cookie";

export const uploadImage = async (id, token, file) => {

  return axios.patch(`${process.env.NEXT_PUBLIC_BASE_URI}/projects/upload-image/${id}`, file, {
    headers: {
      "Authorization": token,
    }
  })
  .then(data => {return data})
  .catch(err => {console.log(err)})
}

export async function findUnpprovedProjects() {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/projects/unpproved`)
}

export async function approveProject(project, id) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/projects/${id}`, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getCookieFromBrowser('token')
    },
    body: JSON.stringify(project)
  })
}

export async function saveProject(
  token, setProjectNumber, setStatusNumber,
  setSubmitSuccess, setOpenNotification, projectData, openNotification) {

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/projects`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(projectData)
      }).then(res => res.json())
      .then(data => {
        // console.log('10:data.status: ', data.status)
        if (data.status) {
          // console.log('10:data error: ', data)
          setStatusNumber(1)
        } else {
          // console.log('10:data: ', data)
          setProjectNumber(data.pkProject)
          setStatusNumber(0)
          setSubmitSuccess(true)
        }
        setOpenNotification({ ...openNotification, open: true })
        return data
      }).catch(error => {
        console.log('10:error ', error)
        alert('Ocorreu um erro no servidor!')
        throw (error)
      })
}