import Link from "next/link";
import { Gauge, Calendar, Settings, ArrowRight, Heart, Share2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function Car({ car }) {
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
      <div className="group mb-10 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <Link href={`/car/${car?.url}`}>
            <div className="relative h-[180px] md:h-[180px] overflow-hidden">
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

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
              <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
              <Share2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Year & Body Style (Dynamic conditional wrappers) */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {car?.year ? (
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">{car.year}</span>
              </div>
            ) : (
              <div /> // Keeps body style pushed to the right side if no year exists
            )}
            {car?.body_style && (
              <Badge variant="outline" className="text-xs capitalize">
                {car.body_style}
              </Badge>
            )}
          </div>

          {/* Car Name */}
          <h3 className="mb-1">
            <Link
              href={`/car/${car?.url}`}
              className="text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2"
            >
              {car?.name || "Untitled Car"}
            </Link>
          </h3>

          {/* Car Model (Shows right below the primary name layout if available) */}
          {car?.model && (
            <p className="text-sm font-medium text-gray-500 mb-3 capitalize">
              Model: {car.model}
            </p>
          )}

          {/* Key Specs */}
          <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Gauge className="w-4 h-4 text-primary" />
              <span className="font-medium">{formatMileage(car?.km || 0)}</span>
              <span className="text-gray-400 text-xs">km</span>
            </div>
            {car?.transmission && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Settings className="w-4 h-4 text-primary" />
                <span className="font-medium capitalize">{car.transmission}</span>
              </div>
            )}
            {car?.drivetrain && (
              <Badge variant="secondary" className="text-xs">
                {car.drivetrain}
              </Badge>
            )}
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(car?.price || 0)}
              </p>
              {car?.exterior_colour && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {car.exterior_colour}
                </p>
              )}
            </div>
            <Link href={`/car/${car?.url}`}>
              <Button variant="link" className="group/btn p-0 h-auto">
                <span className="font-medium">View Details</span>
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Engine Info */}
          {car?.engine && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs bg-gray-50">
                {car.engine}
              </Badge>
              {car?.fuel_efficiency && (
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {car.fuel_efficiency}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}