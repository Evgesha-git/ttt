import React, {useEffect} from 'react';
import {Routes, Rout, Link, Route, useNavigate} from 'react-router-dom';
import Games from './Games';
import Board from './Board';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";




function Profile() {
    const { user, loading, error } = useSelector((state) => state.user);
    const {logOut} = useActions()
    const location = useNavigate();

    const logOutComp = async () =>{
        try{
            await logOut();
            location('/authorization');

        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(() => {
        console.log(user);
    })

    if(!user){
        return <h1>Ожидаем...</h1>
    }

    return (!loading) ? (
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
                    <h1>{user.user.email}</h1>
                </div>
                <div>
                    <button onClick={logOutComp}>Log out</button>
                </div>
            </seciton>
        </>
    ) : (
        <h1>Идет загрузка</h1>
    )
}

export default Profile;