import Link from "next/link";
import { useState, useEffect } from "react";
import { Gauge, Calendar, Settings,GitCompareArrows, ArrowRight, Heart, Share2, BarChart3, Check } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { addToCompare, removeFromCompare, isInCompare } from "../../lib/compare";

export default function Car({ car }) {
  const [inCompare, setInCompare] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (car?._id) {
      setInCompare(isInCompare(car._id));
    }
  }, [car?._id]);

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    if (inCompare) {
      removeFromCompare(car._id);
      setInCompare(false);
    } else {
      addToCompare(car);
      setInCompare(true);
    }
    setTimeout(() => setAnimating(false), 300);
  };
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format mileage
  const formatMileage = (km) => {
    return new Intl.NumberFormat("en-US").format(km);
  };

  return (
    <div className="mx-auto h-full min-w-[300px] px-4 xs:min-w-[368px] sm:min-w-[510px] md:min-w-[340px] lg:min-w-[312px] xl:min-w-[282px] 2xl:min-w-[325px]">
      <div className="group mb-10 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[450px]">
        {/* Image Container - Fixed Height */}
        <div className="relative overflow-hidden flex-shrink-0">
          <Link href={`/car/${car?.url}`}>
            <div className="relative h-[150px] w-full overflow-hidden">
              <img
                src={
                  car?.thumbnailImage || "/images/placeholder.png"
                }
                alt={car?.name || "Car"}
                className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Status Badge */}
          {car?.status && (
            <div className="absolute top-4 left-4">
              <Badge
                className={`${
                  car.status === "available"
                    ? "bg-green-500/90 text-white border-green-400"
                    : "bg-red-500/90 text-white border-red-400"
                } backdrop-blur-sm`}
              >
                {car.status === "available" ? "Available" : "Sold"}
              </Badge>
            </div>
          )}

          {/* Compare Button - Now with opacity transitions for hover effect */}
          <button
            onClick={handleCompare}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 shadow-md ${
              inCompare
                ? "bg-primary text-white shadow-primary/30 scale-110 opacity-100"
                : "bg-white/90 text-gray-700 hover:bg-white hover:scale-105 opacity-0 group-hover:opacity-100"
            } ${animating ? "scale-90" : ""}`}
            title={inCompare ? "Remove from compare" : "Add to compare"}
          >
            {inCompare ? (
              <Check className="w-4 h-4" />
            ) : (
              <GitCompareArrows  className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Content - Flex grows to fill remaining space */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Top Section - Flex grow pushes bottom section down */}
          <div className="flex-grow">
            {/* Year & Body Style */}
            <div className="flex items-center justify-between gap-2 mb-2 min-h-[24px]">
              {car?.year ? (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-semibold">{car.year}</span>
                </div>
              ) : (
                <div />
              )}
              {car?.body_style && (
                <Badge variant="outline" className="text-xs capitalize flex-shrink-0">
                  {car.body_style}
                </Badge>
              )}
            </div>

            {/* Car Name */}
            <h3 className="mb-1 min-h-[28px]">
              <Link
                href={`/car/${car?.url}`}
                className="text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2"
              >
                {car?.name || "Untitled Car"}
              </Link>
            </h3>

            {/* Car Model */}
            {car?.model && (
              <p className="text-sm font-medium text-gray-500  capitalize">
                Model: {car.model}
              </p>
            )}

            {/* Key Specs */}
            <div className="flex flex-wrap items-center gap-4  border-b border-gray-100 min-h-[56px]">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Gauge className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium">{formatMileage(car?.km || 0)}</span>
                <span className="text-gray-400 text-xs">km</span>
              </div>
              {car?.transmission && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Settings className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium capitalize">{car.transmission}</span>
                </div>
              )}
              {car?.drivetrain && (
                <Badge variant="secondary" className="text-xs">
                  {car.drivetrain}
                </Badge>
              )}
            </div>
          </div>

          {/* Bottom Section - Fixed at bottom */}
          <div className="mt-auto">
            {/* Price & Action */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(car?.price || 0)}
                </p>
                {car?.exterior_colour && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {car.exterior_colour}
                  </p>
                )}
                {!car?.exterior_colour && <div className="h-[20px]" />}
              </div>
              <Link href={`/car/${car?.url}`}>
                <Button variant="link" className="group/btn p-0 h-auto">
                  <span className="font-medium">View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Engine Info */}
            {car?.engine ? (
              <div className="flex flex-wrap gap-2 min-h-[28px]">
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {car.engine}
                </Badge>
                {car?.fuel_efficiency && (
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {car.fuel_efficiency}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="min-h-[28px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}