import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <AppBar style={{ background: "blue", height: "100px" }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
          <Typography variant='h5' color='white'>Movie Management App</Typography>
          <div>
          <Button style={{ color: 'white' }}><Link to={'/'} style={{ textDecoration: 'none', color: "White", fontSize: "20px" }}>Home</Link></Button>
          <Button style={{ color: 'white' }}><Link to={'/addmovies'} style={{ textDecoration: 'none', color: "White", fontSize: "20px" }}>Add Movie</Link></Button>
          <Button style={{ color: 'white' }}><Link to={'/aboutus'} style={{ textDecoration: 'none', color: "White", fontSize: "20px" }}>About us</Link></Button>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

