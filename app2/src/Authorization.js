import React, {useEffect} from "react";
import {Link, Route, Routes} from 'react-router-dom'
import Registration from './Registration';
import Profile from './Profile';
import {useState} from "react";
import './styles/Style.css';
import {nanoid} from "nanoid";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase-config";

function Authorization() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(false)
    //const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || [])

    const checkUser = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth, email, password)
            //setFormValid(false)
            console.log(user)
        }catch(error){
            console.log(error.message)
           // setFormValid(true)
        }

    }

    /*function checkUser() {
        let isExists = users.some(user => user.login === login && user.password === password)
        if (isExists) {
            users.find(user => user.login === login && user.password === password);
            setFormValid(false);
        } else {
            setLoginError("User doesn\'t exists");
            setFormValid(true);
        }

        /!*
                users.map((user) => {
                    if (user.login !== login) {
                        setLoginError("User doesn\'t exists");
                        setFormValid(true)
                    } else if (user.password !== password) {
                        setPasswordError("Wrong password")
                        setFormValid(true)
                    } else if (user.login !== login && user.password !== password) {
                        setLoginError("User doesn\'t exists");
                        setPasswordError("Wrong password");
                        setFormValid(true)
                    } else {
                        setLoginError("")
                        setPasswordError("")
                        setFormValid(false)
                    }
                })
        *!/

    }*/


    return (
        <section className="auth">
            <form1>
                <div className="authorization">
                    <h2>Log in</h2>
                </div>
                <input onChange={(event) => {
                    setEmail(event.target.value)
                    setFormValid(false)
                }} name='email' type="text" placeholder='Enter your email'/>
                <div style={{color: 'red'}}>{emailError}</div>
                <input onChange={(event) => {
                    setPassword(event.target.value)
                    setFormValid(false)
                }} name='password' type="password" placeholder='Enter your password'/>
                <div style={{color: 'red'}}>{passwordError}</div>
                <button disabled={formValid} onClick={checkUser}>SIGN UP</button>
                <form action='/profile'>

                </form>
                <div className="dha">
                    Don't have an account yet?
                    <a href="/registration">Sign up</a>
                </div>
            </form1>
            {/*  <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>*/}
        </section>
    )
}

export default Authorization;