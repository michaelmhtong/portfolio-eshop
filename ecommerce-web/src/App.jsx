import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Product from "./pages/Product";
import Member from "./pages/Member";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category1/:category2?/:category3?" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signin" element={user ? <Navigate replace to="/member" /> : <SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:id" element={<Success />} />
        <Route path="/member" element={<Member />} />
      </Routes>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </Router>
  );
};

export default App;
