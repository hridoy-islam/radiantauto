"use client";
import { useEffect, useState } from "react";
import Car from "../components/Car";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import axiosInstance from "@/api/axiosInstance";

export default function Search() {
  const [cars, setCars] = useState();
  const fetchData = async () => {
    const res = await axiosInstance.get("/cars?status=available");
    setCars(res.data.data.result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <PageTitle
        slogan={"Find Your Dream Car"}
        title={"All Latest Cars Are For Sale"}
        text={"Ready to hit the road? Call Now"}
      />
      <div className="container mx-auto my-10">
        <SearchFilter />
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          {cars?.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
}
