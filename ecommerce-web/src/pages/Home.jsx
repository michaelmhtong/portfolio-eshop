import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Promo from "../components/Promo";
import Category from "../components/Category";
import Popular from "../components/Popular";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Promo />
      <Category />
      <Popular />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
