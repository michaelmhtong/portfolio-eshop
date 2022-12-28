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

console.log(filters)

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <p className="font-medium">Filters</p>
        <button
          onClick={handleReset}
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
        >
          Reset Filter
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <select
          ref={colorSelectRef}
          name="color"
          onChange={handleFilters}
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        >
          <option selected="selected">Color</option>
          {uniqueColors.map((color) => (
            <option key={color}>{color}</option>
          ))}
        </select>
        <select
          ref={sizeSelectRef}
          name="size"
          onChange={handleFilters}
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        >
          <option selected="selected">Size</option>
          {uniqueSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
        <select
          name="sort"
          onChange={handleSort}
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        >
          <option disabled>Sort by</option>
          <option value="newest">Newest</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {cat.includes("all")
          ? products.map((item) => <ProductCard item={item} key={item.id} />)
          : filteredProducts.map((item) => <ProductCard item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Products;
