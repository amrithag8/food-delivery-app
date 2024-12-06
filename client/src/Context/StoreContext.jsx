import { createContext, useState } from "react";


export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const[cartDetails, setCartDetails]=useState({});
    const[pizzaItemsMenu, setPizzaItemsMenu]=useState([]);
    const[activeUser, setActiveUser]=useState([]);
    const [order, setOrder]=useState([]);
    const[address, setAddress]=useState({});

const contextValue={
    
}


    return (<StoreContext.Provider value= {{cartDetails, setCartDetails, pizzaItemsMenu, setPizzaItemsMenu, activeUser,setActiveUser, order , setOrder, address, setAddress}}>
{props.children}
    </StoreContext.Provider>)
}

export default StoreContextProvider;