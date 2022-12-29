import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";

const Success = () => {
  const location = useLocation();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await publicRequest.get("/order/find/" + id, {
          headers: {
            token: "Bearer " + user.accessToken,
          },
        });
        setOrder(res.data);
        setLoading(false);
        dispatch(clearCart()); // delete cart items
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
        <img
          src="https://assets.hermes.com/is/image/hermesedito/CORPO_Fitilieu_P_169?fit=wrap%2C0&wid=1920"
          alt="TODO"
          className="h-full w-full object-center object-cover"
        />
      </div>

      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 lg:py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</p>
            <p className="mt-2 text-base text-gray-500">Hang tight and ship it very soon!</p>

            <dl className="mt-16 text-sm font-medium">
              <dt className="text-gray-900">Order number</dt>
              <dd className="mt-2 text-indigo-600">{order._id}</dd>
            </dl>

            <ul
              role="main"
              className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
            >
              {order.products.map((product) => (
                <li key={product.id} className="flex py-6 space-x-6">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <a href={product.href}>{product.title}</a>
                    </h3>
                    <p>
                      {product.color} | {product.size}
                    </p>
                  </div>
                  <p className="flex-none font-medium text-gray-900">€ {product.price}</p>
                </li>
              ))}
            </ul>

            <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">€ {order.amount}</dd>
              </div>

              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">€ 0.00</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">€ {order.amount}</dd>
              </div>
            </dl>

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
              <div>
                <dt className="font-medium text-gray-900">Shipping Address</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">Kristin Watson</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Payment Information</dt>
                <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                  <div className="flex-none">
                    <svg
                      aria-hidden="true"
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-auto"
                    >
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="flex-auto">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p>Expires 12 / 21</p>
                  </div>
                </dd>
              </div>
            </dl>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                <Link to="/">Continue Shopping</Link>
                <span aria-hidden="true"> &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Success;
