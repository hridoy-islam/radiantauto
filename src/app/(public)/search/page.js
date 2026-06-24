"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import CarComponent from "../../components/Car";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../../lib/axios";
import { Search as SearchIcon, SlidersHorizontal, X, Car, DollarSign } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { BlinkingDots } from "../../../components/ui/blinking-dots";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#f97316" : "#e5e7eb", // orange
    paddingTop: "1px",
    paddingBottom: "1px",
    fontSize: "0.875rem",
    boxShadow: state.isFocused ? "0 0 0 1px #f97316" : "none",
    "&:hover": {
      borderColor: "#fb923c",
    },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "#f97316" // orange selected
      : state.isFocused
      ? "#fff7ed" // light orange on hover/focus
      : "white",
    color: state.isSelected ? "white" : "#1f2937",
    "&:active": {
      backgroundColor: "#f97316",
    },
  }),
};

export default function Search() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    make: "",
    year: "",
    body_style: "",
    transmission: "",
    drivetrain: "",
    engine: "",
    minPrice: "",
    maxPrice: "",
    mileage: "",
    color: "",
    priceSort: "",
    search: "",
  });

  const years = Array.from(
    { length: 30 },
    (_, index) => new Date().getFullYear() - index
  );

  const bodyStyles = ["sedan", "coupe", "hatchback", "suv", "truck"];
  const transmissions = ["Automatic", "Manual", "CVT"];
  const engines = ["V6", "V8", "I4", "I6"];
  const drivetrains = ["FWD", "RWD", "AWD", "4WD"];
  const colors = ["Black", "White", "Silver", "Gray", "Blue", "Red"];

  const mileageOptions = [
    { value: "0-50000", label: "Under 50K miles" },
    { value: "50000-100000", label: "50K – 100K miles" },
    { value: "100000-150000", label: "100K – 150K miles" },
    { value: "150000+", label: "150K+ miles" },
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("/car-brand?limit=all");
        const brandsList = res.data?.data.result || res.data?.data || [];
        const formattedBrands = brandsList.map((b) => ({
          value: b._id,
          label: b.brandName,
        }));
        setBrands(formattedBrands);
      } catch (err) {
        console.error("Error fetching car brands:", err);
      }
    };
    fetchBrands();
  }, []);
const fetchData = async (page, currentFilters) => {
  try {
    setLoading(true);
    let url = `/cars?status=available&page=${page}&limit=10`;

    Object.keys(currentFilters).forEach((key) => {
      if (currentFilters[key]) {
        if (key === "search") {
          url += `&searchTerm=${currentFilters.search}`;
        } else if (key === "priceSort") {
          // Convert priceSort to sortBy and sortDirection for backend
          url += `&sortBy=price&sortDirection=${currentFilters.priceSort}`;
        } else if (key === "sortBy" || key === "sortDirection") {
          // If these exist directly, pass them through
          url += `&${key}=${currentFilters[key]}`;
        } else {
          url += `&${key}=${currentFilters[key]}`;
        }
      }
    });

    // If no priceSort is specified, use default sorting
    if (!currentFilters.priceSort) {
      url += `&sortBy=createdAt&sortDirection=desc`;
    }

    const res = await axiosInstance.get(url);
    const result = res.data.data.result || res.data.data || [];
    const meta = res.data.data.meta || {};

    // Backend already handles sorting (featured cars first, then by price/date)
    // So we don't need to re-sort here, just use the result as-is
    setCars(result);
    setTotalPages(meta.totalPage || 1);
    setTotalCars(meta.total || 0);
    setCurrentPage(page);
  } catch (error) {
    console.error("Error fetching data:", error);
    setCars([]);
    setTotalCars(0);
    setTotalPages(1);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters]);

  const updateFilterState = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const handleSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    updateFilterState({ ...filters, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFilterState({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilterState({ ...filters, search: searchTerm });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      make: "",
      year: "",
      body_style: "",
      transmission: "",
      drivetrain: "",
      engine: "",
      minPrice: "",
      maxPrice: "",
      mileage: "",
      color: "",
      priceSort: "",
      search: "",
    };
    setSearchTerm("");
    updateFilterState(clearedFilters);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFiltersCount = Object.keys(filters).reduce((count, key) => {
    if (key === "search" || key === "priceSort") return count;
    return filters[key] ? count + 1 : count;
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle
        slogan={"Find Your Dream Car"}
        title={"All Latest Cars Are For Sale"}
        text={"Ready to hit the road? Call us Now at +1 306 261 4800"}
      />

      {/* Global Modern Search Bar */}
      {/* <div className="bg-white border-b border-gray-200 py-6 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by keyword, VIN, or vehicle description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 w-full rounded-lg text-base border-gray-300 bg-gray-50 focus-visible:bg-white focus-visible:ring-emerald-500"
              />
            </div>
            <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium text-base rounded-lg">
              Search
            </Button>
          </form>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Responsive Sidebar Filters System */}
          <aside className="w-full lg:w-1/4 shrink-0">
            {/* Mobile Expand Trigger Button */}
            <div className="lg:hidden w-full mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm font-medium text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <span>Adjust Search Criteria</span>
                </div>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Group Container */}
            <div className={`${showFilters ? "block" : "hidden lg:block"} bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 sticky top-28`}>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg tracking-tight">Filter Options</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Make Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Make / Manufacturer</label>
                <Select
                  styles={selectStyles}
                  placeholder="All Makes"
                  isClearable
                  options={brands}
                  value={brands.find((b) => b.value === filters.make) || null}
                  onChange={(opt) => handleSelectChange("make", opt)}
                />
              </div>

             

              {/* Mileage Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Mileage Limit</label>
                <Select
                  styles={selectStyles}
                  placeholder="Any Mileage"
                  isClearable
                  options={mileageOptions}
                  value={mileageOptions.find((o) => o.value === filters.mileage) || null}
                  onChange={(opt) => handleSelectChange("mileage", opt)}
                />
              </div>

              {/* Year Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Production Year</label>
                <Select
                  styles={selectStyles}
                  placeholder="Any Year"
                  isClearable
                  options={years.map((y) => ({ value: y.toString(), label: y.toString() }))}
                  value={filters.year ? { value: filters.year, label: filters.year } : null}
                  onChange={(opt) => handleSelectChange("year", opt)}
                />
              </div>

              {/* Body Style Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Body Style</label>
                <Select
                  styles={selectStyles}
                  placeholder="All Categories"
                  isClearable
                  options={bodyStyles.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                  value={filters.body_style ? { value: filters.body_style, label: filters.body_style.charAt(0).toUpperCase() + filters.body_style.slice(1) } : null}
                  onChange={(opt) => handleSelectChange("body_style", opt)}
                />
              </div>

              {/* Transmission Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Transmission</label>
                <Select
                  styles={selectStyles}
                  placeholder="All Transmissions"
                  isClearable
                  options={transmissions.map((t) => ({ value: t, label: t }))}
                  value={filters.transmission ? { value: filters.transmission, label: filters.transmission.charAt(0).toUpperCase() + filters.transmission.slice(1) } : null}
                  onChange={(opt) => handleSelectChange("transmission", opt)}
                />
              </div>
              {/* Exterior Color Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Exterior Color</label>
                <Select
                  styles={selectStyles}
                  placeholder="Any Color"
                  isClearable
                  options={colors.map((c) => ({ value: c.toLowerCase(), label: c }))}
                  value={filters.color ? { value: filters.color, label: filters.color.charAt(0).toUpperCase() + filters.color.slice(1) } : null}
                  onChange={(opt) => handleSelectChange("color", opt)}
                />
              </div>

              {/* Drivetrain Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Drivetrain</label>
                <Select
                  styles={selectStyles}
                  placeholder="Any Drive Configuration"
                  isClearable
                  options={drivetrains.map((d) => ({ value: d, label: d }))}
                  value={filters.drivetrain ? { value: filters.drivetrain, label: filters.drivetrain } : null}
                  onChange={(opt) => handleSelectChange("drivetrain", opt)}
                />
              </div>

              {/* Engine Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Engine Setup</label>
                <Select
                  styles={selectStyles}
                  placeholder="All Engine Configurations"
                  isClearable
                  options={engines.map((e) => ({ value: e, label: e }))}
                  value={filters.engine ? { value: filters.engine, label: filters.engine } : null}
                  onChange={(opt) => handleSelectChange("engine", opt)}
                />
              </div>

              

               {/* Price Range Parameter Block */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price Range</label>
                <div className="space-y-2">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="number"
                      name="minPrice"
                      placeholder="Minimum Price"
                      value={filters.minPrice}
                      onChange={handleInputChange}
                      className="pl-9 h-10 border-gray-200 focus-visible:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="number"
                      name="maxPrice"
                      placeholder="Maximum Price"
                      value={filters.maxPrice}
                      onChange={handleInputChange}
                      className="pl-9 h-10 border-gray-200 focus-visible:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Main Engine Context Block */}
          <main className="flex-1 w-full">

            {/* Live Counter & Context Sorting Top Bar Panel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {loading ? "Refreshing Inventory..." : `Showing ${totalCars} Vehicles`}
                </h2>
              </div>

              {/* Specialized Sorting Dropdown Widget */}
              <div className="w-full sm:w-64 flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Sort By:</span>
                <div className="w-full">
                  <Select
                    styles={selectStyles}
                    placeholder="Featured Inventory"
                    isClearable={false}
                    options={[
                      { value: "", label: "Default Sorting" },
                      { value: "asc", label: "Price: Low to High" },
                      { value: "desc", label: "Price: High to Low" },
                    ]}
                    value={
                      filters.priceSort === "asc"
                        ? { value: "asc", label: "Price: Low to High" }
                        : filters.priceSort === "desc"
                          ? { value: "desc", label: "Price: High to Low" }
                          : { value: "", label: "Default Sorting" }
                    }
                    onChange={(opt) => handleSelectChange("priceSort", opt)}
                  />
                </div>
              </div>
            </div>

            {/* Main Product Layout Block */}
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[450px] bg-white border border-gray-200 rounded-2xl shadow-sm gap-4">
                <BlinkingDots />
              </div>
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[450px] bg-white border border-gray-200 rounded-2xl shadow-sm border-dashed p-8 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Car className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Vehicles Match Your Criteria</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                  We could not find matching elements. Try removing active filters or tweaking your maximum and minimum values.
                </p>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={handleClearFilters}
                    className="mt-5 bg-primary text-white hover:bg-primary/90 font-medium px-5 rounded-lg"
                  >
                    Clear Filter Sub-Layers
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* Responsive Car Matrix Output */}
                <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
                  {cars.map((car) => (
                    <CarComponent key={car._id} car={car} />
                  ))}
                </div>

                {/* Pagination Controls Wrapper */}
                {totalPages > 1 && (
                  <div className="mt-10 border-t border-gray-200 pt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}