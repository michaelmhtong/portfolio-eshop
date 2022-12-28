import React from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    name: "Women's",
    link: "/products/women",
    imageSrc: "https://assets.hermes.com/is/image/hermesproduct/003904S+05_set?a=a&size=3000,3000&extend=0,0,0,0&align=0,0&$product_item_grid_b$&resMode=&wid=650&hei=650",
  },
  {
    name: "Men's",
    link: "/products/men",
    imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_11_MFASHACCESS_AH22_10?fit=wrap%2C0&wid=785",
  },
  {
    name: "Home",
    link: "/products/home",
    imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_11_CH_plage?fit=wrap%2C0&wid=360",
  },
];

const Category = () => {
  return (
    <div className="relative bg-[#f6f1eb]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-4 lg:px-8">
        <section className="relative sm:mt-0">
          <h2 id="collection-heading" className="sr-only">
            Collections
          </h2>
          <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {collections.map((collection) => (
              <div
                key={collection.name}
                className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
              >
                <div>
                  <div aria-hidden="true" className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <img
                        src={collection.imageSrc}
                        alt={collection.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                    <div>
                      <p aria-hidden="true" className="text-sm text-white">
                        Shop the collection
                      </p>
                      <h3 className="mt-1 font-semibold text-white">
                        <Link to={collection.link}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Category;
