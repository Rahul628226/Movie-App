import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

const AddMovies12 = () => {
  const [mname, setMname] = useState('');
  const [actor, setActor] = useState('');

  const addCategory = async () => {
    try {
      const response = await axios.post('https://movie-app-ap.vercel.app/api/addMovie', {
        mname,
        actor,
      });
      console.log(response.data);
      setMname('');
      setActor('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory();
  };

  return (
    <div style={{ paddingTop: '120px' }}>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Movie Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Movie Name"
                value={mname}
                onChange={(e) => setMname(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Actor"
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Movie
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddMovies12;


