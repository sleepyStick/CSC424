import axios from "axios";

export async function register(username, password) {
  const response = await axios.post(
    "http://localhost:8000/account/register", {username, password})
  if (response.status === 200) {
    return '2342f2f1d131rf12'
  }
  return 
};
