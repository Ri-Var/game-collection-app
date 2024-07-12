import React from "react";

import { Route, Routes } from "react-router-dom"

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import GameInfo from "./pages/GameInfo"
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
    return (
        <div className="body">
            <Routes>
                <Route exact path="/" element={<Navbar/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                    <Route path="/profile" element={<User/>}></Route>
                    <Route path="/games" element={<GameInfo/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
                <Route path= "/signup" element={<Register/>} />
                <Route path= "/login" element={<Login/>} />
            </Routes>
        </div>
    )
}

export default App;