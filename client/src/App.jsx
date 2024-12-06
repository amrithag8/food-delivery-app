import { useContext, useEffect, useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./Components/SigninPage/SigninPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Header from "./Components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import { Footer } from "./Components/Footer/Footer";
import { CartPage } from "./Pages/CartPage/CartPage";
import Orderpage from "./Pages/Orderpage/Orderpage";
import PlaceOrder from "./Pages/PlaceOrderPage/PlaceOrder";
import PaymentsPage from "./Pages/PaymentsPage/PaymentsPage";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess";
import PaymentsCancel from "./Pages/PaymentsCancel/PaymentsCancel";
import { ProtectedRoute } from "./ProtectedRoutes/ProtectedRoute";
import { StoreContext } from "./Context/StoreContext";
import { lazy } from "react";

function App() {
  const [triggerSignin, setTriggerSignin] = useState(false);
  const [triggerSignup, setTriggerSignup] = useState(false);

  const { setCartDetails, setPizzaItemsMenu, activeUser, order, setOrder } =
    useContext(StoreContext);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const fetchCartData = await fetch(
        `${import.meta.env.VITE_BASE_URL}/getCartData/?userID=${activeUser.id}`,
        {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`, // Added 'Bearer' for clarity
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
      const res = await fetchCartData.json();
      setCartDetails(res);
    };
    if (localStorage.getItem("accessToken")) {
      fetchCartDetails();
    }
  }, [activeUser, order]);

  useEffect(() => {
    const getallproducts = async () => {
      const fetchAPI = await fetch(
        `${import.meta.env.VITE_BASE_URL}/getallproducts`
      );
      const res = await fetchAPI.json();
      setPizzaItemsMenu(res);
    };
    getallproducts();
  }, []);

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/getAllorders`,
        {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json",
          },
        }
      );
      const res = await response.json();
      setOrder(res);
    };
    if (localStorage.getItem("accessToken")) {
      getOrderDetails();
    }
  }, [activeUser]);

  return (
    <>
      {triggerSignin && !localStorage.getItem("accessToken") && (
        <SigninPage
          setTriggerSignin={setTriggerSignin}
          setTriggerSignup={setTriggerSignup}
        />
      )}
      {triggerSignup && !localStorage.getItem("accessToken") && (
        <SignupPage
          setTriggerSignin={setTriggerSignin}
          setTriggerSignup={setTriggerSignup}
        />
      )}
      <div className="main-container">
        <Header
          setTriggerSignin={setTriggerSignin}
          setTriggerSignup={setTriggerSignup}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orderpage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/payment" element={<PaymentsPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentsCancel />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
