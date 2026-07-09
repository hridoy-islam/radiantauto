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
  Check,
  Battery,
  Zap,
  Users,
  Award,
  MapPin,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  getCompareList,
  removeFromCompare,
  clearCompare,
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

const formatMileage = (mileage, unit = "km") => {
  return `${new Intl.NumberFormat("en-US").format(mileage || 0)} ${unit}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num || 0);
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
        `/cars?status=available&searchTerm=${q}&limit=8`,
      );
      const result = res.data.data.result || res.data.data || [];
      setSearchResults(
        result.filter((item) => !cars.some((c) => c._id === item._id)),
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

  // Define specification groups based on actual model schema
  const specGroups = useMemo(() => {
    if (cars.length === 0) return [];

    return [
      {
        title: "Pricing & Availability",
        icon: <DollarSign className="w-4 h-4" />,
        specs: [
          { label: "Price", key: "price", format: "price" },
          { label: "Condition", key: "condition", format: "text" },
          { label: "Status", key: "status", format: "badge" },
          { label: "Stock Number", key: "stock", format: "text" },
          { label: "VIN", key: "vin", format: "text" },
        ],
      },
      {
        title: "Basic Information",
        icon: <CarIcon className="w-4 h-4" />,
        specs: [
          { label: "Make", key: "carBrand", format: "brand" },
          { label: "Model", key: "model", format: "text" },
          { label: "Trim", key: "trim", format: "text" },
          { label: "Model Year", key: "modelYear", format: "text" },
          { label: "Body Style", key: "body_style", format: "text" },
          { label: "Segment", key: "segment", format: "text" },
        ],
      },
      {
        title: "Engine & Performance",
        icon: <Fuel className="w-4 h-4" />,
        specs: [
          { label: "Engine", key: "engine", format: "text" },
          { label: "Engine Size", key: "engineSize", format: "text" },
          { label: "Engine Type", key: "engineType", format: "text" },
          { label: "Horsepower", key: "horsepower", format: "number" },
          { label: "Torque", key: "torque", format: "number" },
          {
            label: "Acceleration (0-60)",
            key: "acceleration",
            format: "number",
          },
          { label: "Transmission", key: "transmission", format: "text" },
          {
            label: "Transmission Details",
            key: "transmissionDetails",
            format: "text",
          },
          { label: "Drivetrain", key: "drivetrain", format: "text" },
        ],
      },
      {
        title: "Fuel & Efficiency",
        icon: <Gauge className="w-4 h-4" />,
        specs: [
          { label: "Fuel Type", key: "fuelType", format: "text" },
          { label: "Fuel Efficiency", key: "fuel_efficiency", format: "text" },
          { label: "City MPG", key: "fuelEconomyCity", format: "number" },
          { label: "Highway MPG", key: "fuelEconomyHighway", format: "number" },
          {
            label: "Combined MPG",
            key: "fuelEconomyCombined",
            format: "number",
          },
          { label: "Electric Range", key: "electricRange", format: "number" },
          {
            label: "Battery Capacity",
            key: "batteryCapacity",
            format: "number",
          },
          { label: "Emissions", key: "emissions", format: "number" },
        ],
      },
      {
        title: "Mileage & Usage",
        icon: <Gauge className="w-4 h-4" />,
        specs: [
          { label: "Mileage", key: "mileage", format: "mileage" },
          { label: "Mileage Unit", key: "mileageUnit", format: "text" },
          { label: "Previous Owners", key: "previousOwners", format: "number" },
          { label: "One Owner", key: "oneOwner", format: "boolean" },
        ],
      },
      {
        title: "Dimensions & Capacity",
        icon: <Settings className="w-4 h-4" />,
        specs: [
          { label: "Doors", key: "doors", format: "number" },
          { label: "Seats", key: "seats", format: "number" },
          { label: "Cargo Capacity", key: "cargoCapacity", format: "number" },
          { label: "Towing Capacity", key: "towingCapacity", format: "number" },
        ],
      },
      {
        title: "Exterior",
        icon: <Palette className="w-4 h-4" />,
        specs: [
          { label: "Exterior Color", key: "exterior_colour", format: "text" },
          { label: "Interior Color", key: "interior_colour", format: "text" },
        ],
      },
      {
        title: "History & Condition",
        icon: <Shield className="w-4 h-4" />,
        specs: [
          { label: "Accident Free", key: "accidentFree", format: "boolean" },
          {
            label: "Carfax Available",
            key: "carfaxAvailable",
            format: "boolean",
          },
          {
            label: "Service Records",
            key: "serviceRecords",
            format: "boolean",
          },
          {
            label: "Province Registered",
            key: "provinceRegistered",
            format: "text",
          },
          { label: "Country", key: "country", format: "text" },
        ],
      },
      {
        title: "Safety & Ratings",
        icon: <Star className="w-4 h-4" />,
        specs: [
          { label: "Safety Rating", key: "safetyRating", format: "text" },
        ],
      },
      {
        title: "Dealer Information",
        icon: <MapPin className="w-4 h-4" />,
        specs: [{ label: "Dealer Notes", key: "dealerNotes", format: "text" }],
      },
    ];
  }, [cars]);

  const getSpecValue = (car, spec) => {
    const val = car?.[spec.key];
    if (val === undefined || val === null || val === "") return "—";

    switch (spec.format) {
      case "price":
        return formatPrice(val);
      case "mileage":
        return formatMileage(val, car?.mileageUnit);
      case "number":
        return formatNumber(val);
      case "boolean":
        return val ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <X className="w-4 h-4 text-red-400" />
        );
      case "badge":
        const statusColors = {
          available: "bg-emerald-100 text-emerald-700",
          sold: "bg-red-100 text-red-700",
          pending: "bg-yellow-100 text-yellow-700",
          reserved: "bg-blue-100 text-blue-700",
          "on-hold": "bg-gray-100 text-gray-700",
        };
        return (
          <Badge className={statusColors[val] || "bg-gray-100 text-gray-700"}>
            {val}
          </Badge>
        );
      case "brand":
        return typeof val === "object"
          ? val?.brandName || val?.name || "—"
          : val;
      default:
        return val;
    }
  };

  const hasAnySpec = (specs) => {
    return specs.some((spec) =>
      cars.some((car) => {
        const val = car?.[spec.key];
        return val !== undefined && val !== null && val !== "";
      }),
    );
  };

  if (cars.length === 0 && !showSearch) {
    return (
      <>
        <PageTitle
          slogan={"Compare Vehicles"}
          title={"Vehicle Comparison"}
          text={"Add vehicles to compare their specs side by side."}
        />
        <div className="container mx-auto py-20">
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
                        {car.modelYear} &middot;{" "}
                        {formatMileage(car.mileage, car.mileageUnit)} &middot;{" "}
                        {formatPrice(car.price)}
                      </p>
                    </div>
                    <Plus className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 &&
              searchResults.length === 0 &&
              !searching && (
                <p className="text-gray-400 text-sm">
                  No vehicles found. Try a different search.
                </p>
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
              <h3 className="font-semibold text-gray-900">
                Add Another Vehicle
              </h3>
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
                        {car.modelYear} &middot;{" "}
                        {formatMileage(car.mileage, car.mileageUnit)}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 &&
              searchResults.length === 0 &&
              !searching && (
                <p className="mt-3 text-sm text-gray-400">
                  No matching vehicles found.
                </p>
              )}
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[900px]">
            {/* Image Row */}
            {/* Image Row */}
            <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-6">
              <div />
              {cars.map((car) => (
                <div key={car._id} className="relative group pt-2 px-2 -mx-2">
                  <button
                    onClick={() => handleRemove(car._id)}
                    className="absolute top-0 right-0 z-20 p-1.5 bg-white border border-gray-200 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200"
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
                        <p className="text-white/80 text-xs">{car.modelYear}</p>
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
                  const mileages = cars
                    .map((c) => c.mileage || 0)
                    .filter(Boolean);
                  const minMileage = Math.min(...mileages);
                  const isBestPrice = car.price === minPrice;
                  const isLowestMileage =
                    mileages.length > 0 && car.mileage === minMileage;
                  const badges = [];
                  if (isBestPrice) badges.push("Best Price");
                  if (isLowestMileage) badges.push("Lowest Mileage");
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

            {/* Spec Groups */}
            {specGroups.map((group) => {
              if (!hasAnySpec(group.specs)) return null;

              return (
                <div key={group.title} className="mb-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {group.icon}
                    </div>
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.specs.map((spec, specIdx) => (
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
                          <div
                            key={car._id}
                            className="text-sm text-gray-900 font-medium"
                          >
                            {getSpecValue(car, spec)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Features Section */}
            {cars.some((c) => c.features?.length > 0) && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Check className="w-4 h-4" />
                  </div>
                  Features
                </h3>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      cars.flatMap((c) =>
                        Array.isArray(c.features) ? c.features : [],
                      ),
                    ),
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
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                  Safety Features
                </h3>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      cars.flatMap((c) =>
                        Array.isArray(c.safety) ? c.safety : [],
                      ),
                    ),
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 items-center py-2.5 px-4 rounded-xl ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="text-sm text-gray-600 pl-3">{item}</span>
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

            {/* Awards Section */}
            {cars.some((c) => c.awards?.length > 0) && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  Awards & Recognition
                </h3>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      cars.flatMap((c) =>
                        Array.isArray(c.awards) ? c.awards : [],
                      ),
                    ),
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[200px_repeat(auto-fill,minmax(220px,1fr))] gap-3 items-center py-2.5 px-4 rounded-xl ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="text-sm text-gray-600 pl-3">{item}</span>
                      {cars.map((car) => (
                        <div key={car._id} className="flex items-center">
                          {Array.isArray(car.awards) &&
                          car.awards.includes(item) ? (
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
            Can't decide? Browse more vehicles or contact us for expert advice.
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

// Need to add DollarSign import
const DollarSign = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
