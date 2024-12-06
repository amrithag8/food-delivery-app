import React, { useState } from 'react'
import "./Signin.css";

function Signin({setTriggerSignin, setTriggerSignup}) {
    
  return (
    <div className='signin-outer-container'>
     <form className='signin-inner-container'>
        <h2>Sign In</h2>
        
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' required/>
        <label htmlFor='password'>Password</label>
        <input type="password" id='password' required/>
        <button type="submit">Sign in</button>
        <p onClick={()=>{setTriggerSignin(false);
            setTriggerSignup(true);}}>Dont have an account yet? Sign Up</p>
        </form>
        
      
      <div className='close-icon' onClick={()=>{setTriggerSignin(false);
      setTriggerSignup(false);
        
      }}>X</div>
    </div>
  )
}

export default Signin
