import "./Sidebar.css";
import { Link, useNavigate } from 'react-router-dom';


export const Sidebar=()=>{
    const navigate=useNavigate();
    return(
       
        <div className="sidebar-outer">
            <div className="sidebar-menu menu-1" onClick={(e)=>{
                navigate("/admin/add-item");
            
                
                
            }}>
           <i className="fa-solid fa-plus"></i>
<p>Add Items</p>
            </div>
            
            <Link to={"/admin/list-item"}><div className="sidebar-menu">
            <i className="fa-solid fa-list"></i>
            <p>List Items</p> 
            </div>
            </Link>
            <Link to={"/admin/orders"}>
            <div className="sidebar-menu">
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            <p>Orders</p>
            </div>
            </Link>
        </div>


    )
}