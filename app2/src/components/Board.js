import React from "react"
import{Routes, Route, Link} from 'react-router-dom'
import {useState} from "react";
import '../styles/Style.css';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";
import { getDatabase, ref, child, get } from "firebase/database";



function Board(){
    const {user} = useSelector(state => state.user);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user.user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return(
        <>
            <nav>
                <Link to="/games"><button>Game</button></Link>
                <Link to="/board"><button>Board</button></Link>
                <Link to="/profile"><button>Profile</button></Link>
            </nav>
            <div>
                <h3>Board</h3>
            </div>
        </>
    )
}
export default Board;