import React from "react";
import {Link} from "react-router-dom";
import './styles/Style.css';
function Load(){
    return(
        <section className="load">
            <div className="load-wrapper">
                <div className="title">
                    <h1>Tic-tac-toe</h1>
                </div>
                <div className="sign">
                    <Link to='/authorization'><button>Log in</button></Link>
                </div>
            </div>
        </section>
    )
}

export default Load;