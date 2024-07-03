// SearchFilter.js
import { useState } from "react";

const SearchFilter = () => {
  const [filters, setFilters] = useState({
    year: "",
    carType: "",
    transmission: "",
    price: "",
  });

  const years = Array.from(
    { length: 30 },
    (_, index) => new Date().getFullYear() - index
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching with filters:", filters);
    // Add your search logic here
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl my-10">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
      >
        {/* Year Filter */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Car Type Filter */}
        <div>
          <label
            htmlFor="carType"
            className="block text-sm font-medium text-gray-700"
          >
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={filters.carType}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="SUV">SUV</option>
            <option value="ZIP">ZIP</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="AWD4WD">AWD / 4WD</option>
          </select>
        </div>

        {/* Transmission Filter */}
        <div>
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-700"
          >
            Transmission
          </label>
          <select
            id="transmission"
            name="transmission"
            value={filters.transmission}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <select
            id="price"
            name="price"
            value={filters.price}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex">
          <button
            type="submit"
            className="lg:mt-5 md:mt-2 w-full py-2 rounded-md shadow-xl text-base font-medium text-white bg-primary"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
