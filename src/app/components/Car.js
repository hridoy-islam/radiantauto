import Link from "next/link";
import { useState, useEffect } from "react";
import { Gauge, GitCompareArrows, ArrowRight, Check, Fuel, Activity, ShieldCheck } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { addToCompare, removeFromCompare, isInCompare } from "../../lib/compare";
import { useToast } from "../../components/ui/use-toast";

export default function Car({ car }) {
  const [inCompare, setInCompare] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { toast } = useToast();

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
      toast({
        title: "Comparison Updated",
        description: "Removed from compare",
        variant: "destructive",
      });
    } else {
      addToCompare(car);
      setInCompare(true);
      toast({
        title: "Comparison Updated",
        description: "Added to compare",
      });
    }

    setTimeout(() => setAnimating(false), 300);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat("en-US").format(mileage || 0);
  };

  const getCarHeading = () => {
    const year = car?.modelYear || car?.year;
    const make = car?.carBrand?.brandName || "";
    const model = car?.model || "";
    const trim = car?.trim || "";

    const parts = [year, make, model, trim].filter(Boolean);
    return parts.join(" ") || "Untitled Car";
  };

  return (
    <div className="h-full w-full max-w-[360px] mx-auto">
      <div className="relative group flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        
        {/* Compact Image Container */}
        <Link href={`/car/${car?.url}`} className="relative block overflow-hidden aspect-[16/10] bg-gray-50">
          <img
            src={car?.thumbnailImage || "/images/placeholder.png"}
            alt={getCarHeading()}
            className="h-full w-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          {car?.status && (
            <div className="absolute top-2.5 left-2.5">
              <Badge
                className={`text-[10px] px-2 py-0.5 font-semibold tracking-wide uppercase ${
                  car.status === "available"
                    ? "bg-emerald-600 text-white hover:bg-emerald-600"
                    : "bg-gray-700 text-white hover:bg-gray-700"
                }`}
              >
                {car.status === "available" ? "Available" : car.status}
              </Badge>
            </div>
          )}

          {/* Compare FAB */}
    <button
  onClick={handleCompare}
  className={`absolute top-2.5 right-2.5 px-2 py-2 rounded-full shadow-md backdrop-blur-md transition-all duration-200 text-[10px] font-medium leading-none ${
    inCompare
      ? "bg-primary text-white scale-105"
      : "bg-white/90 text-gray-700 hover:bg-white "
  } ${animating ? "scale-95" : ""}`}
  title={inCompare ? "Remove from compare" : "Add to compare"}
>
  {inCompare ? "Remove" : "Compare"}
</button>
        </Link>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4">
          
          {/* Tags & Pills Row */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {car?.condition && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-blue-50 px-1.5 py-0.5 rounded">
                {car.condition}
              </span>
            )}
            {car?.body_style && (
              <span className="text-[10px] font-medium text-gray-500 capitalize bg-gray-100 px-1.5 py-0.5 rounded">
                {car.body_style}
              </span>
            )}
          </div>

          {/* Title Heading */}
          <Link href={`/car/${car?.url}`}>
            <h3 className="text-sm font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1 mb-3">
              {getCarHeading()}
            </h3>
          </Link>

          {/* Technical Specs 2x2 Clean Professional Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 text-xs border-b border-gray-50 pb-3.5">
            {/* Mileage */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <Gauge className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate font-medium">
                {formatMileage(car?.mileage)} <span className="text-[10px] text-gray-400 font-normal">{car?.mileageUnit || "km"}</span>
              </span>
            </div>

            {/* Fuel Type */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <Fuel className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate font-medium">{car?.fuelType || "N/A"}</span>
            </div>

            {/* Drivetrain */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <Activity className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate font-medium">{car?.drivetrain || car?.transmission || "N/A"}</span>
            </div>

            {/* Accident Free Validation */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <ShieldCheck className={`w-3.5 h-3.5 flex-shrink-0 ${car?.accidentFree !== false ? "text-emerald-500" : "text-gray-400"}`} />
              <span className="truncate font-medium">
                {car?.accidentFree !== false ? "Accident Free" : "Report Avail."}
              </span>
            </div>
          </div>

          <div className="flex-grow" />

          {/* Modernized Pricing & Actions Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <p className="text-xl font-black text-gray-900 tracking-tight">
                {formatPrice(car?.price || 0)}
              </p>
             
            </div>

            <Link href={`/car/${car?.url}`}>
              <Button 
                variant="default" 
                size="sm"
                className="bg-gray-900 hover:bg-primary text-white font-medium text-xs px-3 h-9 transition-colors group/btn"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}