import React from "react"
import{Routes, Route, Link} from 'react-router-dom'
import Authorization from './components/Authorization';
import Registration from './components/Registration';
import Load from "./components/Load";
import Games from "./components/Games";
import Board from "./components/Board";
import Profile from "./components/Profile";

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
