import React, {useEffect} from "react";
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import Authorization from './Authorization';
import Profile from './Profile';
import {useState} from "react";
import '../styles/Style.css';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";

function Registration() {

    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState('');
    const navigate = useNavigate();
    const {user, loading, error} = useSelector((state) => state.user);
    const {registerAction} = useActions();


    const register = async (e) =>{
        e.preventDefault();
        try{
            await registerAction(email, password, login);
            console.log(user)
        }catch(error){
            console.log(error.message);
        }


    }
    useEffect(() => {
        if(!error && user && login && password) {
            navigate('/profile');
        }else if(!user && login && password && !loading){
            alert('Такой юзверь существует')
        }
    }, [error, user])


    const loginHandler=(e)=>{
        setLogin(e.target.value)
        const re = /^[a-zA-Z\-]+$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setLoginError('Only characters A-Z, a-z and \'-\' are  acceptable.')
        }else{
            setLoginError("")
        }
    }
    const emailHandler=(e)=>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('email is not valid')
        } else{
        setEmailError("")
        }
    }
    const passwordHandler=(e)=>{
        setPassword(e.target.value)
        let minNum= 2;
        let maxNum = 10;
        const re = /^[a-zA-Z0-9!@#$%^&*]+$/;
        if(!re.test(String(e.target.value).toLowerCase()) || (String(e.target.value).toLowerCase()>maxNum || String(e.target.value).toLowerCase()<minNum)) {
            setPasswordError('password is not valid')
        }else{
        setPasswordError("")
        }
    }
    useEffect(()=>{
        console.log(user)
    if (loginError || emailError || passwordError){
        setFormValid(false)
    }else{
        setFormValid(true)
    }},[loginError, emailError,passwordError, user, loading])



    return (
        <section className="signup">
            <form className='form' onSubmit={register}>
                <div>
                    <h2>Sign up</h2>
                </div>
                <input onChange={loginHandler}  name='login' type="text" placeholder='Enter your login'/>
                <div style={{color: 'red'}}>{loginError}</div>
                <input onChange={emailHandler} name='email' type="email" placeholder='Enter your email'/>
                <div style={{color: 'red'}}>{emailError}</div>
                <input onChange={passwordHandler} name='password' type="password" placeholder='Enter your password'/>
                <div style={{color: 'red'}}>{passwordError}</div>
                <button type={'submit'} disabled={!formValid} >SIGN UP</button>
                <div className="aha">
                    Already a member?
                    <Link to="/authorization">Log in</Link>
                </div>
            </form>
        </section>
    )
}
export default Registration;