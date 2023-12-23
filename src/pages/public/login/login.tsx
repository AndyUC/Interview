import { Link, redirect } from "react-router-dom"
import {FcGoogle} from 'react-icons/fc'
import './login.css'
import { client } from "../../../clientaxios"
import { getCookie } from "../../../cookie"

export const Login =()=>{
    console.log(getCookie('token').length>0?getCookie('token'):'notoken')
    const handleGoogleOauth=async()=>{
        const res = await client.get('api/v1/auth/oauth2/google')
        console.log(res.data)
        window.location.replace(res.data);
    }
    return <div className="login">
        <div style={{height:'20px'}}></div>
        <div className="loginWrapper">
        <div className="inputWrapper">
        <span className="loginTitle">Username</span>
        <input className="loginInput"></input>
        </div>
        <div className="inputWrapper">
        <span className="loginTitle">Password</span>
        <input className="loginInput"></input>
        </div >
        <Link className="forgot" to=''>Forgot password</Link>
        <div className="signIn" role="button">
            <span className="signInTitle"> SIGN IN</span>
        </div>
        <div className="oAuth">
            <span className="oAuthTitle">Login with</span>
            <div className="oAuthDetails"><FcGoogle role="button" onClick={handleGoogleOauth} className="icon"/></div>
        </div>
        </div>
    </div>
}