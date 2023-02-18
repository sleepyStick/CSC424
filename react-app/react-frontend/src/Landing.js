import { React, useState, useEffect } from 'react';
import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  const { value } = useAuth();
  const [everyone, setEveryone] = useState([]);

  useEffect(() => {
    // call an API and in the success or failure fill the data buy using setData function
    // it could be like below
    // ApiCall()
    //   .then(response => setData(response))
    //   .catch(err => setError(err))
    setEveryone([
      { fav: false, username: 'random' },
      { fav: false, username: 'person' },
      { fav: true, username: 'iwho' }
    ])
  }, []);

  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {value.token}</div>
      <Grid
        container
        spacing={1}
        align = "center"
        justifyContent = "center">
        <Grid item xs={6}>
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
                  onClick={(e) => {
                    console.log(e.currentTarget.name);
                    let everyone_else = everyone.filter((item) => (item.username !== e.currentTarget.name));
                    let person = {fav: true, username: e.currentTarget.name};
                    setEveryone([...everyone_else, person]);
                  }}
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
                  onClick={(e) => {
                    console.log(e.currentTarget.name);
                    let everyone_else = everyone.filter((item) => (item.username !== e.currentTarget.name));
                    let person = {fav: false, username: e.currentTarget.name};
                    setEveryone([...everyone_else, person]);
                  }}
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
