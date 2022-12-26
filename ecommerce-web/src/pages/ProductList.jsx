import { useState } from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import Products from "../components/Products";
import { useLocation } from "react-router";
import ProductFilter from "../components/ProductFilter";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [products, setProducts] = useState([]);
  const uniqueColors = [...new Set(products.map((product) => product.color))].sort();
  const uniqueSizes = [...new Set(products.flatMap((product) => product.size))].sort();
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("newest");

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

  return (
    <div>
      <div>
        <News />
        <Navbar />
      </div>
      <div>
        <div>{cat}</div>
        <div>
          Filter:
          {console.log("products", products)}
          <select name="color" onChange={handleFilters} className="select select-sm w-full max-w-xs">
            <option disabled>Color</option>
            {uniqueColors.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <select name="size" onChange={handleFilters} className="select select-sm w-full max-w-xs">
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
        </div>
        <Products products={products} setProducts={setProducts} cat={cat} filters={filters} sort={sort} />
      </div>
    </div>
  );
};

export default ProductList;
