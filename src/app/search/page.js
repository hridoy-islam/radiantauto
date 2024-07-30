"use client";
import { useEffect, useState } from "react";
import Car from "../components/Car";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import axiosInstance from "@/api/axiosInstance";

export default function Search() {
  const [cars, setCars] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    year: "",
    cartype: "",
    transmission: "",
    price: "",
  });
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const years = Array.from(
    { length: 30 },
    (_, index) => new Date().getFullYear() - index
  );
  // const fetchData = async (page) => {
  //   const res = await axiosInstance.get(`/cars?page=${page}&status=available`);
  //   const updatedMenu = res.data.data.result.map((item) => ({
  //     ...item,
  //     image_gallery: JSON.parse(item.image_gallery),
  //   }));
  //   setCars(updatedMenu);
  //   setTotalPages(res.data.data.meta.totalPage);
  // };
  const fetchData = async (page, filters = {}) => {
    try {
      let url = `/cars?status=available`;
      // Check if searchTerm is not empty before adding to the URL
      if (filters.year.trim() !== "") {
        url += `&year=${filters.year}`;
      }
      if (filters.cartype.trim() !== "") {
        url += `&cartype=${filters.cartype}`;
      }
      if (filters.transmission.trim() !== "") {
        url += `&transmission=${filters.transmission}`;
      }
      if (filters.price.trim() !== "") {
        url += `&sortBy=price&sortDirection=${filters.price}`;
      }
      const res = await axiosInstance.get(url);
      const updatedMenu = res.data.data.result.map((item) => ({
        ...item,
        image_gallery: JSON.parse(item.image_gallery),
      }));
      setCars(updatedMenu);
      setTotalPages(res.data.data.meta.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <>
      <PageTitle
        slogan={"Find Your Dream Car"}
        title={"All Latest Cars Are For Sale"}
        text={"Ready to hit the road? Call Now"}
      />
      <div className="container mx-auto p-8 bg-white shadow-md my-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
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
              onChange={handleFilterChange}
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
              id="cartype"
              name="cartype"
              value={filters.cartype}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">All</option>
              <option value="suv">SUV</option>
              <option value="zip">ZIP</option>
              <option value="sedan">Sedan</option>
              <option value="truck">Truck</option>
              <option value="awd">AWD / 4WD</option>
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
              onChange={handleFilterChange}
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
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <select
              id="price"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8 bg-white shadow-xl my-10">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          {cars?.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
