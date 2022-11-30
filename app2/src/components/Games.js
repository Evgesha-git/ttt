import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/Games.css';
import {Routes, Route, Link} from 'react-router-dom'
import {Button, Modal, Space} from 'antd';
import {useSelector} from "react-redux";
import { ref, child, push, update, runTransaction} from "firebase/database";
import {database} from "../utils/firebase-config";
import {useObject} from "react-firebase-hooks/database";
import { useActions } from '../hooks/useActions';


function Square(props) {
    return (
        <button className="square" onClick={() =>
            props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (<Square value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}

const Game = () => {
    const {addGames} = useActions();
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const [playerSide, setPlayerSide] = useState('');
    const [status, setStatus] = useState('');
    const {user} = useSelector(state => state.user);
    const [snapshots, loading, error] = useObject(ref(database, `users/${user.userId}`));

    const chooseSide = (player) => {
        setPlayerSide(player);
    }

    const handleClick = (i) => {
        const h = history.slice(0, stepNumber + 1);
        const current = history[h.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        if (playerSide == "X") {
            squares[i] = isNext ? 'x' : 'O';
        } else if (playerSide == "O" +
            "") {
            squares[i] = isNext ? 'O' : 'x';
        }

        setHistory(history.concat([{squares: squares,}]));
        setStepNumber(h.length);
        setIsNext(!isNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setIsNext((step % 2) == 0);
        setHistory(history.slice(0, step + 1));
    }

    const moves = history.map((step, move) => {
        const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    useEffect(() => {
        if(snapshots){
            console.log(snapshots.val());
        }
        const winner = calculateWinner(history[stepNumber].squares);
        if (winner){
            setStatus(`Выйграл ${winner}`);
            if(winner.toUpperCase() === playerSide){
                const game = {
                    date: new Date(),
                    type: 'win',
                }
                addGames(user.userId, user, game, true);
            }else{
                const game = {
                    date: new Date(),
                    type: 'win',
                }
                addGames(user.userId, user, game, false);
            }
        }else {
            setStatus(`Следующий ход: ${isNext ? "X" : "O"}`);
            if (history[stepNumber].squares.every(el => el)) setStatus('Ничья');
        }
    }, [status, playerSide, history]);


    return (
        <>
            {playerSide === "" ?
                (
                   <section>
                        <div className="wsdyc">
                            <h3>which side you choose&</h3>
                            <button onClick={() => chooseSide('X')}>X side</button>
                            <button onClick={() => chooseSide('O')}>0 side</button>
                        </div>
                    </section>
                ) : (
                    <>
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
                        <div>
                            <div className="game">
                                <div className="game-board">
                                    <Board
                                        squares={history[stepNumber].squares}
                                        onClick={(i) => handleClick(i)}
                                    />
                                </div>
                                <div className="game-info">
                                    <div className="next-step">{status}</div>
                                    <ol>{moves}</ol>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}


function calculateWinner(squares) {
    if(!squares) return;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

export default Game;