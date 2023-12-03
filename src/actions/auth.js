import * as api from '../api';

//signin a user
export const signin = (formData,navigate) => async(dispatch) => {
    try {
        const {data} = await api.signin(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log(error.message);
    }
}

//signup a user
export const signup = (formData,navigate) => async(dispatch) => {
    //const navigate = useNavigate();
    try {
        const {data} = await api.signup(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log(error.message);
    }
}