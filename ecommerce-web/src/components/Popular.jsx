import React from "react";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

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
    <div className="bg-[#f6f1eb]">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-4 lg:py-8 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Our suggestion</h2>
        <Link to="/products/all" className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 md:block">
          Shop the collection<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.slice(0, 8).map((item) => (
          <ProductCard item={item} key={item._id} />
        ))}
      </div>
      <div className="mt-8 text-sm md:hidden">
        <Link to="/products/all" className="font-medium text-indigo-600 hover:text-indigo-500">
          Shop the collection<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Popular;
