import axios from "axios";
import { SHA256 } from 'crypto-js';

export async function register(username, password) {
  // hash password before sending it
  const crypt = SHA256(password).toString();
  console.log(crypt, username, password);
  // const response = await fetch(`https://localhost:8000/account/register`, {
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({username, crypt}),
  //   });
  const response = await axios.post(
    "https://localhost:8000/account/register", {username, crypt})
  console.log(response);
  if (response.status === 200) {
    console.log(response);
    return response.data
  }
  console.log(response.status)
  return 
};
