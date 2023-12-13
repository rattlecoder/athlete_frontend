import { TextField, Icon, InputAdornment, Grid, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';

const Input = ({name,half,handleChange,label,autoFocus,type,handleShowPassword}) => {
  return (
    <grid xs={12} sm={half ? 6 : 12}>
       <TextField 
         name={name}
         onChange={handleChange}
         variant='outlined'
         required
         fullWidth
         label={label}
         autoFocus={autoFocus}
         type={type}
         style = {{ width: '350px' }}
         InputProps={ name==='password' && {
            endAdornment: (
                <InputAdornment position='end'>
                   <IconButton onClick={handleShowPassword}>
                      {type==='password' ? <Visibility/> : <VisibilityOff/>}
                   </IconButton>
                </InputAdornment>
            )
         } }
       />
    </grid>
  )
}

export default Input
