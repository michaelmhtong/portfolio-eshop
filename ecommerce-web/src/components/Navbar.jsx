import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import News from "./News";

const Navbar = () => {
  return (
    <div>
      <News />
      <ul className="flex justify-between items-center px-16">
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
        <li className="text-center text-xl">SHOP.</li>

        {/* right */}
        <li className="hidden lg:flex space-x-8">
          <div>REGISTER</div>
          <div>SIGN IN</div>
          <div>
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs rounded-full absolute top-0 ml-6 mt-5">{1}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
