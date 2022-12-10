import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isLogin = user.currentUser;

  return (
    <div className="my-2 mx-16">
      <ul className="flex justify-between items-center">
        {/* left */}
        <li className="hidden lg:flex items-center">
          <div>EN</div>
          <div className="flex ml-6 space-x-2 items-center">
            <input
              className="border-2 border-gray-300 bg-white h-8 px-8 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="h-4 w-4">
              <MagnifyingGlassIcon />
            </button>
          </div>
        </li>

        {/* middle */}
        <li className="text-center text-4xl">
          <Link to="/">SHOP.</Link>
        </li>

        {/* right */}
        <li className="hidden lg:flex space-x-8">
          <div>{isLogin ? <Link to="/register">WISH LIST</Link> : <Link to="/register">REGISTER</Link>}</div>
          <div>
            <div>{isLogin ? <button onClick={handleLogout}> SIGN OUT</button> : <Link to="/login">SIGN IN</Link>}</div>
          </div>
          <div className="relative">
            <Link to="/cart">
              <ShoppingCartIcon className="h-6 w-6" />
              <div className="badge badge-xs absolute top-0 left-6">{quantity}</div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
