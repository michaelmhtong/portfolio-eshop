import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductsFilter from "../components/ProductsFilter";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";

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

  console.log(cat);
  return (
    <div className="bg-white">
      <div>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-2">
            {cat.map((item, itemIdx) => (
              <li key={item}>
                <div className="flex items-center text-lg">
                  <Link
                    to={`/products/${cat.slice(0, itemIdx + 1).join("/")}`}
                    className="font-medium text-gray-900 hover:text-gray-500"
                  >
                    {item}
                  </Link>
                  {itemIdx !== cat.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <ProductsFilter products={products} cat={cat} />
      </div>
    </div>
  );
};

export default ProductList;
