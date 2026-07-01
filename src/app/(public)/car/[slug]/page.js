"use client";

import axiosInstance from "../../../../lib/axios";
import { ProductSlider } from "../../../components/ProductSlider";
import RelatedCars from "../../../components/RelatedCars";
import { VehicleInfo } from "../../../components/VehicleInfo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { 
  Calendar, 
  Gauge, 
  Settings, 
  Palette, 
  Fuel, 
  Cog, 
  DollarSign,
  ArrowLeft,
  Share2,
  Heart,
  Phone,
  MapPin,
  Check,
  Shield,
  Music,
  Wrench,
  Cpu,
  Car as CarIcon,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";
import { BlinkingDots } from "../../../../components/ui/blinking-dots";
import { addToCompare, removeFromCompare, isInCompare } from "../../../../lib/compare";
import { useRouter } from "next/navigation";

export default function CarDetailsPage({ params }) {
  const { slug } = params;
  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Media states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [inCompare, setInCompare] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const router = useRouter();
  
  // Video states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true); // Show video first if available

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/cars?url=${slug}&status=available`);
      const carData = res.data.data.result?.[0] || res.data.data;
      
      if (carData) {
        // Parse JSON fields if they're strings
        const jsonFields = [
          'image_gallery', 'features', 'exterior', 'interior', 
          'entertainment', 'mechanical', 'safety', 'techspecs', 
          'highlights', 'awards', 'packages', 'meta_keywords'
        ];
        
        jsonFields.forEach(field => {
          if (typeof carData[field] === 'string') {
            try {
              carData[field] = JSON.parse(carData[field]);
            } catch {
              carData[field] = [];
            }
          }
        });
        
        setCar(carData);
        
        // If video exists, show it first
        if (carData.videoUrl) {
          setShowVideo(true);
        }
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
      toast({
        title: "Error",
        description: "Failed to load vehicle details",
        variant: "destructive",
      });
    }
  };

  const fetchRelatedCars = async () => {
    try {
      const res = await axiosInstance.get(`/cars?limit=4&status=available`);
      const cars = res.data.data.result || res.data.data || [];
      const updatedCars = cars
        .filter(item => item.url !== slug) // Exclude current car
        .slice(0, 4)
        .map((item) => ({
          ...item,
          image_gallery: typeof item.image_gallery === 'string' 
            ? JSON.parse(item.image_gallery) 
            : item.image_gallery,
        }));
      setRelatedCars(updatedCars);
    } catch (error) {
      console.error("Error fetching related cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate standardized images list with thumbnail first
  const carImages = useMemo(() => {
    const images = [];
    
    // Add thumbnail first if it exists
    if (car?.thumbnailImage) {
      images.push(car.thumbnailImage);
    }
    
    // Add gallery images, filtering out any duplicates with thumbnail
    if (car?.image_gallery && Array.isArray(car.image_gallery)) {
      const galleryImages = car.image_gallery.filter(
        img => img !== car.thumbnailImage
      );
      images.push(...galleryImages);
    }
    
    // Fallback to placeholder if no images
    if (images.length === 0) {
      images.push("/images/placeholder.png");
    }
    
    return images;
  }, [car?.thumbnailImage, car?.image_gallery]);

  useEffect(() => {
    if (slug) {
      fetchData();
      fetchRelatedCars();
    }
  }, [slug]);

  useEffect(() => {
    if (car) {
      const title = `${car.modelYear || ''} ${car.carBrand?.brandName || ''} ${car.model || ''} ${car.trim || ''} | Radiant Auto`;
      document.title = title;

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && car.overview) {
        const plainText = car.overview.replace(/<[^>]+>/g, "").slice(0, 160);
        ogDesc.setAttribute("content", plainText);
      }
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", `https://radiant-auto.com/car/${slug}`);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://radiant-auto.com/car/${slug}`);
    }
  }, [car, slug]);

  useEffect(() => {
    if (car?._id) {
      setInCompare(isInCompare(car._id));
    }
  }, [car?._id]);

  const handleCompare = () => {
    if (inCompare) {
      removeFromCompare(car._id);
      setInCompare(false);
    } else {
      addToCompare(car);
      setInCompare(true);
      setShowCompareDialog(true);
      setTimeout(() => {
        setShowCompareDialog(false);
        router.push("/compare");
      }, 2000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat("en-US").format(mileage || 0);
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  // Get car heading
  const getCarHeading = () => {
    const year = car?.modelYear;
    const make = car?.carBrand?.brandName || '';
    const model = car?.model || '';
    const trim = car?.trim || '';
    
    const parts = [year, make, model, trim].filter(Boolean);
    return parts.join(' ') || car?.name || 'Untitled Vehicle';
  };

  // Get video embed URL
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=${isVideoMuted ? 1 : 0}&controls=1`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=${isVideoMuted ? 1 : 0}`;
    }
    
    // Direct video URL
    return url;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-4 bg-zinc-50">
        <BlinkingDots />
        <p className="text-zinc-500 font-medium tracking-tight text-sm">Loading vehicle portfolio...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-4 bg-zinc-50 px-4">
        <CarIcon className="w-16 h-16 text-zinc-300 stroke-[1.5]" />
        <h2 className="text-2xl font-semibold text-zinc-800 tracking-tight">Vehicle Not Found</h2>
        <p className="text-zinc-500 text-sm text-center max-w-sm">The vehicle you are looking for doesn't exist or has been removed from our active inventory.</p>
        <Link href="/search">
          <Button className="mt-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-6 transition-all">Browse Inventory</Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: CarIcon },
    { id: "features", label: "Features", icon: Check },
    { id: "specs", label: "Specifications", icon: Cpu },
    { id: "safety", label: "Safety", icon: Shield },
  ];

  return (
    <div className="bg-zinc-50/50 min-h-screen antialiased text-zinc-900 mt-28">
      {/* Header Banner */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="container mx-auto py-10 px-4 md:px-0">
          <Link href="/search" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 text-sm font-medium transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            Back to Catalog
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
             
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-sans">
                {getCarHeading()}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-zinc-400 text-sm font-medium">
                <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-zinc-300">
                  <Gauge className="w-4 h-4 text-zinc-500" />
                  {formatMileage(car?.mileage)} {car?.mileageUnit || 'km'}
                </span>
                {car?.body_style && (
                  <Badge variant="secondary" className="capitalize bg-zinc-800 text-zinc-200 border-zinc-700 font-semibold px-2.5 py-1.5 rounded-md">
                    {car.body_style}
                  </Badge>
                )}
                {car?.transmission && (
                  <Badge variant="secondary" className="capitalize bg-zinc-800 text-zinc-200 border-zinc-700 font-semibold px-2.5 py-1.5 rounded-md">
                    {car.transmission}
                  </Badge>
                )}
                {car?.status && (
                  <Badge className={`font-semibold px-2.5 py-1.5 rounded-md capitalize ${car.status === "available" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10" : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/10"}`}>
                    {car.status}
                  </Badge>
                )}
              </div>
            </div>
            <div className="lg:text-right border-t border-zinc-800 lg:border-t-0 pt-4 lg:pt-0">
              <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mb-1">MSRP Valuation</p>
              <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{formatPrice(car?.price)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-8/12 space-y-8">
            
            {/* Premium Interactive Media Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 overflow-hidden p-3 space-y-3">
              {/* Video Player - Show first if video URL exists */}
              {car?.videoUrl && showVideo && (
                <div className="relative w-full rounded-lg overflow-hidden bg-zinc-900">
                  <div className="relative aspect-video">
                    {car.videoUrl.includes('youtube.com') || car.videoUrl.includes('vimeo.com') || car.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={getVideoEmbedUrl(car.videoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Vehicle Video"
                      />
                    ) : (
                      <video
                        src={car.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay={isVideoPlaying}
                        muted={isVideoMuted}
                        loop
                        poster={carImages[0]}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => setShowVideo(false)}
                        className="bg-white/90 hover:bg-white text-zinc-900 p-2 rounded-full shadow-lg transition-all"
                        title="Switch to images"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Switch to Images Button */}
                    <button
                      onClick={() => setShowVideo(false)}
                      className="absolute bottom-4 left-4 bg-white/90 hover:bg-white text-zinc-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all"
                    >
                      View Images Instead
                    </button>
                  </div>
                </div>
              )}

              {/* Image Gallery - Show if no video or video hidden */}
              {(!car?.videoUrl || !showVideo) && (
                <>
                  <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative h-[300px] sm:h-[450px] w-full bg-zinc-900 rounded-lg overflow-hidden group cursor-zoom-in"
                  >
                    <img
                      src={carImages[activeImageIndex]}
                      alt={`${getCarHeading()} - Image ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    
                    {/* Image Navigation Arrows */}
                    {carImages.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-zinc-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-zinc-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Show Video Button */}
                    {car?.videoUrl && !showVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideo(true);
                        }}
                        className="absolute bottom-4 left-4 bg-white/90 hover:bg-white text-zinc-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Watch Video
                      </button>
                    )}
                    
                    {/* Counter Tag */}
                    <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-700/50">
                      {activeImageIndex + 1} / {carImages.length}
                    </div>
                  </div>

                  {/* Thumbnails List */}
                  {carImages.length > 1 && (
                    <div className="flex gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-thin scrollbar-thumb-zinc-300">
                      {carImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all border-2 ${
                            index === activeImageIndex 
                              ? "border-zinc-900 opacity-100 shadow-md scale-98" 
                              : "border-transparent opacity-60 hover:opacity-90"
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                          {index === 0 && car?.thumbnailImage && (
                            <div className="absolute top-1 left-1 bg-zinc-900 text-white text-[10px] px-1 py-0.5 rounded">
                              Main
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Tabs Content */}
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 overflow-hidden">
              <div className="flex border-b border-zinc-100 bg-zinc-50/50 overflow-x-auto scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight transition-all relative whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? "text-zinc-950 border-zinc-950 bg-white"
                        : "text-zinc-500 border-transparent hover:text-zinc-900"
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-zinc-950" : "text-zinc-500"}`} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-4">Executive Overview</h2>
                    {car?.overview ? (
                      <div 
                        className="prose max-w-none text-zinc-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: car.overview }}
                      />
                    ) : car?.description ? (
                      <div 
                        className="prose max-w-none text-zinc-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: car.description }}
                      />
                    ) : (
                      <p className="text-zinc-500 text-sm">No overview provided for this vehicle.</p>
                    )}
                    
                    {/* Dealer Notes */}
                    {car?.dealerNotes && (
                      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h3 className="text-sm font-bold text-amber-900 mb-2">Dealer Notes</h3>
                        <p className="text-amber-800 text-sm">{car.dealerNotes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === "features" && (
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-5">Premium Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {car?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                          <Check className="w-4 h-4 text-zinc-900 stroke-[2.5] flex-shrink-0" />
                          <span className="text-zinc-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                      {(!car?.features || car.features.length === 0) && (
                        <p className="text-zinc-500 text-sm col-span-2">No custom features indexed.</p>
                      )}
                    </div>
                    
                    {/* Highlights */}
                    {car?.highlights?.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-base font-bold text-zinc-900 mb-3">Key Highlights</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {car.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-zinc-700">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === "specs" && (
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-5">Technical Matrix</h2>
                    <div className="space-y-4">
                      {car?.engine && (
                        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                          <h3 className="font-semibold text-zinc-900 text-sm mb-2 flex items-center gap-2">
                            <Cog className="w-4 h-4 text-zinc-600" />
                            Powertrain & Performance
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="text-zinc-600 font-medium">
                              {car.engine} • {car.drivetrain} • {car.transmission}
                            </p>
                            {car.engineSize && (
                              <p className="text-zinc-600">Engine Size: {car.engineSize}</p>
                            )}
                            {car.engineType && (
                              <p className="text-zinc-600">Type: {car.engineType}</p>
                            )}
                            {car.horsepower && (
                              <p className="text-zinc-600">{car.horsepower} HP</p>
                            )}
                            {car.torque && (
                              <p className="text-zinc-600">{car.torque} lb-ft Torque</p>
                            )}
                            {car.fuelType && (
                              <p className="text-zinc-600">Fuel Type: {car.fuelType}</p>
                            )}
                            {car.fuel_efficiency && (
                              <p className="text-zinc-500 text-xs flex items-center gap-1.5 mt-2 pt-2 border-t border-zinc-200/60">
                                <Fuel className="w-3.5 h-3.5" />
                                Estimated Efficiency: {car.fuel_efficiency}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Fuel Economy Details */}
                      {(car?.fuelEconomyCity || car?.fuelEconomyHighway || car?.fuelEconomyCombined) && (
                        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                          <h3 className="font-semibold text-zinc-900 text-sm mb-2 flex items-center gap-2">
                            <Fuel className="w-4 h-4 text-zinc-600" />
                            Fuel Economy
                          </h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            {car.fuelEconomyCity && (
                              <div>
                                <p className="text-lg font-bold text-zinc-900">{car.fuelEconomyCity}</p>
                                <p className="text-xs text-zinc-500">City MPG</p>
                              </div>
                            )}
                            {car.fuelEconomyHighway && (
                              <div>
                                <p className="text-lg font-bold text-zinc-900">{car.fuelEconomyHighway}</p>
                                <p className="text-xs text-zinc-500">Highway MPG</p>
                              </div>
                            )}
                            {car.fuelEconomyCombined && (
                              <div>
                                <p className="text-lg font-bold text-zinc-900">{car.fuelEconomyCombined}</p>
                                <p className="text-xs text-zinc-500">Combined MPG</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {car?.techspecs?.length > 0 && (
                        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                          <h3 className="font-semibold text-zinc-900 text-sm mb-2 flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-zinc-600" />
                            Core Mechanics
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-zinc-600 text-sm list-inside list-disc">
                            {car.techspecs.map((spec, index) => (
                              <li key={index} className="font-medium">{spec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Safety Tab */}
                {activeTab === "safety" && (
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-5">Safety Systems</h2>
                    {car?.safety?.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {car.safety.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                            <Shield className="w-4 h-4 text-zinc-800 flex-shrink-0" />
                            <span className="text-zinc-700 text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-sm">No custom safety systems cataloged.</p>
                    )}
                    
                    {/* Safety Rating */}
                    {car?.safetyRating && (
                      <div className="mt-4 p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <h3 className="font-semibold text-zinc-900 text-sm mb-2">Safety Rating</h3>
                        <p className="text-zinc-600 text-sm">{car.safetyRating}</p>
                      </div>
                    )}
                    
                    {/* Additional Safety Info */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <p className="text-xs text-zinc-500">Accident Free</p>
                        <p className="text-sm font-semibold text-zinc-900">
                          {car?.accidentFree ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <p className="text-xs text-zinc-500">Carfax Available</p>
                        <p className="text-sm font-semibold text-zinc-900">
                          {car?.carfaxAvailable ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <p className="text-xs text-zinc-500">Service Records</p>
                        <p className="text-sm font-semibold text-zinc-900">
                          {car?.serviceRecords ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <p className="text-xs text-zinc-500">One Owner</p>
                        <p className="text-sm font-semibold text-zinc-900">
                          {car?.oneOwner ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Info Component Wrap */}
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 overflow-hidden">
              <VehicleInfo
                exterior_colour={car?.exterior_colour}
                body_style={car?.body_style}
                drivetrain={car?.drivetrain}
                engine={car?.engine}
                fuel_efficiency={car?.fuel_efficiency}
                interior_colour={car?.interior_colour}
                km={car?.mileage}
                mileageUnit={car?.mileageUnit}
                stock={car?.stock || car?.stockNumber}
                transmission={car?.transmission}
                vin={car?.vin}
              />
            </div>

            {/* Modular Details Sections */}
            {[
              { id: 'exterior', label: 'Exterior Profile', data: car?.exterior, icon: Palette },
              { id: 'interior', label: 'Interior Cabin Archetype', data: car?.interior, icon: Settings },
              { id: 'entertainment', label: 'Infotainment & Telematics', data: car?.entertainment, icon: Music },
              { id: 'mechanical', label: 'Mechanical Infrastructure', data: car?.mechanical, icon: Wrench },
              { id: 'packages', label: 'Available Packages', data: car?.packages, icon: Plus }
            ].map((section) => {
              if (section.id === 'packages') {
                return section.data && section.data.length > 0 && (
                  <div key={section.id} className="bg-white rounded-xl shadow-sm border border-zinc-200/60 p-6 md:p-8">
                    <h2 className="text-base font-bold text-zinc-900 tracking-tight mb-4 flex items-center gap-2.5 uppercase text-xs tracking-wider border-b border-zinc-100 pb-3">
                      <section.icon className="w-4 h-4 text-zinc-500" />
                      {section.label}
                    </h2>
                    <div className="space-y-3">
                      {section.data.map((pkg, index) => (
                        <div key={index} className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-zinc-900 text-sm">{pkg.name}</h3>
                            {pkg.price && (
                              <span className="text-sm font-bold text-zinc-900">{formatPrice(pkg.price)}</span>
                            )}
                          </div>
                          {pkg.description && (
                            <p className="text-zinc-600 text-sm mt-1">{pkg.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return section.data && section.data.length > 0 && (
                <div key={section.id} className="bg-white rounded-xl shadow-sm border border-zinc-200/60 p-6 md:p-8">
                  <h2 className="text-base font-bold text-zinc-900 tracking-tight mb-4 flex items-center gap-2.5 uppercase text-xs tracking-wider border-b border-zinc-100 pb-3">
                    <section.icon className="w-4 h-4 text-zinc-500" />
                    {section.label}
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-zinc-800 text-sm">
                    {section.data.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 font-medium">
                        <span className="inline-block w-1.5 h-1.5 bg-zinc-300 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:w-4/12">
            <div className="sticky top-8 space-y-6">
              {/* Actions Card */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 p-6">
                <h2 className="text-5xl font-bold text-zinc-900 tracking-tight mb-5">
                  {formatPrice(car?.price)}
                </h2>
                
                <div className="flex flex-col gap-2">
                  <Link href="/trade-in">
                    <Button className="w-full py-6 text-sm font-semibold rounded-lg tracking-tight transition-all">
                      <CarIcon className="w-4 h-4 mr-2 stroke-[2]" />
                      Trade In Request
                    </Button>
                  </Link>
                  
                  <Link href="/finance">
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white border border-zinc-300 py-6 text-sm font-semibold rounded-lg tracking-tight transition-all">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Apply for Financing
                    </Button>
                  </Link>
                  
                  <Link href="/payment-calculator">
                    <Button className="w-full py-6 text-sm font-medium rounded-lg bg-black hover:bg-black/80 tracking-tight">
                      Calculate Monthly Installment
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full py-6 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-500/80 tracking-tight">
                      Schedule Test Drive
                    </Button>
                  </Link>
                  <button
                    onClick={handleCompare}
                    className={`w-full py-3 px-4 text-sm font-semibold rounded-lg tracking-tight transition-all flex items-center justify-center gap-2 border-2 ${
                      inCompare
                        ? "bg-primary/5 text-primary border-primary"
                        : "bg-white text-gray-800 border-gray-300 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {inCompare ? (
                      <><Check className="w-4 h-4" /> In Compare List</>
                    ) : (
                      <><BarChart3 className="w-4 h-4" /> Add to Compare</>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Spec Readout */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 p-6">
                <h3 className="text-sm font-bold text-zinc-900 tracking-tight uppercase tracking-wider mb-4">Quick Readout</h3>
                <div className="space-y-3 text-sm font-medium">
                  {[
                    { label: "Year", value: car?.modelYear },
                    { label: "Make", value: car?.carBrand?.brandName },
                    { label: "Model", value: car?.model, capitalize: true },
                    { label: "Trim", value: car?.trim, capitalize: true },
                    { label: "Condition", value: car?.condition },
                    { label: "Body Style", value: car?.body_style,capitalize: true },
                    { label: "Segment", value: car?.segment },
                    { label: "Doors", value: car?.doors },
                    { label: "Seats", value: car?.seats },
                    { label: "Transmission", value: car?.transmission, capitalize: true },
                    { label: "Drivetrain", value: car?.drivetrain },
                    { label: "Engine", value: car?.engine },
                    { label: "Fuel Type", value: car?.fuelType },
                    { label: "Exterior Color", value: car?.exterior_colour },
                    { label: "Interior Color", value: car?.interior_colour },
                    { label: "Stock ID", value: car?.stock || car?.stockNumber },
                    { label: "VIN", value: car?.vin }
                  ].map((spec, i) => spec.value && (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-zinc-100 last:border-0 last:pb-0">
                      <span className="text-zinc-600 font-semibold">{spec.label}</span>
                      <span className={`text-zinc-800 tracking-tight ${spec.capitalize ? 'capitalize' : ''}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carfax Report */}
              {car?.carfaxAvailable && car?.carfaxReport && (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200/60 p-6">
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight uppercase tracking-wider mb-4">Carfax Report</h3>
                  <Button className="w-full" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    View Carfax Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Inventory */}
        {relatedCars.length > 0 && (
          <div className="mt-16 pt-12 border-t border-zinc-200/60">
            <RelatedCars data={relatedCars} />
          </div>
        )}
      </div>

      {/* Structured Data */}
      {car && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Vehicle",
              name: getCarHeading(),
              model: car.model,
              modelDate: car.modelYear,
              manufacturer: car.carBrand?.brandName ? {
                "@type": "Organization",
                name: car.carBrand.brandName
              } : undefined,
              vehicleConfiguration: car.trim,
              vehicleIdentificationNumber: car.vin,
              vehicleTransmission: car.transmission,
              driveWheelConfiguration: car.drivetrain,
              numberOfDoors: car.doors,
              numberOfSeats: car.seats,
              fuelType: car.fuelType,
              engine: car.engine ? { 
                "@type": "EngineSpecification", 
                name: car.engine,
                engineType: car.engineType,
                engineDisplacement: car.engineSize
              } : undefined,
              mileageFromOdometer: car.mileage ? { 
                "@type": "QuantitativeValue", 
                value: car.mileage, 
                unitCode: car.mileageUnit === "miles" ? "SMI" : "KMT" 
              } : undefined,
              color: car.exterior_colour,
              interiorColor: car.interior_colour,
              vehicleBodyStyle: car.body_style,
              image: car.thumbnailImage || car.image_gallery?.[0],
              url: `https://radiant-auto.com/car/${slug}`,
              offers: car.price ? {
                "@type": "Offer",
                price: car.price,
                priceCurrency: "CAD",
                availability: car.status === "available" 
                  ? "https://schema.org/InStock" 
                  : "https://schema.org/SoldOut",
                itemCondition: car.condition === "New" 
                  ? "https://schema.org/NewCondition" 
                  : "https://schema.org/UsedCondition"
              } : undefined,
              description: car.overview || car.description
            }),
          }}
        />
      )}

      {/* Compare Modal */}
     {showCompareDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop with subtle gradient */}
    <div 
      className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-900/70 to-zinc-800/80 backdrop-blur-sm transition-opacity duration-300" 
      onClick={() => setShowCompareDialog(false)}
    />
    
    {/* Dialog */}
    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 fade-in duration-300">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/70" />
      
      {/* Content */}
      <div className="p-8 pt-10">
        {/* Icon with ring animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25 w-20 h-20" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 rotate-3 transform hover:rotate-0 transition-transform duration-300">
              <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">
            Added to Compare
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Your vehicle has been added to the comparison list. You can now compare it with other vehicles.
          </p>
        </div>


        
      </div>
    </div>
  </div>
)}

      {/* Fullscreen Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 select-none animate-in fade-in duration-200">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white/80 z-10">
            <div className="text-sm font-medium tracking-tight">
              {getCarHeading()} — {activeImageIndex + 1} / {carImages.length}
            </div>
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Large Image Display */}
          <div className="relative w-full max-w-5xl h-[60vh] sm:h-[75vh] flex items-center justify-center">
            <img
              src={carImages[activeImageIndex]}
              alt="Fullscreen View"
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Navigation Arrows */}
            {carImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full border border-zinc-800 shadow-xl transition-transform active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full border border-zinc-800 shadow-xl transition-transform active:scale-95"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Bar */}
          {carImages.length > 1 && (
            <div className="absolute bottom-6 left-4 right-4 flex justify-center gap-2 overflow-x-auto py-2 max-w-3xl mx-auto scrollbar-none">
              {carImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-16 h-11 sm:w-20 sm:h-14 rounded overflow-hidden flex-shrink-0 transition-all border-2 ${
                    index === activeImageIndex 
                      ? "border-white scale-105 opacity-100 shadow-lg" 
                      : "border-transparent opacity-40 hover:opacity-75"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}