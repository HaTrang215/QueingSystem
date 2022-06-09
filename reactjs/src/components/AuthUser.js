import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){

    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('tokent');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const uedrString = sessionStorage.getItem('tokent');
        const user_detail = JSON.parse(uedrString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        header:{
            "Content-type" : "application/json"
        }
    });
    return{
        setToken:saveToken,
        token,
        user,
        getToken,
        http
    }
}