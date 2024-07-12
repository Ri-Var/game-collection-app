import React, { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth"
            const data = { email: email, password: password };
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            window.location = '/';
            navigate('/');
        } catch (error) {
            if (error.message && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className="register-box">
            <div>
                <h3>Login to your Account</h3>
                <form>
                    <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="text" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <input type="button" value={'Login'} onClick={handleSubmit} />
                </form>
            </div>
            <div>
                <h3>New Here?</h3>
                <Link to="/signup">
                    <button type="button">Sign Up</button>
                </Link>
            </div>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login;