import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";

const Products = ({ cat, products }) => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [filteredCat, setFilteredCat] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const colorSelectRef = useRef(null);
  const sizeSelectRef = useRef(null);

  const uniqueColors = [...new Set(filteredCat.map((product) => product.color))].sort();
  const uniqueSizes = [...new Set(filteredCat.flatMap((product) => product.size))].sort();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

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
    setFilteredProducts(
      products
        .filter((item) => cat.every((category) => item.categories.includes(category)))
        .filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    );
  }, [products, cat, filters]);

  useEffect(() => {
    setFilteredCat(products.filter((item) => cat.every((category) => item.categories.includes(category))));
  }, [products, cat]);

  const handleReset = () => {
    colorSelectRef.current.value = "";
    sizeSelectRef.current.value = "";
    setFilters({});
    setSort("newest");
  };

  return (
    <div className="px-16 my-10">
      <div>
        Filter:
        <select ref={colorSelectRef} name="color" onChange={handleFilters} className="select select-sm w-full max-w-xs">
          <option disabled>Color</option>
          {uniqueColors.map((color) => (
            <option key={color}>{color}</option>
          ))}
        </select>
        <select ref={sizeSelectRef} name="size" onChange={handleFilters} className="select select-sm w-full max-w-xs">
          <option disabled>Size</option>
          {uniqueSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
        <select name="sort" onChange={handleSort} className="select select-sm w-full max-w-xs">
          <option disabled>Sort by</option>
          <option value="newest">Newest</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cat.includes("all")
          ? products.map((item) => <ProductCard item={item} key={item.id} />)
          : filteredProducts.map((item) => <ProductCard item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Products;
