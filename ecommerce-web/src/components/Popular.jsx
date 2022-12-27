import React from "react";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import ProductCard from "./ProductCard";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <div className="px-16 my-10">
      <div className="grid grid-cols-4 gap-4">
        {products.slice(0, 8).map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
