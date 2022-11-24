import React, {useEffect} from "react";
import { nanoid } from 'nanoid'
import {Link, Route, Routes} from 'react-router-dom'
import Authorization from './Authorization';
import Profile from './Profile';
import {useState} from "react";
import './styles/Style.css';
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import {auth} from './firebase-config'

function Registration() {
   // const [users, setUsers]=useState(()=> JSON.parse(localStorage.getItem('users'))||[])

    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState('')



    const register = async () =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password,login)
        }catch(error){
            console.log(error.message);
        }


    }

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
    if (loginError || emailError || passwordError){
        setFormValid(false)
    }else{
        setFormValid(true)
    }},[loginError, emailError,passwordError])


    /*useEffect(()=> {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])*/

   /* function createNewUser() {
        const newUser = {
            id: nanoid(),
            login: login,
            email: email,
            password: password,

        }
        setUsers((prevUsers) => [newUser, ...prevUsers])
    }
*/

    return (
        <section className="signup">
            <form1>
                <div>
                    <h2>Sign up</h2>
                </div>
                <input onChange={loginHandler}  name='login' type="text" placeholder='Enter your login'/>
                <div style={{color: 'red'}}>{loginError}</div>
                <input onChange={emailHandler} name='email' type="email" placeholder='Enter your email'/>
                <div style={{color: 'red'}}>{emailError}</div>
                <input onChange={passwordHandler} name='password' type="password" placeholder='Enter your password'/>
                <div style={{color: 'red'}}>{passwordError}</div>
                <form action='/profile'>
                    <button disabled={!formValid} onClick={register}>SIGN UP</button>
                </form>
                <div className="aha">
                    Already a member?
                    <a href="/authorization">Log in</a>
                </div>
            </form1>
            {/*<Routes>
                <Route path="/authorization" element={<Registration/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>*/}
        </section>
    )
}
export default Registration;