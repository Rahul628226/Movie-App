import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

const AddMovies = () => {
    const [inp, setInp] = useState({
        mname: '',
        actor: '',
        actress: '',
        director: '',
        releasedYear: '',
        camera: '',
        producer: '',
        language: '',
        language1: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const inpHandler = (e) => {
        const { name, value } = e.target;
        setInp((inp) => ({ ...inp, [name]: value }));
    };

    const clickHandler = async () => {
        try {
            const response = await axios.post('movie-app-ap.vercel.app/api/addMovie', inp);
            console.log(response.data);

            setSuccessMessage('Movie added successfully!');

            setInp({
                mname: '',
                actor: '',
                actress: '',
                director: '',
                releasedYear: '',
                camera: '',
                producer: '',
                language: '',
                language1: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ paddingTop: '120px' }}>
            <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Movie Details
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Movie Name"
                                onChange={inpHandler}
                                name="mname"
                                value={inp.mname}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Actor"
                                onChange={inpHandler}
                                name="actor"
                                value={inp.actor}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Actress"
                                onChange={inpHandler}
                                name="actress"
                                value={inp.actress}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Director"
                                onChange={inpHandler}
                                name="director"
                                value={inp.director}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Released Year"
                                onChange={inpHandler}
                                name="releasedYear"
                                value={inp.releasedYear}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Camera"
                                onChange={inpHandler}
                                name="camera"
                                value={inp.camera}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Producer"
                                onChange={inpHandler}
                                name="producer"
                                value={inp.producer}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Language"
                                onChange={inpHandler}
                                name="language"
                                value={inp.language}
                                fullWidth

                            />

                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                onChange={inpHandler}
                                name="language"
                                value={inp.language1}
                                style={{ display: inp.language1 ? 'block' : 'none' }}
                            />
                        </Grid>

                        {successMessage && (
                            <Typography variant="body1" align="center" color="success" gutterBottom>
                                {successMessage}
                            </Typography>
                        )}

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" onClick={clickHandler}>
                                Add Movie
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default AddMovies;
