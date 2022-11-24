import React from "react"
import{Routes, Route, Link} from 'react-router-dom'
import Authorization from './Authorization';
import Registration from './Registration';
import Load from "./Load";
import Games from "./Games";
import Board from "./Board";
import Profile from "./Profile";

function App(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Load/>}/>
            <Route path="/authorization" element={<Authorization/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/games" element={<Games/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>

        </>
    );
}
export default App;
