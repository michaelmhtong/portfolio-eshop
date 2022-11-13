import React from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";

const Product = () => {
  return (
    <div>
      <News />
      <Navbar />
      <div className="grid grid-cols-2 gap-4 mx-60 my-10">
        <div>
          <img
            className=""
            src="https://cdn.shopify.com/s/files/1/1367/5201/products/CriticalSlimZipUpHoodieBlackA1A1H9.A_ZH_GB_f42848e6-971a-410f-8171-f47c43707623_855x.jpg?v=1664781522"
          ></img>
        </div>
        <div>
          <h1>Title</h1>
          <article>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti eaque provident fugit odio necessitatibus
            accusamus natus culpa hic. Dignissimos, quasi. Iusto maiores quod dignissimos quidem consequatur ipsam nobis
            necessitatibus! Debitis.
          </article>
          <h2>Price</h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <h3>color</h3>
              <button className="">a</button>
              <button className="">b</button>
              <button className="">c</button>
            </div>
            <div className="flex items-center">
              <h3>Size</h3>
              <select className="select">
                <option>S</option>
                <option>M</option>
                <option>L</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <button className="">-</button>
              <h4>1</h4>
              <button className="">+</button>
            </div>
            <div>
              <button className="btn">Add to cart</button>
              <button className="btn">Add to wish list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
