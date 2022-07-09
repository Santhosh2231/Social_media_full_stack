import * as api from "../api";
import {AUTH, LOGOUT} from "../constants/actionTypes";

export const logout = ()=> async (dispatch)=>{
    dispatch({type: LOGOUT});
}

export const signin = (formData,navigate)=> async (dispatch) =>{
    try {
        //  log in the user

        const { data } = await api.signIn(formData);

        dispatch({type: AUTH,data});


        // to navigate to home page
        navigate("/",{replace:true});
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData,navigate)=> async (dispatch) =>{
    try {
        //  signup the user

        const { data } = await api.signUp(formData);

        dispatch({type: AUTH,data});

        // to navigate to home page
        navigate("/",{replace:true});
    } catch (error) {
        console.log("Sanr");
        console.log(error);
    }
}

