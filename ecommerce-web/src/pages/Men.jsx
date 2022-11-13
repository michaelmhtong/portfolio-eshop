import React from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import Products from "../components/Products";

const Men = () => {
  return (
    <div>
      <div>
        <News />
        <Navbar />
      </div>
      <div>
        <div>Men</div>
        <div>
          Filter:
          <select className="select select-sm w-full max-w-xs">
            <option disabled selected>
              Size
            </option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
          <select className="select select-sm w-full max-w-xs">
            <option disabled selected>
              Color
            </option>
            <option>Black</option>
            <option>Grey</option>
            <option>Green</option>
          </select>
          <select className="select select-sm w-full max-w-xs">
            <option disabled selected>
              Sort by
            </option>
            <option>Newest</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
        </div>
        <Products />
      </div>
    </div>
  );
};

export default Men;
