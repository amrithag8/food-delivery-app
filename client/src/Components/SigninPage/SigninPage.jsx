import React, { useContext, useState } from 'react'
import "./SigninPage.css";
import { StoreContext } from '../../Context/StoreContext';

function SigninPage({setTriggerSignin, setTriggerSignup}) {
const{setActiveUser}=useContext(StoreContext);
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");

  

  const signinHandler=async(e)=>{
e.preventDefault();


setEmail("");
  setPassword("");

try {

  const fetchAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({email,password })
  })

  if (!fetchAPI.ok) {
    // Extract the error message from the response
    const errorData = await fetchAPI.json();
    alert(errorData.message);
  }
  
  const res=await fetchAPI.json();
  
  
  

  localStorage.setItem("accessToken", res.accessToken);
  setActiveUser(res);
  
  setTriggerSignin(false);
  
  
  
} catch (error) {
  alert(error.message);
}



  }
    
  return (
    <div className='signin-outer-container'>
     <form className='signin-inner-container' onSubmit={signinHandler}>
        <h2>Sign In</h2>
        
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <label htmlFor='password'>Password</label>
        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Sign in</button>
        <p onClick={()=>{setTriggerSignin(false);
            setTriggerSignup(true);}}>Dont have an account yet? Sign Up</p>

<div className='close-icon' onClick={()=>{setTriggerSignin(false);
      setTriggerSignup(false);
        
      }}><i className="fa-solid fa-xmark"></i></div>
        </form>
        
      
      
    </div>
  )
}

export default SigninPage
