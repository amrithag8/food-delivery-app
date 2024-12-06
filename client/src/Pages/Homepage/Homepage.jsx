import React from 'react';
import "./Homepage.css";
import pizzalayout from "../../assets/pizzalayout.jpg";
import MenuItems from '../../Components/MenuItems/MenuItems';


function Homepage() {
  return (
    <div className='Homepage-client-outer'>
    <div className='Homepage-img'>
      <img src={pizzalayout}/>
    </div>
    <MenuItems/>
    </div>
  )
}

export default Homepage
