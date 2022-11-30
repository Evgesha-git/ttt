import React from "react"
import{Routes, Route, Link} from 'react-router-dom'
import {useState} from "react";
import '../styles/Style.css';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";
import { getDatabase, ref, child, get } from "firebase/database";
import {useObjectVal} from "react-firebase-hooks/database";


function Board(){
    const [snapshot, loading, error] = useObjectVal(child(ref(getDatabase()), `users`))
    const {user} = useSelector(state => state.user);
    const dbRef = ref(getDatabase());
    // get(child(dbRef, `users`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // }).catch((error) => {
    //     console.error(error);
    // });
    if(!loading){
        console.log(Object.keys(snapshot));
    }

    return(
        <>
            <nav>
                <Link to="/games"><button>Game</button></Link>
                <Link to="/board"><button>Board</button></Link>
                <Link to="/profile"><button>Profile</button></Link>
            </nav>
            <div>
                <h3>Board</h3>
                {!loading ? Object.keys(snapshot).map(v => {
                    return (
                        <div key={v}>
                            <div>{snapshot[v].name}</div>
                            <div>{snapshot[v].games}</div>
                            <div>{snapshot[v].wins}</div>
                            <div>{snapshot[v].falls}</div>
                        </div>
                    )
                }) : <h1>Loading...</h1>}
            </div>
        </>
    )
}
export default Board;