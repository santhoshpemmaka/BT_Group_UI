import React,{ useState} from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';

const Login = () => {
    const [userState, setuserState] = useState({
        email : '',
        password : ''
    });
    const [fieldError,setfieldError] = useState(null);
    const navigate = useNavigate();
    const [showLoader, setshowLoader] = useState(false);
    
    const testCredentials = () => {
        const result = {...userState,email: "santhosh.pemmaka@gmail.com",password : "santhosh321"};
        setuserState(prev => result);
    }  

    const postAPIHandler = async() => {
        const URL = "https://bt-group-backend.onrender.com/login";
        try{
            setshowLoader(prev => !prev);
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
            console.log("result",resultJSON);
            if(resultJSON?.status){
                sessionStorage.setItem("bt-login-status",true);
                navigate('/admin-dashboard');
                setuserState({
                    email : '',
                    password : ''
                })
            }
            if(response.status == 400){
                setfieldError("Credentials incorrect, Please check it once!");
                setshowLoader(prev => !prev);
            }
        }
        catch(err){
            console.log("Post API Error",err);
            setshowLoader(prev => !prev);
        }
    }
    
    const inputHandler = (type,e) => {
        setfieldError(false);
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
            <button className='login-button-test' onClick={() => testCredentials()}>Fill With Test Credentials</button>
        </div>
        {showLoader && (
            <div className='loader-dots'>
                <ThreeDots
                    color='#ff3f6c'
                    height={100}
                    width={100}
                    timeout={5000}
                />
            </div>
		)}
    </div>
  )
}

export default Login