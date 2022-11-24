import React from 'react';
import ReactDOM from 'react-dom/client';
import './/styles/Games.css';
import {Routes, Route, Link} from 'react-router-dom'
import {Button, Modal, Space} from 'antd';

/*class Choice extends React.Component{
    constructor(props){
        super(props);
        this.state={showChoise: true}
    }
    closeChoise=()=>{
        this.setState={showChoise: false}
    }
    render(){
        let playerSide = "X";
        //let playerX = document.querySelector(".BtnX");
        //let playerO = document.querySelector(".BtnO");
        return(
            <div className="choiseModal">
                <div className="content">
                    <div className="title">Select which one you want?</div>
                    <div className="choiseBtns">
                        <button className="BtnX" onClick={()=>{playerSide="X"
                            console.log(playerSide)}}>X</button>
                        <button className="BtnO" onClick={playerSide="O"}>O</button>
                    </div>
                </div>
            </div>
        );

        if(playerSide=="X"){
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<Game />);
        }
        if(playerSide==="O"){
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<Game />);
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Choice />);*/

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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isNext: true,
            playerSide: ""
        };
    }

    chooseXSide = () => {
        this.setState({playerSide: "X"})
    }
    choose0Side = () => {
        this.setState({playerSide: "0"})
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        if (this.state.playerSide == "X") {
            squares[i] = this.state.isNext ? 'x' : 'O';
        } else if (this.state.playerSide == "0") {
            squares[i] = this.state.isNext ? 'O' : 'x';

        }

        this.setState({
            history: history.concat([{squares: squares,}]),
            stepNumber: history.length,
            isNext: !this.state.isNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step, isNext: (step % 2) == 0,
        });
    }


    render() {
        const playerSide = this.state.playerSide
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        const handleCansel = () => {
            this.setState({visible: false});
        }


        const success = () => {
            Modal.success({
                title: 'GAME OVER!',
                content: 'The winner is ' + winner,

            });
        };
        const deadheat = () => {
            Modal.success({
                content: 'Dead heat ', title: 'Game over!',
                onOk() {
                    return <Game/>
                },
            });
        };
        if (history.length < 10) {
            if (winner) {
                status = 'Выиграл ' + winner;
                success();
            } else {
                if (this.state.playerSide == "X") {
                    status = `Следующий ход: ${this.state.isNext ? "X" : "O"}`;
                } else if (this.state.playerSide == "0") {
                    status = `Следующий ход: ${this.state.isNext ? "O" : "X"}`;
                }

            }
        }
        if (history.length == 10) {
            if (!winner) {
                status = 'Ничья';
                deadheat();
            } else {

                status = 'Выиграл ' + winner;
                success();

            }
        }


        return (
            <>
                {this.state.playerSide === "" ?
                    (
                        <div>
                            <button onClick={this.chooseXSide}>X side</button>
                            <button onClick={this.choose0Side}>0 side</button>
                        </div>
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
                                            squares={current.squares}
                                            onClick={(i) => this.handleClick(i)}
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
}


function calculateWinner(squares) {
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