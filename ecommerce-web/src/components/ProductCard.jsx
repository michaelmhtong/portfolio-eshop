import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ item }) => {
  return (
    <div className="relative cursor-pointer">
      <img className="hover:opacity-50" src={item.img} />
      <div>
        <HeartIcon className="h-6 y-6 absolute top-5 right-5 text-gray-500 hover:text-red-800" />
      </div>
    </div>
  );
};

export default ProductCard;
