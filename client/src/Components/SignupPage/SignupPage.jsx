import React, { useState } from 'react'
import "./SignupPage.css";

function SignupPage({setTriggerSignup, setTriggerSignin}) {

  const[fullname, setFullname]=useState("");
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");

  const signupHandler=async(e)=>{
e.preventDefault();

setFullname("");
setEmail("");
setPassword("");

try{
  const fetchAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({fullname,email, password})
  })
  
  const res=await fetchAPI.json();
  
  
}
catch(error){
  console.log(error);
}



  }
  return (
    <div className='signup-outer-container'>
      <form className='signup-inner-container' onSubmit={signupHandler}>
        <h2>Sign Up</h2>
        
        <label htmlFor='name'>Fullname</label>
        <input type="text" id='name' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/>
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <label htmlFor='password'>Password</label>
        <input type="password" id='password'value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type='submit'>Sign up</button>
        <p onClick={()=>{setTriggerSignup(false);
            setTriggerSignin(true)}}>Already have an account? Sign in</p>

<div className='close-icon' onClick={()=>{setTriggerSignin(false);
        setTriggerSignup(false)}}><i className="fa-solid fa-xmark"></i></div>
        </form>
      
      
    </div>
  )
}

export default SignupPage
