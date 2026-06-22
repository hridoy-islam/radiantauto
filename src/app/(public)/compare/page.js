"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  X,
  Trash2,
  Plus,
  Search as SearchIcon,
  Gauge,
  Calendar,
  Settings,
  Fuel,
  Cog,
  Palette,
  ArrowLeft,
  Car as CarIcon,
  Loader2,
  ChevronDown,
  Star,
  Shield,
  Check
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  getCompareList,
  removeFromCompare,
  clearCompare
} from "../../../lib/compare";
import axiosInstance from "../../../lib/axios";
import PageTitle from "../../components/PageTitle";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const formatMileage = (km) => {
  return new Intl.NumberFormat("en-US").format(km || 0);
};

export default function ComparePage() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setCars(getCompareList());
  }, []);

  const handleRemove = (carId) => {
    const updated = removeFromCompare(carId);
    setCars(updated);
  };

  const handleClearAll = () => {
    clearCompare();
    setCars([]);
  };

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    try {
      const res = await axiosInstance.get(
        `/cars?status=available&searchTerm=${q}&limit=8`
      );
      const result = res.data.data.result || res.data.data || [];
      setSearchResults(
        result.filter(
          (item) => !cars.some((c) => c._id === item._id)
        )
      );
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAddCar = (car) => {
    const updated = [...cars, car];
    localStorage.setItem("radiant_compare", JSON.stringify(updated));
    setCars(updated);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
  };

  const allSpecs = useMemo(() => {
    if (cars.length === 0) return [];
    const keys = [
      { label: "Price", key: "price", type: "price" },
      { label: "Year", key: "year", type: "text" },
      { label: "Mileage", key: "km", type: "mileage" },
      { label: "Transmission", key: "transmission", type: "text" },
      { label: "Drivetrain", key: "drivetrain", type: "text" },
      { label: "Engine", key: "engine", type: "text" },
      { label: "Body Style", key: "body_style", type: "text" },
      { label: "Exterior Color", key: "exterior_colour", type: "text" },
      { label: "Interior Color", key: "interior_colour", type: "text" },
      { label: "Fuel Efficiency", key: "fuel_efficiency", type: "text" },
      { label: "Stock ID", key: "stock", type: "text" },
      { label: "VIN", key: "vin", type: "text" },
    ];
    return keys;
  }, [cars]);

  const getSpecValue = (car, spec) => {
    const val = car?.[spec.key];
    if (!val) return "—";
    if (spec.type === "price") return formatPrice(val);
    if (spec.type === "mileage") return `${formatMileage(val)} km`;
    return val;
  };

  if (cars.length === 0 && !showSearch) {
    return (
      <>
        <PageTitle
          slogan={"Compare Vehicles"}
          title={"Vehicle Comparison"}
          text={"Add vehicles to compare their specs side by side."}
        />
        <div className="container mx-auto  py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Vehicles to Compare
            </h2>
            <p className="text-gray-500 mb-8 max-w-3xl mx-auto">
              Start by searching for a vehicle to add to your comparison list.
            </p>
            <div className="max-w-lg mx-auto mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for a vehicle..."
                  className="pl-12 h-14 text-base rounded-xl border-gray-200 focus:border-primary"
                />
                {searching && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
                )}
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="space-y-3 max-w-lg mx-auto">
                {searchResults.map((car) => (
                  <button
                    key={car._id}
                    onClick={() => handleAddCar(car)}
                    className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group text-left"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={car.thumbnailImage || "/images/placeholder.png"}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {car.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {car.year} &middot; {formatMileage(car.km)} km &middot;{" "}
                        {formatPrice(car.price)}
                      </p>
                    </div>
                    <Plus className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
              <p className="text-gray-400 text-sm">No vehicles found. Try a different search.</p>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle
        slogan={"Compare Vehicles"}
        title={"Vehicle Comparison"}
        text={"Compare specs and features to find the perfect vehicle."}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Search
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">
              {cars.length} vehicle{cars.length > 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSearch(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Search Panel */}
        {showSearch && (
          <div className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Add Another Vehicle</h3>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-w-lg">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by car name, model..."
                  className="pl-12 h-12 text-base rounded-xl border-gray-200 focus:border-primary"
                />
                {searching && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
                )}
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {searchResults.map((car) => (
                  <button
                    key={car._id}
                    onClick={() => handleAddCar(car)}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={car.thumbnailImage || "/images/placeholder.png"}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {car.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.year} &middot; {formatMileage(car.km)} km
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
              <p className="mt-3 text-sm text-gray-400">No matching vehicles found.</p>
            )}
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[900px]">
            {/* Image Row */}
            <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-6">
              <div />
              {cars.map((car) => (
                <div key={car._id} className="relative group">
                  <button
                    onClick={() => handleRemove(car._id)}
                    className="absolute -top-2 -right-2 z-10 p-1.5 bg-white border border-gray-200 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200"
                  >
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </button>
                  <Link href={`/car/${car.url}`}>
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        src={car.thumbnailImage || "/images/placeholder.png"}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-bold text-sm truncate">
                          {car.name}
                        </p>
                        <p className="text-white/80 text-xs">
                          {car.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Highlight: Best Value Badge */}
            {cars.length >= 2 && (
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-8">
                <div />
                {cars.map((car, idx) => {
                  const prices = cars.map((c) => c.price || 0).filter(Boolean);
                  const minPrice = Math.min(...prices);
                  const maxMileage = Math.max(
                    ...cars.map((c) => c.km || 0)
                  );
                  const isBestPrice = car.price === minPrice;
                  const isLowestKm =
                    cars.filter((c) => c.km).length > 0 &&
                    car.km === Math.min(...cars.map((c) => c.km || Infinity));
                  const badges = [];
                  if (isBestPrice) badges.push("Best Price");
                  if (isLowestKm) badges.push("Lowest Mileage");
                  return (
                    <div key={idx} className="flex flex-wrap gap-1.5">
                      {badges.map((badge) => (
                        <Badge
                          key={badge}
                          className="bg-emerald-500/10 text-emerald-700 border-emerald-200"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spec Rows */}
            <div className="space-y-1">
              {allSpecs.map((spec, specIdx) => (
                <div
                  key={spec.key}
                  className={`grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 items-center py-3 px-4 rounded-xl ${
                    specIdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-primary/60" />
                    <span className="text-sm font-semibold text-gray-700">
                      {spec.label}
                    </span>
                  </div>
                  {cars.map((car) => (
                    <div key={car._id} className="text-sm text-gray-900 font-medium">
                      {getSpecValue(car, spec)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Features Section */}
            {cars.some((c) => c.features?.length > 0) && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Features
                </h3>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      cars.flatMap((c) =>
                        Array.isArray(c.features) ? c.features : []
                      )
                    )
                  ).map((feature, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 items-center py-2.5 px-4 rounded-xl ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="text-sm text-gray-600 pl-3">
                        {feature}
                      </span>
                      {cars.map((car) => (
                        <div key={car._id} className="flex items-center">
                          {Array.isArray(car.features) &&
                          car.features.includes(feature) ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <span className="w-4 h-4 text-gray-300">—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Section */}
            {cars.some((c) => c.safety?.length > 0) && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Safety
                </h3>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      cars.flatMap((c) =>
                        Array.isArray(c.safety) ? c.safety : []
                      )
                    )
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 items-center py-2.5 px-4 rounded-xl ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="text-sm text-gray-600 pl-3">
                        {item}
                      </span>
                      {cars.map((car) => (
                        <div key={car._id} className="flex items-center">
                          {Array.isArray(car.safety) &&
                          car.safety.includes(item) ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <span className="w-4 h-4 text-gray-300">—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">
            Can&apos;t decide? Browse more vehicles or contact us for expert advice.
          </p>
          <Link href="/search">
            <Button variant="default" size="lg" className="rounded-full">
              <SearchIcon className="w-4 h-4 mr-2" />
              Browse All Vehicles
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
