import React from "react"
import { useLocation } from "react-router-dom";

import './GameInfo.css'

function GameInfo() {

    const item = useLocation().state;
    return (
        <div className="game-info-box">
            <h2>{item.name}</h2>
            <div className="game-info-subbox">
                <img src={item.src} alt="img" />
                <div className="game-info">
                    <p>{item.tag}</p>
                    <p>{item.description}</p>
                    <a href={item.download}>Download The Game</a>
                </div>
            </div>
            <div className="comment-section">
                <h2>Comments</h2>
            </div>
        </div>
    )
}

export default GameInfo;