import React, {useEffect} from "react";
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import Registration from './Registration';
import Profile from './Profile';
import {useState} from "react";
import '../styles/Style.css';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";


function Authorization() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(false);
    const {user, loading, error} = useSelector(state => state.user);
    const {loginAction} = useActions();
    const navigate = useNavigate();

    const checkUser = async (e) =>{
        e.preventDefault();
        try{
            await loginAction(email, password);
            setFormValid(false);
            console.log(user)
        }catch(error){
            console.log(error.message)
           setFormValid(true);
        }

    }

    useEffect(() => {
        if(!error && user) {
            navigate('/profile');
        }
    }, [error, user])

    return (
        <section className="auth">
            <form className='form' onSubmit={checkUser}>
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
                <button disabled={formValid} type={'submit'}>SIGN UP</button>
                <div className="dha">
                    Don't have an account yet?
                    <Link to="/registration">Sign up</Link>
                </div>
            </form>
        </section>
    )
}

export default Authorization;