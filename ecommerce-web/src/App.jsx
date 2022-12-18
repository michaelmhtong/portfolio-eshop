import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Product from "./pages/Product";
import Member from "./pages/Member";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:id" element={<Success />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </Router>
  );
};

export default App;
