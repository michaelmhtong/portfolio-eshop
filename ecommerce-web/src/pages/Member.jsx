import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Member = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const userID = user.others._id;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await publicRequest.get("order/user/" + userID, {
          headers: {
            token: "Bearer " + user.accessToken,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, [userID]);

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl"></div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download invoices.
            </p>
          </div>
          <Link to="/">
            <button
              onClick={handleLogout}
              class="px-4 py-2 bg-gray-600 hover:bg-gray-900 text-white text-sm font-medium rounded-md"
            >
              Logout
            </button>
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            {orders.reverse().map((order) => (
              <div key={order._id}>
                <h3 className="sr-only">
                  Order placed on <time dateTime={order.datetime}>{order.date}</time>
                </h3>

                <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                  <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="sm:mt-1">
                        <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString()}</time>
                      </dd>
                    </div>
                    <div className="flex col-span-2 justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Order number</dt>
                      <dd className="sm:mt-1">{order._id}</dd>
                    </div>
                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                      <dt>Total amount</dt>
                      <dd className="sm:mt-1">€ {order.amount}</dd>
                    </div>
                  </dl>
                  <a
                    href={order.invoiceHref}
                    className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:mt-0"
                  >
                    View Invoice
                    <span className="sr-only">for order {order.number}</span>
                  </a>
                </div>

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                        Product
                      </th>
                      <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                        Size
                      </th>
                      <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                        Unit price
                      </th>
                      <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                        Quantity
                      </th>
                      <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                        Subtotal
                      </th>
                      <th scope="col" className="w-0 py-3 font-normal text-right">
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={product.img}
                              alt={product.title}
                              className="w-16 h-16 object-center object-cover rounded mr-6"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                <Link to={`/product/${product._id}`}>
                                  {product.title} ({product.color})
                                </Link>
                              </div>
                              <div className="mt-1 sm:hidden">{product.price}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">{product.size}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell">€ {product.price}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell">€ {product.price * product.quantity}</td>
                        <td className="py-6 font-medium text-right whitespace-nowrap">
                          <Link to={`/product/${product._id}`} className="text-gray-600">
                            View<span className="hidden lg:inline"> Product</span>
                            <span className="sr-only">, {product.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
