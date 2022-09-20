import axios from "axios";
import { LOCAL_BASE_URL } from "../utils/constants";

export function authenticate(username, password) {
  axios.post(`${LOCAL_BASE_URL}/authenticate`, {
    username,
    password
  })
  .then((response) => {
    return response.data
  })
}