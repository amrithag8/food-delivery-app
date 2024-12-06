import React from 'react'
import "./SignupPage.css";
import { useState } from 'react';

function SignupPage({setTriggerSignup, setTriggerSignin}) {

  const[fullname, setFullname]=useState();
  const[email, setEmail]=useState();
  const[password, setPassword]=useState();

  const signupHandler=(e)=>{
e.preventDefault();




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
        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Sign Up</button>
        <p onClick={()=>{setTriggerSignup(false);
            setTriggerSignin(true)}}>Already have an account? Sign in</p>
        </form>
      
      <div className='close-icon' onClick={()=>{setTriggerSignin(false);
        setTriggerSignup(false)}}>X</div>
    </div>
  )
}

export default SignupPage
