import React from "react";
import News from "../components/News";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <News />
      <Navbar />
      <Carousel />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
