import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setColor(res.data.color);
        setSize(res.data.size[0]);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-6 px-6 sm:py-6 sm:px-6 lg:max-w-7xl lg:py-16 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product image */}
        <div className="mt-10 lg:col-span-1 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img src={product.img} alt={product.title} className="w-full h-full object-center object-cover" />
          </div>
        </div>

        {/* Product details */}
        <div className="py-10 lg:max-w-lg lg:self-center">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {product.categories.map((cat, catIdx) => (
                <li key={cat}>
                  <div className="flex items-center text-sm">
                    <Link
                      to={`/products/${product.categories.slice(0, catIdx + 1).join("/")}`}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {cat}
                    </Link>
                    {catIdx !== product.categories.length - 1 ? (
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

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.title} | {product.color}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">€ {product.price}</p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.desc}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
            </div>
          </section>

          {/* Product form */}
          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form onSubmit={handleAddToCart}>
                <div className="sm:flex sm:justify-between">
                  {/* Size selector */}
                  <RadioGroup value={size} onChange={setSize}>
                    <RadioGroup.Label className="block text-sm font-medium text-gray-700">Size</RadioGroup.Label>
                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-5">
                      {product.size.map((size) => (
                        <RadioGroup.Option
                          as="div"
                          key={size.name}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? "ring-2 ring-gray-500" : "",
                              "relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p" className="text-sm font-medium text-gray-900">
                                {size}
                              </RadioGroup.Label>
                              <div
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked ? "border-gray-500" : "border-transparent",
                                  "absolute -inset-px rounded-lg pointer-events-none"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                  >
                    Add to bag
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
