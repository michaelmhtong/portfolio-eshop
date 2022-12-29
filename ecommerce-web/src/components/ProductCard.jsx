import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div key={item.id} className="group relative md:py-6">
      <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
        <img src={item.img} alt={item.title} className="w-full h-full object-center object-cover" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-700">
        <Link to={`/product/${item._id}`}>
          <span className="absolute inset-0" />
          {item.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">€ {item.price}</p>
    </div>
  );
};

export default ProductCard;
