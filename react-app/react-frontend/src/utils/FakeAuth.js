import axios from "axios";
import { SHA256 } from 'crypto-js';

export async function fakeAuth(username, password) {
  // hash password before sending it
  const crypt = SHA256(password).toString();
  const response = await axios.post(
    "https://localhost:8000/account/login", {username, crypt})
  if (response.status === 200) {
    return response.data.token
  }
  return 
};
