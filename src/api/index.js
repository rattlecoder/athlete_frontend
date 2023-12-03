import axios from "axios";

const url = 'http://localhost:9000/api/v1/posts';


//const API = axios.create({ baseURL: 'http://localhost:9000/api/v1' });
//const API = axios.create({ baseURL: 'https://memories-mern-backend-seven.vercel.app/api/v1' });
const API = axios.create({ baseURL: 'https://athlete-backend.onrender.com/api/v1' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers["x-auth-token"] = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

/*export const fetchPosts = async () => {
    //axios.get(url);
    const data = await axios.get(url);
    return data;
}*/

//get all posts
export const fetchPosts = async (page) => {
    //axios.get(url);
    const data = await API.get(`/posts?page=${page}`);
    return data;
}

//get post for an Id
export const fetchPost = async (id) => {
    const data = await API.get(`/posts/show/${id}`);
    return data;
}

//get posts by searchQuery and tags
export const fetchPostsBySearch = async (searchQuery) => {
    const data = await API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
    return data;
}

//create a post
export const createPost = async (newPost) => {
    //axios.get(url);
    const data = await API.post('/posts',newPost);
    return data;
}

//update a post
export const updatePost = async (id,updatedPost) => {
    //axios.get(url);
    const data = await API.patch(`/posts/${id}`,updatedPost);
    return data;
}

//delete a post
export const deletePost = async (id) => {
    const data = await API.delete(`/posts/${id}`);
    return data;
}

//like a post
export const likePost = async (id) => {
    const data = await API.patch(`/posts/${id}/likePost`);
    return data;
}

//comment on a post
export const commentPost = async (id,commentBody) => {
    const data = await API.post(`/posts/${id}/comment`,{commentBody});
    return data;
}


/*                          
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts',newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`,newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}/`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}/`,newPost);
*/

//signup a user
export const signup = async(formData) => {
    const data = await API.post('/users/signup',formData);
    return data;
}

//signin a user
export const signin = async(formData) => {
    const data = await API.post('/users/signin',formData);
    return data;
}