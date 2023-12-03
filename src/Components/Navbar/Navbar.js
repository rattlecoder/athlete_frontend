import React, { useEffect, useState, Fragment } from 'react';
import useStyles from './styles';
import { Container,AppBar,Typography,Grow,Grid, Toolbar, Avatar, Button } from '@material-ui/core';
import img from '../../Images/mig2.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from "axios";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

//const url = 'https://express-vercel-demo-app.vercel.app/api/v1/posts';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [a,seta] = useState(0);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        //console.log('useeffect called = ',user);
        const token = user?.token;

        if(token){
            const decodedToken = jwtDecode(token);
            //console.log('decoded token',decodedToken);
            if(decodedToken.exp*1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        //console.log('useeffect called = ',user);
    },[location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
        setUser(null);
    }

  return (
       <AppBar className={classes.appBar} position='static' color='inherit'>
          <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.image} src={img} alt='memories' height='90' />
          </div>
          <Toolbar className={classes.toolbar}>
             { user?.result ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                  <Button variant='contained' className={classes.logout} onClick={logout} color='secondary'>Logout</Button>
                </div>
             ) : (
               
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                
             )

             }
          </Toolbar>
       </AppBar>
  )
}

export default Navbar
