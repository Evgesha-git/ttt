import React from 'react';
import {Routes, Rout, Link, Route} from 'react-router-dom';
import Games from './Games';
import Board from './Board';

function Profile() {
    return (
        <>
            <seciton className="profile">
                <nav>
                    <Link to="/games">
                        <button>Game</button>
                    </Link>
                    <Link to="/board">
                        <button>Board</button>
                    </Link>
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                </nav>
                <div className="title">
                    <h1>Name</h1>
                </div>
            </seciton>
        </>
    )
}

export default Profile;