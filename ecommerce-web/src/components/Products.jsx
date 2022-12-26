import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import ProductCard from "./ProductCard";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
      );
  }, [products, cat, filters]);

  useEffect(() => {
    setFilteredProducts(products.filter((item) => item.categories.includes(cat)));
  }, [cat, products]);

  return (
    <div className="px-16 my-10">
      <div className="text-2xl">Popular items</div>
      <div className="grid grid-cols-4 gap-4">
        {cat
          ? filteredProducts.map((item) => <ProductCard item={item} key={item.id} />)
          : products.slice(0, 8).map((item) => <ProductCard item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Products;
