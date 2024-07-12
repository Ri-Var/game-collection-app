import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './Home.css'
import { Link } from "react-router-dom";

function Cards({ data }) {
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <>
                {
                    data.map((item) => (
                        <Link to={'/games'} state={item} className="link" >
                            <div className="game-card">
                                <img src={item.src} alt="img" />
                                <h4>{item.name}</h4>
                            </div>
                        </Link>
                    ))
                }
            </>
        )
    }

    return (
        <>
            {
                data.map((item) => (
                    !item.loginrequired ?
                        <div className="game-card">
                            <img src={item.src} alt="img" />
                            <h4>{item.name}</h4>
                        </div> : null
                ))
            }
        </>
    )
}

function Home() {

    const [data, setData] = useState(null);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/games');
                setData(response.data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div className="home">
            <div className="game-container">
                <Cards data={data} />
            </div>
            {
                (!token) ? <p>Login to access more games</p> : null
            }
        </div>
    )
}

export default Home;