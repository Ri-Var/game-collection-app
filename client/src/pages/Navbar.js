import React, { useState } from "react";
import { Outlet ,Link } from "react-router-dom";

import "./Navbar.css"

function UserProfileIcon() {
    const token = localStorage.getItem('token');

    if (token) {
        return (
            <>
                <Link to="/profile" className="link">
                    <p>User</p>
                </Link>
            </>
        )
    }

    return (
        <>
            <Link to='/Login' className="link">
                <p>Login</p>
            </Link>
        </>
    )
}

function Navbar() {

    const [search, setSearch] = useState('')

    return (
        <>
            <div className="navbar">
                <Link to={"/"} className="link"><h1>CGS Games</h1></Link>
                <input placeholder="Search..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Link to = {"/about"} className="link"><p>About The Creator</p></Link>
                <UserProfileIcon/>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar