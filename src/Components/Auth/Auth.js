import React, { Fragment, useState } from 'react';
import { Container,AppBar,Typography,Grow,Grid, Toolbar, Avatar, Button, Paper } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import useStyles from './styles.js';
import Input from './Input.js';
import GoogleLogin from 'react-google-login';
import Icon from './Icon.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth.js';

const Auth = () => {

    const initialData = { firstName:'', lastName:'', email:'', password:'', confirmPassword: '' };

    const classes = useStyles();
    const [isSignup, setSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        if(isSignup){
            dispatch(signup(formData,navigate));
        }
        else{
            dispatch(signin(formData,navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setSignup((prev) => !prev);
        setShowPassword(false);
    }

  return (
    <Container component='main' maxWidth='xs'>
       <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
              <LockOpenOutlined/>
          </Avatar>
          <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                  { isSignup && (
                    <Fragment>
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                    </Fragment>
                  ) }
                  <Input name='email' label='Email' handleChange={handleChange} type='email' />
                  <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
              </Grid>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
              <Grid justifyContent='flex-end'>
                 <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                    </Button>
                 </Grid>
              </Grid>
          </form>
       </Paper>
    </Container>
  )
}

export default Auth
