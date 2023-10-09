import React,{useState} from 'react';
import './Feedback.scss';

const Home = () => {
    const [formState, setformState] = useState({
        username : "",
        email : "",
        company : "",
        comments : ""
    });
    const [formStaus, setformStatus] = useState(false);

const inputHandler = (type,e) => {
    let result = {...formState,[type] : e.target.value};
    setformState(prev => result);
}

const postAPIHandler = async() => {
    const URL = "https://bt-group-backend.onrender.com/";
    try{
        const response = await fetch(URL,{
            method: "POST",
            body : JSON.stringify({
                name : formState.username,
                email : formState.email,
                company : formState.company,
                comments : formState.comments
            }),
            headers : {
                'Content-type' : 'application/json; charset=UTF-8'
            }
    
        });
        const resultJSON = await response.json();
        if(resultJSON?.status) {
            setformStatus(true);
            setformState({
                username : "",
                email : "",
                company : "",
                comments : ""
            })
            setTimeout(() => {
                setformStatus(false)
            },3000);
        }
    }
    catch(err){
        console.log("Post API Error",err);
    }
    
}
const submitHandler = (e) => {
    e.preventDefault();
    postAPIHandler();
}
  return (
    <div className='feed-container'>
        <h5 className='feedback-title'>Feedback Form</h5>
        <form className='form-component' onSubmit={(e) => submitHandler(e)}>
            <p className='form-field'>
                <span>UserName *</span>
                <input type="text" value={formState.username} placeholder="Enter User Name" onChange={(e) => inputHandler("username",e)} required  />
            </p>
            <p className='form-field'>
                <span>Email *</span>
                <input type="email" value={formState.email} placeholder="Enter Email Id" onChange={(e) => inputHandler("email",e)} required/>
            </p>
            <p className='form-field'>
                <span>Company *</span>
                <input type="text" value={formState.company} placeholder="Enter Company Name" onChange={(e) => inputHandler("company",e)} required />
            </p>
            <div className='comment-container' >
                <p className='comment-title'>Comments *</p>
                <textarea className='comment-text-area' value={formState.comments} placeholder='Please mention comment' onChange={(e) => inputHandler("comments",e)} required></textarea>
            </div>
            <button className='submit-button'>Submit</button>
            {formStaus && <p className='submit-status'>Feedback from sucessfully submited</p>}
        </form>
        
    </div>
  )
}

export default Home