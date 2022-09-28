import axios from "axios";

export function authenticate(username, password) {
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/authenticate`, {
    username,
    password
  })
  .then((response) => {
    return response.data
  })
}