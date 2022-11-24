import React from "react"
import{Routes, Route, Link} from 'react-router-dom'
const Board = () =>{
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