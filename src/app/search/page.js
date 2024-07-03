"use client";
import Car from "../components/Car";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";

export default function Search() {
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
          <Car />
          <Car />
          <Car />
          <Car />
          <Car />
          <Car />
          <Car />
          <Car />
        </div>
        <Pagination />
      </div>
    </>
  );
}
