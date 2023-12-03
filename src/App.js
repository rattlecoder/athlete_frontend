import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container} from '@material-ui/core';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';

function App() {
   const user = JSON.parse(localStorage.getItem('profile'));
   //console.log(user);
  return (
    <BrowserRouter>
       <Container maxwidth='xl'>
          <Navbar/>      
          <Routes>
             <Route path="/" element={ <Navigate to='/posts'/> } />
             <Route path="/posts" element={<Home/>} />
             <Route path="/posts/search" element={<Home/>} />
             <Route path="/posts/:id" element={<PostDetails/>} />
             <Route path="/auth" element={ user ? <Navigate to='/posts'/> : <Auth/> } />
          </Routes>
       </Container>
    </BrowserRouter>
  );
}

export default App;
