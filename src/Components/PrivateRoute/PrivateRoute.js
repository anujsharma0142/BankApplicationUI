// import { isE } from '@rc-component/mini-decimal/es/numberUtil';
import React, {useEffect,useState} from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function Privateroute() {
    const navigate = new useNavigate();
    const getToken = () => {
        let token = localStorage.getItem("token");
        if (token === null || token.length === 0) return null;
        return token;
    }
    const isTokenExpired=()=>{
        const token= localStorage.getItem("token");
        return Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
    }

    if(getToken()!=null && !isTokenExpired()) {
        return <Outlet/>
    }
    else{
        localStorage.clear();
        useEffect(()=> {navigate('/login')}, []);
    }
}