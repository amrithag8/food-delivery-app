import "./Footer.css";
import appStoreimg from "../../assets/app_store.png";
import playStoreimg from "../../assets/play_store.png";

 export const Footer=()=>{
    return(
<div className="Footer-client-outer">
    <div className="Footer-client-inner">
<div className="logo-navbar">
<h1>Foody App</h1>
<ul>
    <li>Disclaimer</li>
    <li>Privacy Policy</li>
    <li>Faq</li>
    <li>Terms and Conditions</li>
    <li>Nutritional Information</li>
    <li>Feedback</li>
</ul>
</div>
<div className="Footer-right">
<h2>DOWNLOAD APP</h2>
<div className="Footer-images">
<img src={playStoreimg}/>
<img src={appStoreimg}/>
</div>

</div>
    </div>
    <div className="Footer-client-bottom">
        <h3>All Rights Reserved. Copyright © Jubilant FoodWorks Ltd.</h3>
    </div>
</div>
    )
}