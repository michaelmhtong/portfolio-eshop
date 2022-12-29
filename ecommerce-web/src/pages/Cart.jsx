import { CheckIcon, QuestionMarkCircleIcon, XCircleIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import CheckoutButton from "../components/CheckoutButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, increaseQuantity, decreaseQuantity, removeProduct } from "../redux/cartRedux";
import Navbar from "../components/Navbar";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrease = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseQuantity(product));
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <div className="flex items-center justify-between mt-4">
          <div className="pr-10 md:pr-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Shopping Cart</h1>
            <p className="mt-2 text-sm text-gray-500">Hurry! Checkout now to get a special discount!</p>
          </div>
          <button
            onClick={handleClearCart}
            class="px-4 py-2 bg-gray-400 hover:bg-gray-900 text-white text-sm font-medium rounded-md"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            {cart.products.length === 0 ? (
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                <div className="py-20 grid grid-cols-1 gap-0 place-items-center items-center">
                  <ShoppingCartIcon className="w-10 md:w-8" />
                  <div className="text-lg font-medium text-gray-900 pb-6">Your cart is empty</div>
                  <Link to="/">
                    <button className="text-base font-medium text-decoration-line: underline text-gray-600 hover:text-gray-900">
                      Continue shopping
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <ul role="main" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {cart.products.map((product) => (
                  <li key={`${product._id}-${product.color}-${product.size}`} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm font-semibold">
                              <Link to={`/product/${product._id}`}>{product.title}</Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{product.color}</p>
                            {product.size ? (
                              <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.size}</p>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-900">€ {product.price * product.quantity}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                          <label className="sr-only">{product.title}</label>
                          <button onClick={() => handleDecrease(product)}>
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <h4 className="px-3">{product.quantity}</h4>
                          <button onClick={() => handleIncrease(product)}>
                            <PlusIcon className="h-3 w-3" />
                          </button>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(product)}
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                        <span>Ships in 1 week</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">€ {cart.total}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="text-sm font-medium text-gray-900">€ 20.00</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Shipping discount</span>
                  <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="text-sm font-medium text-gray-900">-€ {cart.total >= 500 ? 20 : 0}.00</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  € {cart.total >= 500 ? cart.total : cart.total + 20}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <CheckoutButton products={cart.products} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;
