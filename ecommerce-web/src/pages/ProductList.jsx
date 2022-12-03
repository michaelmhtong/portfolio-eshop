import { useState } from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import Products from "../components/Products";
import { useLocation } from "react-router";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters);

  const handleSort = (e) => {
    const value = e.target.value;
    setSort({ [e.target.name]: value });
  };
  console.log(sort);

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
          <select name="size" onChange={handleFilters} className="select select-sm w-full max-w-xs">
            <option disabled>Size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
          <select name="color" onChange={handleFilters} className="select select-sm w-full max-w-xs">
            <option disabled>Color</option>
            <option>Black</option>
            <option>Grey</option>
            <option>Green</option>
          </select>
          <select name="sort" onChange={handleSort} className="select select-sm w-full max-w-xs">
            <option disabled>Sort by</option>
            <option value="newest">Newest</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </div>
        <Products cat={cat} filters={filters} sort={sort} />
      </div>
    </div>
  );
};

export default ProductList;
