import axios from "axios";
import { getCookieFromBrowser } from "../utils/cookie";

export async function findAllAcademicLevel() {
  console.log('findAllAcademicLevel', getCookieFromBrowser('token'))
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/academicLevels`, {
    headers: {
      'Authorization': getCookieFromBrowser('token')
    }
  })
}