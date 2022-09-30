import axios from "axios";
import { getCookieFromBrowser } from "../utils/cookie";

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