import React from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../image/logo.svg";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/products/women",
          imageSrc:
            "https://assets.hermes.com/is/image/hermesedito/P_43_SELLIER_FW22__LOOKS_COVERVIDEO?fit=wrap%2C0&wid=730",
        },
        {
          name: "Bags",
          href: "/products/women/accessories/bag",
          imageSrc: "https://static.purseblog.com/images/2022/10/Hermes-SS23-detail-look-16-a-new-Gao-via-Vogue.jpg",
        },
      ],
      sections: [
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Browse All", href: "/products/women" },
            { name: "Best Sellers", href: "/products/women" },
            { name: "Gift Choices", href: "/products/women" },
          ],
        },
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "All clothing", href: "/products/women/clothing" },
            { name: "Coats and jackets", href: "/products/women/clothing/coat" },
            { name: "Dresses and skirts", href: "/products/women/clothing/dress" },
            { name: "Tops and shirts", href: "/products/women/clothing/top" },
            { name: "Pants and shorts", href: "/products/women/clothing/pants" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "All accessories", href: "/products/women/accessories" },
            { name: "Scarve", href: "/products/women/accessories/scarve" },
            { name: "Shoes", href: "/products/women/accessories/shoes" },
            { name: "Bags", href: "/products/women/accessories/bag" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/products/men",
          imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_916_SILK_MEN_AH22_4?fit=wrap%2C0&wid=730",
        },
        {
          name: "Shoes",
          href: "/products/men/accessories/shoes",
          imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_916_MSHOES_FW22_4?fit=wrap%2C0&wid=730",
        },
      ],
      sections: [
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Browse All Men", href: "/products/men" },
            { name: "Best Sellers", href: "/products/men" },
            { name: "Gift Choices", href: "/products/men" },
          ],
        },
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "All clothing", href: "/products/men/clothing" },
            { name: "Coats and jackets", href: "/products/men/clothing/coat" },
            { name: "Tops and shirts", href: "/products/men/clothing/top" },
            { name: "Pants and shorts", href: "/products/men/clothing/pants" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "All accessories", href: "/products/men/accessories" },
            { name: "Scarve", href: "/products/men/accessories/scarve" },
            { name: "Shoes", href: "/products/men/accessories/shoes" },
            { name: "Bags", href: "/products/men/accessories/bag" },
          ],
        },
      ],
    },
    {
      id: "home",
      name: "Home",
      featured: [
        {
          name: "New Arrivals",
          href: "/products/home",
          imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_11_CH_plaid?fit=wrap%2C0&wid=360",
        },
        {
          name: "Tableware",
          href: "/products/home/tableware",
          imageSrc: "https://assets.hermes.com/is/image/hermesedito/P_11_CH_objet?fit=wrap%2C0&wid=360",
        },
      ],
      sections: [
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Browse All", href: "/products/home" },
            { name: "Best Sellers", href: "/products/home" },
            { name: "Gift Choices", href: "/products/home" },
          ],
        },
        {
          id: "home",
          name: "Home",
          items: [
            { name: "All Home", href: "/products/home" },
            { name: "Blandkets and Pillows", href: "/products/home/blandket" },
            { name: "Tableware", href: "/products/home/tableware" },
            { name: "Furnitrue and Lighting", href: "/products/home/furnitrue" },
          ],
        },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const isLogin = user.currentUser;

  return (
    <div>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? "text-gray-600" : "text-gray-900 border-transparent",
                                "flex-1 whitespace-nowrap py-4 px-1 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>

                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.name} className="object-cover object-center" />
                                </div>
                                <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </Link>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="navigation"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <Link to={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white z-10">
          <p className="flex h-10 items-center justify-center bg-[#f6f1eb] px-4 text-sm font-medium text-grey-900 sm:px-6 lg:px-8">
            Get express delivery on orders over € 500
          </p>

          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to="/">
                    <span className="sr-only">Company</span>
                    <img className="h-8 w-auto" src={Logo} alt="logo" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "text-gray-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative text-base sm:text-sm">
                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.name}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </Link>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                              {section.name}
                                            </p>
                                            <ul
                                              role="main"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <Link to={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  <div className="ml-4 flow-root lg:ml-6">
                    {isLogin ? (
                      <Link to="/member">
                        <UserIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      <Link to="/signin">
                        <UserIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <div className="group -m-2 flex items-center p-2">
                      <Link to="/cart" className="flex items-center">
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {quantity}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
