import { React, useState, useEffect } from 'react';
import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { useAuth } from "./context/AuthProvider";
import { useCookies } from "react-cookie";

export const Landing = () => {
  const { value } = useAuth();
  const [everyone, setEveryone] = useState([]);
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    axios.post(
      "https://localhost:8000/users/contacts", {username: cookie['username']})
      .then(response => {
        setEveryone(response.data);
      })
  }, [cookie]);

  const addFav = async (name) => {
    console.log(name);
    let everyone_else = everyone.filter((item) => (item.username !== name));
    let person = {fav: true, username: name};
    setEveryone([...everyone_else, person]);
    await axios.post(
      "https://localhost:8000/users/addFav", {username: cookie['username'], add: name}) 
  };


  const removeFav = async (name) => {
    console.log(name);
    let everyone_else = everyone.filter((item) => (item.username !== name));
    let person = {fav: false, username: name};
    setEveryone([...everyone_else, person]);
    await axios.post(
      "https://localhost:8000/users/removeFav", {username: cookie['username'], add: name}) 

  };

  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {value.username}</div>
      <Grid
        container
        spacing={1}
        align = "center"
        justifyContent = "center">
        <Grid item xs={6}>
          <Typography
            style={{
              color: 'white'
            }}
          >
            Everyone
          </Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="everyone"
          >
          {everyone.filter((item) => (item.fav === false)).map((item) => (
            <ListItem disablePadding>
              <ListItemButton
                key={item.username}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
              >
                <IconButton
                  name={item.username}
                  onClick={(e) => { addFav(e.currentTarget.name) }}
                >
                  <StarIcon />
                </IconButton>
                <ListItemText
                  sx={{color: 'black' }}
                  primary={item.username}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{
              color: 'white'
            }}
          >
            Favorites
          </Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="favorites"
          >
          {everyone.filter((item) => (item.fav === true)).map((item) => (
            <ListItem disablePadding>
              <ListItemButton
                key={item.username}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
              >
                <IconButton
                  name={item.username}
                  onClick={(e) => { removeFav(e.currentTarget.name) }}
                sx={{ color: 'secondary.main' }}
                >
                  <StarIcon />
                </IconButton>
                <ListItemText
                  sx={{color: 'black' }}
                  primary={item.username}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
