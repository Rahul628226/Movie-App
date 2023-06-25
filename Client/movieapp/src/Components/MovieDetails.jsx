import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Grid,
} from '@mui/material';

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    _id: '',
    mname: '',
    actor: '',
    actress: '',
    director: '',
    releasedYear: '',
    camera: '',
    producer: '',
    language: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/api/movieList?search=${searchQuery}`);
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3500/api/delete/${id}`);
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSelectMovie = (id) => {
    if (selectedMovies.includes(id)) {
      setSelectedMovies((prevSelected) => prevSelected.filter((movieId) => movieId !== id));
    } else {
      setSelectedMovies((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleEditClick = (movie) => {
    setEditedMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:3500/api/updateitem/${editedMovie._id}`, editedMovie);
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie._id === editedMovie._id ? editedMovie : movie))
      );
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.mname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '150px', gap: '20px' }}>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <Table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              MOVIE_NAME
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              ACTOR
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              ACTRESS
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              DIRECTOR
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              RELEASED_YEAR
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              CAMERA
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              PRODUCER
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
              LANGUAGE
            </TableCell>
            <TableCell style={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMovies.map((movie) => (
            <TableRow key={movie._id}>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.mname}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.actor}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.actress}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.director}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.releasedYear}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.camera}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.producer}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                {movie.language}
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc' }}>
                {/* <Button variant="outlined" onClick={() => handleSelectMovie(movie._id)}>
                  {selectedMovies.includes(movie._id) ? 'Deselect' : 'Select'}
                </Button> */}
                <Button variant="outlined" onClick={() => handleEditClick(movie)}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => deleteMovie(movie._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Movie Name"
            type="text"
            name="mname"
            value={editedMovie.mname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Actor"
            type="text"
            name="actor"
            value={editedMovie.actor}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Actress"
            type="text"
            name="actress"
            value={editedMovie.actress}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Director"
            type="text"
            name="director"
            value={editedMovie.director}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Released Year"
            type="text"
            name="releasedYear"
            value={editedMovie.releasedYear}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Camera"
            type="text"
            name="camera"
            value={editedMovie.camera}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Producer"
            type="text"
            name="producer"
            value={editedMovie.producer}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Language"
            type="text"
            name="language"
            value={editedMovie.language}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDetails;







