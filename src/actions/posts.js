import * as api from '../api';

export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const {data} = await api.fetchPosts(page);
        const action = { type: 'FETCH_ALL', payload: data };
        //console.log(data);
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const {data} = await api.fetchPost(id);
        const action = { type: 'FETCH_SINGLE_POST', payload: data };
        //console.log(data);
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        const action = { type: 'FETCH_BY_SEARCH', payload: data };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
        //console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const createThePost = (thePost) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const {data} = await api.createPost(thePost);
        const action = { type: 'CREATE', payload: data };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateThePost = (id,updatedPost) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id,updatedPost);
        const action = { type: 'UPDATE', payload: data };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteThePost = (id) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        await api.deletePost(id);
        const action = { type: 'DELETE', payload: id };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const likeThePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        const action = { type: 'LIKE', payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const commentPost = (id,commentBody) => async(dispatch) => {
    try {
        const {data} = await api.commentPost(id,commentBody);
        const action = { type: 'COMMENT', payload: data };
        dispatch(action);
        return data.comments;
    } catch (error) {
        console.log(error.message);
    }
}