import React, { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmPass] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function RegisterOnClick(e) {
        e.preventDefault();
        setError(''); // clear any previous errors
        try {
            const url = "http://localhost:5000/api/users"
            const data = { username: username, name: name, email: email, password: password };
            const { data: res } = await axios.post(url, data)
            navigate('/login')
            console.log(res.message);
        } catch (error) {
            if (error.message && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className="register-box">
            <div>
                <h3>Register</h3>
                <form>
                    <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="text" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <input type="text" value={confirmpass} required onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" />
                    <input type="button" value={'Register'} onClick={RegisterOnClick} />
                </form>
                {error && <p>{error}</p>}
            </div>
            <div>
                <h3>Have an account already?</h3>
                <Link to="/login">
                    <button type="button">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Register;