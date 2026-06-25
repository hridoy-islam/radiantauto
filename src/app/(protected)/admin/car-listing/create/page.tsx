"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../../lib/axios";
import { useToast } from "../../../../../components/ui/use-toast";
import {
  ArrowLeft,
  Car,
  Upload,
  X,
  AlertCircle,
  Save,
  Plus,
  DollarSign,
  Gauge,
  Settings,
  Palette,
  Tag,
  FileText,
  Image as ImageIcon,
  Loader2,
  Star,
  Crown,
  History,
  Video,
} from "lucide-react";

// Import react-select
import Select from "react-select";

import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";

interface UploadedImage {
  name: string;
  url: string;
}

// React Select Styling Configuration to match your tailwind layout
const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "42px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "rgb(var(--primary) / 0.8)" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgb(var(--primary) / 0.2)" : "none",
    "&:hover": {
      borderColor: "#9ca3af",
    },
    fontSize: "0.875rem",
    backgroundColor: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "#dbeafe"
      : state.isFocused
      ? "#f3f4f6"
      : "white",
    color: "#1f2937",
    "&:active": {
      backgroundColor: "#bfdbfe",
    },
  }),
};

export default function CreateCarPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Thumbnail state
  const [thumbnailImage, setThumbnailImage] = useState<UploadedImage | null>(null);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  const [carBrands, setCarBrands] = useState<{ value: string; label: string }[]>([]);

  const [features, setFeatures] = useState([""]);
  const [exterior, setExterior] = useState([""]);
  const [interior, setInterior] = useState([""]);
  const [entertainment, setEntertainment] = useState([""]);
  const [mechanical, setMechanical] = useState([""]);
  const [safety, setSafety] = useState([""]);
  const [techspecs, setTechspecs] = useState([""]);
  const [metaKeywords, setMetaKeywords] = useState([""]);
  const [highlights, setHighlights] = useState([""]);
  const [awards, setAwards] = useState([""]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      model: "",
      carBrand: "", 
      modelYear: "",
      manufactureYear: "",
      trim: "",
      condition: "",
      segment: "",
      exterior_colour: "",
      exteriorColor: "",
      interior_colour: "",
      interiorColor: "",
      body_style: "",
      transmission: "",
      transmissionDetails: "",
      stock: "",
      stockNumber: "",
      vin: "",
      mileage: "",
      mileageUnit: "km",
      engine: "",
      engineSize: "",
      engineType: "",
      horsepower: "",
      torque: "",
      fuelType: "",
      fuel_efficiency: "",
      fuelEconomyCity: "",
      fuelEconomyHighway: "",
      fuelEconomyCombined: "",
      drivetrain: "",
      doors: "",
      seats: "",
      price: "",
      overview: "",
      description: "",
      dealerNotes: "",
      title: "",
      url: "",
      videoUrl: "",
      logo: "",
      cargoCapacity: "",
      acceleration: "",
      towingCapacity: "",
      electricRange: "",
      batteryCapacity: "",
      emissions: "",
      provinceRegistered: "",
      country: "",
      accidentFree: undefined,
      carfaxAvailable: undefined,
      carfaxReport: "",
      oneOwner: undefined,
      previousOwners: "",
      serviceRecords: undefined,
      status: "available",
      safetyRating: "",
      // listingUrl: "",
      schema: "",
      meta_description: "",
      og_title: "",
      og_description: "",
      og_image: "",
      featureCar: undefined,
    },
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("/car-brand", { params: { limit: 100 } });
        const data = res?.data?.data?.result || res?.data?.data || res?.data || [];
        const options = (Array.isArray(data) ? data : []).map((b: any) => ({
          value: b._id,
          label: b.brandName,
        }));
        setCarBrands(options);
      } catch (err) {
        console.error("Failed to fetch car brands", err);
      }
    };
    fetchBrands();
  }, []);

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setThumbnailError('Please select an image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setThumbnailError('File too large. Maximum size is 20MB');
      return;
    }

    setIsUploadingThumbnail(true);
    setThumbnailError(null);

    try {
      const formData = new FormData();
      formData.append("entityId", "");
      formData.append("file_type", "document");
      formData.append("file", file);

      const res = await axiosInstance.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const thumbnailUrl = res.data?.data?.fileUrl || res.data?.fileUrl || "";
      
      setThumbnailImage({
        name: file.name,
        url: thumbnailUrl,
      });

      toast({
        title: "Thumbnail Uploaded",
        description: "Thumbnail image has been uploaded successfully.",
      });
    } catch (err) {
      setThumbnailError("Failed to upload thumbnail image.");
      toast({
        title: "Upload Failed",
        description: "Failed to upload thumbnail image.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingThumbnail(false);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailImage(null);
    setThumbnailError(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length + images.length > 20) {
      toast({
        title: "Too many images",
        description: "Maximum 20 images allowed",
        variant: "destructive",
      });
      return;
    }

    for (const file of files) {
      if (file.size > 20 * 1024 * 1024) {
        setUploadError(`File too large: ${file.name}. Must be less than 20MB.`);
        return;
      }
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("entityId", ""); 
        formData.append("file_type", "document");
        formData.append("file", file);

        const res = await axiosInstance.post("/documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        return { 
          name: file.name, 
          url: res.data?.data?.fileUrl || res.data?.fileUrl || "" 
        };
      });

      const uploadedResults = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedResults]);
      
      toast({
        title: "Images Uploaded",
        description: `Successfully uploaded ${uploadedResults.length} image(s).`,
      });
    } catch (err) {
      setUploadError("Failed to upload one or more images.");
      toast({
        title: "Upload Failed",
        description: "Failed to upload one or more images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  const addField = (setter: any, currentArray: string[]) => {
    setter([...currentArray, ""]);
  };

  const removeField = (setter: any, currentArray: string[], index: number) => {
    if (currentArray.length > 1) {
      setter(currentArray.filter((_, i) => i !== index));
    }
  };

  const updateField = (setter: any, currentArray: string[], index: number, value: string) => {
    const newArray = [...currentArray];
    newArray[index] = value;
    setter(newArray);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const arrayFields: Record<string, string[]> = {
        features: features.filter((i) => i.trim() !== ""),
        exterior: exterior.filter((i) => i.trim() !== ""),
        interior: interior.filter((i) => i.trim() !== ""),
        entertainment: entertainment.filter((i) => i.trim() !== ""),
        mechanical: mechanical.filter((i) => i.trim() !== ""),
        safety: safety.filter((i) => i.trim() !== ""),
        techspecs: techspecs.filter((i) => i.trim() !== ""),
        meta_keywords: metaKeywords.filter((i) => i.trim() !== ""),
        highlights: highlights.filter((i) => i.trim() !== ""),
        awards: awards.filter((i) => i.trim() !== ""),
      };

      const payload: Record<string, any> = {};

      const booleanFields = ["featureCar", "accidentFree", "carfaxAvailable", "oneOwner", "serviceRecords"];

      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (booleanFields.includes(key)) return;
        if (value !== undefined && value !== null && value !== "") {
          payload[key] = value;
        }
      });

      booleanFields.forEach((field) => {
        payload[field] = data[field] === true || data[field] === "true";
      });

      if (thumbnailImage) {
        payload.thumbnailImage = thumbnailImage.url;
      }

      payload.image_gallery = images.map((img) => img.url);

      Object.assign(payload, arrayFields);

      const response = await axiosInstance.post("/cars", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast({
          title: "Success!",
          description: "Car listing created successfully!",
          variant: "default",
        });
        router.back();
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create car listing.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to create car listing.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Static options arrays for React-Select
  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "pending", label: "Pending" },
    { value: "reserved", label: "Reserved" },
    { value: "on-hold", label: "On Hold" },
  ];

  const conditionOptions = [
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
    { value: "Certified Pre-Owned", label: "Certified Pre-Owned" },
  ];

  const segmentOptions = [
    { value: "Economy", label: "Economy" },
    { value: "Compact", label: "Compact" },
    { value: "Mid-size", label: "Mid-size" },
    { value: "Full-size", label: "Full-size" },
    { value: "Luxury", label: "Luxury" },
    { value: "Sports", label: "Sports" },
    { value: "Commercial", label: "Commercial" },
  ];

  const bodyStyleOptions = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "truck", label: "Truck" },
    { value: "van", label: "Van" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
    { value: "wagon", label: "Wagon" },
    { value: "hatchback", label: "Hatchback" },
    { value: "crossover", label: "Crossover" },
    { value: "minivan", label: "Minivan" },
  ];

  const mileageUnitOptions = [
    { value: "km", label: "km" },
    { value: "miles", label: "miles" },
  ];

 

  const transmissionOptions = [
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
    { value: "CVT", label: "CVT" },
  ];

  const drivetrainOptions = [
    { value: "FWD", label: "FWD" },
    { value: "RWD", label: "RWD" },
    { value: "AWD", label: "AWD" },
    { value: "4WD", label: "4WD" },
  ];

  const fuelTypeOptions = [
    { value: "Gasoline", label: "Gasoline" },
    { value: "Diesel", label: "Diesel" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Plug-In Hybrid", label: "Plug-In Hybrid" },
    { value: "Electric", label: "Electric" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex justify-between w-full items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Car className="w-6 h-6 text-primary" />
                Create Car Listing
              </h1>
              <p className="text-sm text-gray-500">Add a new car to your inventory</p>
            </div>
            <Button type="button" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., 2024 Toyota Camry XSE"
                    {...register("name", { required: "Car name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={statusOptions}
                        value={statusOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select status"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car Brand <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="carBrand"
                    control={control}
                    rules={{ required: "Car brand is required" }}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={carBrands}
                        value={carBrands.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select brand..."
                        isClearable
                      />
                    )}
                  />
                  {errors.carBrand && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.carBrand.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border ${errors.model ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., Camry XSE"
                    {...register("model", { required: "Model is required" })}
                  />
                  {errors.model && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.model.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full rounded-lg border ${errors.modelYear ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., 2024"
                    {...register("modelYear", { required: "Model year is required" })}
                  />
                  {errors.modelYear && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.modelYear.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacture Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full rounded-lg border ${errors.manufactureYear ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., 2023"
                    {...register("manufactureYear", { required: "Manufacture year is required" })}
                  />
                  {errors.manufactureYear && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.manufactureYear.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trim</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., XSE, Limited"
                    {...register("trim")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition <span className="text-red-500">*</span></label>
                  <Controller
                    name="condition"
                    control={control}
                    rules={{ required: "Condition is required" }}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={conditionOptions}
                        value={conditionOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select condition"
                      />
                    )}
                  />
                  {errors.condition && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.condition.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segment</label>
                  <Controller
                    name="segment"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={segmentOptions}
                        value={segmentOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select segment"
                        isClearable
                      />
                    )}
                  />
                </div>
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      className={`w-full rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-300'} pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="0"
                      {...register("price", { 
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Gauge className="w-4 h-4 text-primary" />
                    Mileage
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 15000"
                    {...register("mileage")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mileage Unit</label>
                  <Controller
                    name="mileageUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={mileageUnitOptions}
                        value={mileageUnitOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select unit"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Tag className="w-4 h-4 text-primary" />
                    Stock #
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., STK001"
                    {...register("stock")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Number</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Stock alternative identifier"
                    {...register("stockNumber")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Vehicle Identification Number"
                    {...register("vin")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Listing Path URL</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., unique-car-slug"
                    {...register("url")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Safety Rating</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 5-Star NHTSA"
                    {...register("safetyRating")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Brief description preview..."
                  {...register("overview")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Detailed layout specifications narrative..."
                  {...register("description")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dealer Notes</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Special pricing offers or dealership context parameters..."
                  {...register("dealerNotes")}
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-200 rounded-lg">
                <Crown className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Feature This Car</label>
                  <p className="text-xs text-gray-500">Featured cars appear prominently on the homepage</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register("featureCar")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Media Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Media & Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Asset URL</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                  placeholder="https://youtube.com/watch?v=..."
                  {...register("videoUrl")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Style</label>
                  <Controller
                    name="body_style"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={bodyStyleOptions}
                        value={bodyStyleOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select body style"
                        isClearable
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <Controller
                    name="transmission"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={transmissionOptions}
                        value={transmissionOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select transmission"
                        isClearable
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission Details</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 8-Speed Automatic"
                    {...register("transmissionDetails")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drivetrain</label>
                  <Controller
                    name="drivetrain"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={drivetrainOptions}
                        value={drivetrainOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select drivetrain"
                        isClearable
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <Controller
                    name="fuelType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        styles={customSelectStyles}
                        options={fuelTypeOptions}
                        value={fuelTypeOptions.find(o => o.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder="Select fuel type"
                        isClearable
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 2.5L 4-Cylinder"
                    {...register("engine")}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doors</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 4"
                    {...register("doors")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 5"
                    {...register("seats")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Capacity (L)</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 450"
                    {...register("cargoCapacity")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acceleration (0-100 km/h)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 5.8"
                    {...register("acceleration")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Towing Capacity (kg)</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 1500"
                    {...register("towingCapacity")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Efficiency</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., 28 City / 39 Highway"
                    {...register("fuel_efficiency")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Exterior Color Standard
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., Pearl White"
                    {...register("exterior_colour")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Exterior Accent Variant Color
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Secondary configuration color"
                    {...register("exteriorColor")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Interior Color Standard
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="e.g., Black Leather"
                    {...register("interior_colour")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Interior Accent Variant Color
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Secondary stitch line config color"
                    {...register("interiorColor")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Origin & Registration Info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province Registered</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                  placeholder="e.g., Ontario"
                  {...register("provinceRegistered")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Verification Checkboxes */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="accidentFree"
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                    {...register("accidentFree")}
                  />
                  <label htmlFor="accidentFree" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Accident Free Certified
                  </label>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="oneOwner"
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                    {...register("oneOwner")}
                  />
                  <label htmlFor="oneOwner" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Single Owner Verified
                  </label>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="serviceRecords"
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                    {...register("serviceRecords")}
                  />
                  <label htmlFor="serviceRecords" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Continuous Service Maintenance Records Present
                  </label>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="carfaxAvailable"
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                    {...register("carfaxAvailable")}
                  />
                  <label htmlFor="carfaxAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">
                    CARFAX Report Integration Verification Token
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Owners Count</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="0"
                    {...register("previousOwners")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CARFAX Report Link Url</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="https://carfax.com/report/..."
                    {...register("carfaxReport")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Thumbnail Image <span className="text-xs text-gray-500 font-normal">(Recommended)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-lg border-2 border-dashed border-amber-300 hover:border-amber-400 hover:bg-amber-100 transition">
                    {isUploadingThumbnail ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isUploadingThumbnail ? "Uploading..." : "Upload Thumbnail"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                    className="hidden"
                    disabled={isUploadingThumbnail}
                  />
                </label>
                {thumbnailImage && (
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Remove Thumbnail
                  </button>
                )}
              </div>
              {thumbnailError && (
                <p className="text-sm text-red-500 flex items-center gap-1 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  {thumbnailError}
                </p>
              )}
              {thumbnailImage && (
                <div className="relative w-40 h-28 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <img src={thumbnailImage.url} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gallery Images Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Car Image Gallery <span className="text-xs text-gray-500 font-normal">(Max 20 images)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-100 transition">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isUploading ? "Uploading..." : "Upload Images"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Remove All ({images.length})
                  </button>
                )}
              </div>
              {uploadError && (
                <p className="text-sm text-red-500 flex items-center gap-1 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  {uploadError}
                </p>
              )}
              <p className="text-xs text-gray-500 mb-4">
                {images.length}/20 images uploaded successfully
              </p>
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img.url} alt={img.name || `Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features & Specifications Arrays */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Features & Specifications <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Highlights */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Vehicle Highlights</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setHighlights, highlights)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {highlights.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Highlight ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setHighlights, highlights, index, e.target.value)}
                    />
                    {highlights.length > 1 && (
                      <button type="button" onClick={() => removeField(setHighlights, highlights, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">General Features</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setFeatures, features)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {features.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setFeatures, features, index, e.target.value)}
                    />
                    {features.length > 1 && (
                      <button type="button" onClick={() => removeField(setFeatures, features, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Exterior */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Exterior Features</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setExterior, exterior)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {exterior.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Exterior feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setExterior, exterior, index, e.target.value)}
                    />
                    {exterior.length > 1 && (
                      <button type="button" onClick={() => removeField(setExterior, exterior, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Interior */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Interior Layout Configs</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setInterior, interior)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {interior.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Interior feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setInterior, interior, index, e.target.value)}
                    />
                    {interior.length > 1 && (
                      <button type="button" onClick={() => removeField(setInterior, interior, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Entertainment */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Entertainment</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setEntertainment, entertainment)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {entertainment.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Entertainment feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setEntertainment, entertainment, index, e.target.value)}
                    />
                    {entertainment.length > 1 && (
                      <button type="button" onClick={() => removeField(setEntertainment, entertainment, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Mechanical */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Mechanical Specs</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setMechanical, mechanical)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {mechanical.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Mechanical feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setMechanical, mechanical, index, e.target.value)}
                    />
                    {mechanical.length > 1 && (
                      <button type="button" onClick={() => removeField(setMechanical, mechanical, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Safety */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Safety Infrastructure</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setSafety, safety)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {safety.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Safety feature ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setSafety, safety, index, e.target.value)}
                    />
                    {safety.length > 1 && (
                      <button type="button" onClick={() => removeField(setSafety, safety, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Technical Specs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Technical Specs</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setTechspecs, techspecs)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {techspecs.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Technical spec ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setTechspecs, techspecs, index, e.target.value)}
                    />
                    {techspecs.length > 1 && (
                      <button type="button" onClick={() => removeField(setTechspecs, techspecs, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Awards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Awards Received</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setAwards, awards)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {awards.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Award ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setAwards, awards, index, e.target.value)}
                    />
                    {awards.length > 1 && (
                      <button type="button" onClick={() => removeField(setAwards, awards, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                SEO Metadata Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Search engine title layout..."
                    {...register("title")}
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Listing Destination Link URL</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Canonical page route index reference..."
                    {...register("listingUrl")}
                  />
                </div> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="SEO description"
                  {...register("meta_description")}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Meta Keywords</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => addField(setMetaKeywords, metaKeywords)}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {metaKeywords.map((keyword, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Keyword ${index + 1}`}
                      value={keyword}
                      onChange={(e) => updateField(setMetaKeywords, metaKeywords, index, e.target.value)}
                    />
                    {metaKeywords.length > 1 && (
                      <button type="button" onClick={() => removeField(setMetaKeywords, metaKeywords, index)} className="text-red-500 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="Open Graph title"
                    {...register("og_title")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                    placeholder="https://example.com/image.jpg"
                    {...register("og_image")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Open Graph description"
                  {...register("og_description")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isUploading || isUploadingThumbnail}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Listing
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}