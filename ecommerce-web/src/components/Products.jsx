import React from "react";
import { popularProducts } from "../data";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="px-16 my-10">
      <div className="text-2xl">Popular items</div>
      <div className="grid grid-cols-4 gap-4">
        {popularProducts.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
