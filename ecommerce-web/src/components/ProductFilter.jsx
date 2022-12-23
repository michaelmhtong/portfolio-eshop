import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Popover, Transition } from "@headlessui/react";
// import { XIcon } from "@heroicons/react/outline/XIcon";
// import { ChevronDownIcon } from "@heroicons/react/solid";

const sortOptions = [
  { name: "Newest", href: "#" },
  { name: "Price: low to high", href: "#" },
  { name: "Price: high to low", href: "#" },
];

const filters = [
  // {
  //   id: "category",
  //   name: "Category",
  //   options: [
  //     { value: "men", label: "Men" },
  //     { value: "women", label: "Women" },
  //     { value: "shoe", label: "Shoes" },
  //     { value: "accessories", label: "Accessories" },
  //     { value: "home", label: "Home" },
  //   ],
  // },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "black", label: "Black" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "uni", label: "Uni", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "36", label: "36", checked: false },
      { value: "38", label: "38", checked: false },
      { value: "40", label: "40", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductFilter = ({ setFilters }) => {
  
  let [sortedOptions, setSortedOptions] = useState("");
  let [selectedFilters, setSelectedFilters] = useState([]);
  let [checkedOptions, setCheckedOptions] = useState([]);
  const [checkboxState, setCheckboxState] = useState({});
  
  const handleFilter = (e, sectionId) => {
    setCheckboxState({ ...checkboxState, [e.target.value]: e.target.checked });
    // Check if the current filter category is already present in the updatedFilters object
    if (selectedFilters[sectionId]) {
      // If it is present, check if the option is already present in the array
      if (selectedFilters[sectionId].includes(e.target.value)) {
        // If it is present, remove it from the array
        selectedFilters[sectionId] = selectedFilters[sectionId].filter((val) => val !== e.target.value);
      } else {
        // If it is not present, add it to the array
        selectedFilters[sectionId].push(e.target.value);
      }
    } else {
      // If the filter category is not present in the object, add it with the current option as the first element in the array
      selectedFilters[sectionId] = [e.target.value];
    }
    // Update the state with the updatedFilters object
    setSelectedFilters(selectedFilters);

    setFilters(selectedFilters);
    // Update the filteredValue state variable
    setCheckedOptions(Object.values(selectedFilters).flat());
  };

  const handleDelete = (e, checkedOption) => {
    // Find the filter section for the selected option
    const section = filters.find((filter) => filter.options.find((option) => option.value === checkedOption));
    // Make a copy of checkedOptions and selectedFilters
    const updatedOptions = [...checkedOptions];
    const updatedFilters = { ...selectedFilters };
    // Remove the option from checkedOptions and selectedFilters
    updatedOptions.splice(updatedOptions.indexOf(checkedOption), 1);
    updatedFilters[section.id] = updatedOptions;
    // Update the state variables
    setCheckedOptions(updatedOptions);
    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Workspace sale</h1>
        <p className="mt-4 max-w-xl text-sm text-gray-700">
          Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
          organization with these sale items before we run out.
        </p>
      </div>

      {/* Heading */}
      <section aria-labelledby="filter-heading">
        <div className="relative z-10 bg-white border-b border-gray-200 pb-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
            {/* Sort */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? "font-medium text-gray-900" : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* filter */}
            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section) => (
                    <Popover key={section.name} className="px-4 relative inline-block text-left">
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                      </Popover.Button>

                      {/* filter cat */}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  value={option.value}
                                  onChange={(e) => handleFilter(e, section.id)}
                                  checked={checkboxState[option.value] || false}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters bar*/}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {checkedOptions.map((checkedOption) => (
                  <span
                    key={checkedOption}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{checkedOption}</span>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={(e) => handleDelete(e, checkedOption)}
                    >
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFilter;
