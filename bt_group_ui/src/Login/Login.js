import React,{createContext, useState} from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userState, setuserState] = useState({
        email : '',
        password : ''
    });
    const [fieldError,setfieldError] = useState(null);
    const navigate = useNavigate();
    
    const testCredentials = () => {
        const result = {...userState,email: "santhosh.pemmaka@gmail.com",password : "santhosh321"};
        setuserState(prev => result);
    }  

    const postAPIHandler = async() => {
        const URL = "https://bt-group-backend.onrender.com/login";
        try{
            const response = await fetch(URL,{
                method: "POST",
                body : JSON.stringify({
                    email : userState.email,
                    password : userState.password
                }),
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8'
                }
        
            });
            const resultJSON = await response.json();
            if(response.status == 200){
                sessionStorage.setItem("bt-login-status",true);
                navigate('/admin-dashboard');
                setuserState({
                    email : '',
                    password : ''
                })
            }
            if(response.status == 400){
                setfieldError("Credentials incorrect, Please check it once!");
            }
        }
        catch(err){
            console.log("Post API Error",err);
        }
    }
    
    const inputHandler = (type,e) => {
        const result = {...userState,[type]: e.target.value};
        setuserState(prev => result);
    }

    const submitHandler = () => {
        if(!userState.email || !userState.password){
            setfieldError("Please enter all fields");
        }
        else{
            postAPIHandler()
        }
        
    }
  return (
    <div className='login-container'>
        <h5 className='login-title'>Admin Login Form</h5>
        <div className='login-component'>
            <p className='login-field'>
                <span>Email *</span>
                <input type='email' value={userState.email} onChange={e => inputHandler('email',e)} placeholder="Please enter email id" required />
            </p>
            <p className='login-field'>
                <span>Password *</span>
                <input type='password' value={userState.password} onChange={e => inputHandler('password',e)} placeholder="Please enter password" required />
            </p>
            {fieldError && fieldError?.length >0 && <p className='error-message'>{fieldError}</p>}
            <button className='login-button' onClick={()=> submitHandler()}>Login</button>
            <button className='login-button-test' onClick={() => testCredentials()}>Login Test Credentials</button>
        </div>
    </div>
  )
}

export default Login