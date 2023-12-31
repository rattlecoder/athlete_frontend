import React, { useEffect, useState } from 'react';
import { Container,AppBar,Typography,Grow,Grid,Paper,TextField,Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts,getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js';
import Pagination from '../Pagination.js';
import { useNavigate,useLocation,useSearchParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    //const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const [currentId, setCurrentId] = useState(null);
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(',') }));
            setSearchParams({ searchQuery: search || 'none', tags: tags.join(',') });
        }
        else{
            navigate("/");
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode===13){
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([ ...tags,tag ]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete));

    /*useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);*/

  return (
        <Grow in>
           <Container maxWidth='xl'>
               <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                   <Grid item xs={12} sm={6} md={9}>
                       <Posts setCurrentId={setCurrentId} />
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                       <AppBar className={classes.appBarSearch} position='static' color='inherit' >
                          <TextField
                            name='search'
                            variant='outlined'
                            label='Search memories'
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e)=>{ setSearch(e.target.value) }}
                          />
                          <ChipInput
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label='Search Tags'
                            variant='outlined'
                          />
                          <Button color='primary' variant='contained' onClick={searchPost} className={classes.searchButton}>Search</Button>
                       </AppBar>
                       <Form currentId={currentId} setCurrentId={setCurrentId} />
                       { (!searchQuery && !tags.length) && (
                        <Paper className={classes.pagination} elevation={6}>
                           <Pagination page={page}/>
                        </Paper>
                       ) }     
                   </Grid>
               </Grid>
           </Container>
       </Grow>
  )
}

export default Home
