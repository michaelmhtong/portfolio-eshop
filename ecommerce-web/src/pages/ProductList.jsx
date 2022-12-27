import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import ProductsFilter from "../components/ProductsFilter";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/").slice(2);
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
    <div>
      <div>
        <News />
        <Navbar />
      </div>
      <div>
        <div>{cat}</div>
        <ProductsFilter products={products} cat={cat} />
      </div>
    </div>
  );
};

export default ProductList;
