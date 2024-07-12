import React, { useEffect , useState} from "react";
import {jwtDecode} from 'jwt-decode'; // Correct the import here
import { useNavigate } from "react-router-dom";

function User() {

    const navigate = useNavigate();
    const [body, setBody] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setBody(decodedToken);
        }

    }, [])

    if (!body) {
        return <div><h3>Loading...</h3></div>
    }

    function handleLogout() {
        navigate('/');
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="user-box">
            <h2>User Profile</h2>
            <p>Username: {body.username}</p>
            <p>Name: {body.name}</p>
            <p>Email: {body.email}</p>
            <button type="button" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default User;