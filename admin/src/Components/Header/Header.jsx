import "./Header.css";

export const Header=({setTriggerSignin})=>{
    return(
        <>
        <div className="Header-admin-outer">
<div className="Header-admin-title">
<h1>Foody App</h1>
<p>Admin Panel</p>
</div>
<div className="admin-avatar">
    <h3 onClick={()=>setTriggerSignin(true)}>Signin</h3>
<img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg" alt="avatar"/>
</div>


        </div>
        <hr/>
        </>

    )
}