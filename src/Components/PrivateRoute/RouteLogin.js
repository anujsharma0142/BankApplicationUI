import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function RouteLogin() {
    const navigate = new useNavigate();
    useEffect(() => {navigate('/login')}, []);
}