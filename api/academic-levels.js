import axios from "axios";
import { getCookieFromBrowser } from "../utils/cookie";

export async function findAllAcademicLevel() {
  console.log('findAllAcademicLevel', getCookieFromBrowser('token'))
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/academicLevels`, {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2NjMzODM3MiwiaWF0IjoxNjY1NzMzNTcyfQ.lAY1_599j6vI7FkAxr7lWotjHWFh_YPG9VxOqiFTy9-sKj_clzBefyZY-qc_-TTL7hImbmwFBCpH4Ca4kailjg'
    }
  })
}