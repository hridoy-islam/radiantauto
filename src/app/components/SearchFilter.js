import { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    year: "",
    carType: "",
    transmission: "",
    sortBy: "price", // default sorting field
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
    onFilterChange(filters);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl my-10">
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
          <option value="">All</option>
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
          <option value="">All</option>
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
          <option value="">All</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Sort By Filter */}
      <div>
        <label
          htmlFor="sortBy"
          className="block text-sm font-medium text-gray-700"
        >
          Sort By
        </label>
        <select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
          <option value="price">Price</option>
          <option value="year">Year</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
