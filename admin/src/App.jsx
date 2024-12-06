import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Header } from './Components/Header/Header';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import ListItems from './Pages/ListItems/ListItems';
import AddItems from './Pages/AddItems/AddItems';
import Orderspage from './Pages/Orderspage/Orderspage';
import Signin from './Pages/Signin/Signin';
import SignupPage from './Pages/SignupPage/SignupPage';

function App() {
  const[triggerSignin, setTriggerSignin]=useState(false);
  const[triggerSignup, setTriggerSignup]=useState(false);

  return (
   
    <>
     <Header setTriggerSignin={setTriggerSignin}/>
    <Routes>
      <Route path="/admin" element={<Homepage />}/>
      <Route path="/admin/list-item" element={<ListItems/>}/>
      <Route path="/admin/add-item" element={<AddItems />}/>
      <Route path="/admin/add-item/:id" element={<AddItems/>}/>
      <Route path="/admin/orders" element={<Orderspage/>}/>
    </Routes>
    {
      
      triggerSignin&&(<Signin setTriggerSignin={setTriggerSignin} setTriggerSignup={setTriggerSignup}/>)
      
      
}
{
  triggerSignup&&(<SignupPage setTriggerSignup={setTriggerSignup} setTriggerSignin={setTriggerSignin}/>)
}
      

     
    </>
  )
}

export default App
