"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CarComponent from "../../components/Car";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../../lib/axios";
import { Search as SearchIcon, SlidersHorizontal, X, Loader2, Car } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filters, setFilters] = useState({
    year: searchParams.get("year") || "",
    body_style: searchParams.get("body_style") || "",
    transmission: searchParams.get("transmission") || "",
    drivetrain: searchParams.get("drivetrain") || "",
    engine: searchParams.get("engine") || "",
    price: searchParams.get("price") || "",
    search: searchParams.get("search") || "",
  });


  const years = Array.from(
    { length: 30 },
    (_, index) => new Date().getFullYear() - index
  );

  const bodyStyles = ["sedan", "coupe", "hatchback"];
  const transmissions = ["automatic", "manual"];
  const engines = ["V6", "V8", "I4", "I6"];
  const drivetrains = ["FWD", "RWD", "AWD"];

  const fetchData = async (page, currentFilters) => {
    try {
      setLoading(true);
      let url = `/cars?status=available&page=${page}&limit=10`;

      // Add filters to URL
      if (currentFilters.year) {
        url += `&year=${currentFilters.year}`;
      }
      if (currentFilters.body_style) {
        url += `&body_style=${currentFilters.body_style}`;
      }
      if (currentFilters.transmission) {
        url += `&transmission=${currentFilters.transmission}`;
      }
      if (currentFilters.drivetrain) {
        url += `&drivetrain=${currentFilters.drivetrain}`;
      }
      if (currentFilters.engine) {
        url += `&engine=${currentFilters.engine}`;
      }
      if (currentFilters.search) {
        url += `&searchTerm=${currentFilters.search}`;
      }
      if (currentFilters.price) {
        url += `&sortBy=price&sortDirection=${currentFilters.price}`;
      }

      const res = await axiosInstance.get(url);
      const result = res.data.data.result || res.data.data || [];
      const meta = res.data.data.meta || {};

      const sorted = [...result].sort((a, b) => {
        if (a.featureCar && !b.featureCar) return -1;
        if (!a.featureCar && b.featureCar) return 1;
        return 0;
      });
      setCars(sorted);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      year: "",
      body_style: "",
      transmission: "",
      drivetrain: "",
      engine: "",
      price: "",
      search: "",
    };
    setFilters(clearedFilters);
    setSearchTerm("");
    setCurrentPage(1);
    router.push("/search", { scroll: false });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <PageTitle
        slogan={"Find Your Dream Car"}
        title={"All Latest Cars Are For Sale"}
        text={"Ready to hit the road? Call us Now at +1 306 261 4800"}
      />

 
     

      {/* Filters */}
      <div className="container mx-auto mt-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Year Filter */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Style Filter */}
              <div>
                <label
                  htmlFor="body_style"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Body Style
                </label>
                <select
                  id="body_style"
                  name="body_style"
                  value={filters.body_style}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">All Styles</option>
                  {bodyStyles.map((style) => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label
                  htmlFor="transmission"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map((trans) => (
                    <option key={trans} value={trans}>
                      {trans.charAt(0).toUpperCase() + trans.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drivetrain Filter */}
              <div>
                <label
                  htmlFor="drivetrain"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Drivetrain
                </label>
                <select
                  id="drivetrain"
                  name="drivetrain"
                  value={filters.drivetrain}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">All Drivetrains</option>
                  {drivetrains.map((drive) => (
                    <option key={drive} value={drive}>
                      {drive}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engine Filter */}
              <div>
                <label
                  htmlFor="engine"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Engine
                </label>
                <select
                  id="engine"
                  name="engine"
                  value={filters.engine}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">All Engines</option>
                  {engines.map((engine) => (
                    <option key={engine} value={engine}>
                      {engine}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Sort Filter */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort by Price
                </label>
                <select
                  id="price"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition"
                >
                  <option value="">Default</option>
                  <option value="asc">Low To High</option>
                  <option value="desc">High To Low</option>
                </select>
              </div>
            </div>
          
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {loading ? "Searching..." : `${totalCars} Cars Found`}
            </h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Filters applied: {activeFiltersCount}
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-gray-500">Loading cars...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl">
            <Car className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">No Cars Found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your filters or search terms
            </p>
            {activeFiltersCount > 0 && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="mt-4"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Cars Grid */}
            <div className="grid lg:grid-cols-4 gap-2">
              {cars.map((car) => (
                <CarComponent key={car._id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}