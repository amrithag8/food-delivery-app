import React, { useContext, useEffect } from 'react';
import "./MenuItems.css";
import PizzaMenu from '../PizzaMenu/PizzaMenu';
import { StoreContext } from '../../Context/StoreContext';



function MenuItems() {

    const {pizzaItemsMenu}=useContext(StoreContext);

  return (
    <div className='MenuItems-outer'>
      <h3>All Pizzas</h3>
      <hr/>
<div className='pizza-menu-item'>

    {
     pizzaItemsMenu&&(pizzaItemsMenu?.map((item)=>{
        return <PizzaMenu key={item._id} item={item}/>
     }))   
    }
</div>

    </div>
  )
}

export default MenuItems
