// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieDetails from './Components/MovieDetails';
import Navbar from './Components/Navbar';
import Aboutus from './Components/Aboutus';
import AddMovies from './Components/AddMovies';
//import AddMovies12 from './Components/AddMovies12';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<MovieDetails/>}></Route>
    <Route path='/aboutus' element={<Aboutus/>}></Route>
    <Route path='/addmovies' element={<AddMovies/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
