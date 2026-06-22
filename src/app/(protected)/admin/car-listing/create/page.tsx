"use client";

import { useForm } from "react-hook-form";
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
  CheckCircle2,
  RefreshCw,
  Loader2,
  Star,
  Crown,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Separator } from "../../../../../components/ui/separator";

interface UploadedImage {
  name: string;
  url: string;
}

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

  const [features, setFeatures] = useState([""]);
  const [exterior, setExterior] = useState([""]);
  const [interior, setInterior] = useState([""]);
  const [entertainment, setEntertainment] = useState([""]);
  const [mechanical, setMechanical] = useState([""]);
  const [safety, setSafety] = useState([""]);
  const [techspecs, setTechspecs] = useState([""]);
  const [metaKeywords, setMetaKeywords] = useState([""]);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

 const {
  register,
  handleSubmit,
  setValue,
  watch,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    name: "",
    url: "",
    model: "",
    year: "",
    exterior_colour: "",
    interior_colour: "",
    body_style: "",
    transmission: "",
    stock: "",
    vin: "",
    km: "",
    engine: "",
    fuel_efficiency: "",
    drivetrain: "",
    price: "",
    overview: "",
    title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    og_image: "",
    featureCar: false,
  },
});

  const watchName = watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (autoGenerateSlug && watchName) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .trim();
      setValue("url", slug);
    }
  }, [watchName, autoGenerateSlug, setValue]);

  // Handle thumbnail image upload
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setThumbnailError('Please select an image file');
      return;
    }

    // Validate size limit (20MB)
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

  // Handle immediate image upload to API backend
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

    // Validate size limit (20MB per image)
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
        // Adjust standard fallback parameters as per requirements
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
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  // Handle array fields
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

      const formData = new FormData();

      // Append all normal form fields
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      // Add thumbnail image URL
      if (thumbnailImage) {
        formData.append("thumbnailImage", thumbnailImage.url);
      }

      // Pass the uploaded image URLs back to your main endpoint
      images.forEach((img) => {
        formData.append("image_gallery", img.url);
      });

      // Append dynamic list fields (filter out empty inputs)
      const arrayFields: Record<string, string[]> = {
        features,
        exterior,
        interior,
        entertainment,
        mechanical,
        safety,
        techspecs,
        meta_keywords: metaKeywords,
      };

      Object.keys(arrayFields).forEach((key) => {
        const filteredArray = arrayFields[key].filter((item) => item.trim() !== "");
        filteredArray.forEach((item) => {
          formData.append(key, item);
        });
      });

      const response = await axiosInstance.post("/cars", formData);

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

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.url ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition pr-10`}
                      placeholder="e.g., 2024-toyota-camry-xse"
                      {...register("url", { required: "URL slug is required" })}
                      onChange={(e) => {
                        setValue("url", e.target.value);
                        setAutoGenerateSlug(false);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAutoGenerateSlug(true);
                        if (watchName) {
                          const slug = watchName
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "")
                            .trim();
                          setValue("url", slug);
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                      title="Auto-generate from name"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  {errors.url && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.url.message}
                    </p>
                  )}
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Year <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className={`w-full rounded-lg border ${errors.year ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
        placeholder="e.g., 2024"
        {...register("year", { 
          required: "Year is required",
          pattern: {
            value: /^\d{4}$/,
            message: "Please enter a valid year (e.g., 2024)"
          }
        })}
      />
      {errors.year && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors.year.message}
        </p>
      )}
    </div>
  </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Mileage (km) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full rounded-lg border ${errors.km ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., 15000"
                    {...register("km", { 
                      required: "Mileage is required",
                      min: { value: 0, message: "Mileage must be positive" }
                    })}
                  />
                  {errors.km && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.km.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Tag className="w-4 h-4 text-primary" />
                    Stock # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border ${errors.stock ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., STK001"
                    {...register("stock", { required: "Stock number is required" })}
                  />
                  {errors.stock && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VIN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full rounded-lg border ${errors.vin ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                  placeholder="Vehicle Identification Number"
                  {...register("vin", { required: "VIN is required" })}
                />
                {errors.vin && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.vin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className={`w-full rounded-lg border ${errors.overview ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none`}
                  placeholder="Brief description of the car..."
                  {...register("overview", { required: "Overview is required" })}
                />
                {errors.overview && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.overview.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-200 rounded-lg">
                <Crown className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Feature This Car
                  </label>
                  <p className="text-xs text-gray-500">
                    Featured cars appear prominently on the homepage
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register("featureCar")}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Style <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full rounded-lg border ${errors.body_style ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                    {...register("body_style", { required: "Body style is required" })}
                  >
                    <option value="">Select body style</option>
                    <option value="sedan">Sedan</option>
                    <option value="coupe">Coupe</option>
                    <option value="hatchback">Hatchback</option>
                  </select>
                  {errors.body_style && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.body_style.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full rounded-lg border ${errors.transmission ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                    {...register("transmission", { required: "Transmission is required" })}
                  >
                    <option value="">Select transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                  {errors.transmission && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.transmission.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full rounded-lg border ${errors.engine ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                    {...register("engine", { required: "Engine is required" })}
                  >
                    <option value="">Select engine</option>
                    <option value="V6">V6</option>
                    <option value="V8">V8</option>
                    <option value="I4">I4</option>
                    <option value="I6">I6</option>
                  </select>
                  {errors.engine && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.engine.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drivetrain <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full rounded-lg border ${errors.drivetrain ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                    {...register("drivetrain", { required: "Drivetrain is required" })}
                  >
                    <option value="">Select drivetrain</option>
                    <option value="FWD">FWD</option>
                    <option value="RWD">RWD</option>
                    <option value="AWD">AWD</option>
                  </select>
                  {errors.drivetrain && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.drivetrain.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Exterior Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border ${errors.exterior_colour ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., Pearl White"
                    {...register("exterior_colour", { required: "Exterior color is required" })}
                  />
                  {errors.exterior_colour && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.exterior_colour.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-primary" />
                    Interior Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border ${errors.interior_colour ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="e.g., Black Leather"
                    {...register("interior_colour", { required: "Interior color is required" })}
                  />
                  {errors.interior_colour && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.interior_colour.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Efficiency <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full rounded-lg border ${errors.fuel_efficiency ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                  placeholder="e.g., 28 City / 39 Highway"
                  {...register("fuel_efficiency", { required: "Fuel efficiency is required" })}
                />
                {errors.fuel_efficiency && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fuel_efficiency.message}
                  </p>
                )}
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

              <p className="text-xs text-gray-500 mb-4">
                Upload a main thumbnail image for the car listing. This will be used as the preview image.
              </p>

              {thumbnailImage && (
                <div className="relative group w-48">
                  <img
                    src={thumbnailImage.url}
                    alt={thumbnailImage.name || "Thumbnail"}
                    className="w-full h-40 object-cover rounded-lg border-2 border-amber-300"
                  />
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Thumbnail
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Gallery with Async Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Image Gallery <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-primary rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-100 transition">
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
                      <img
                        src={img.url}
                        alt={img.name || `Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
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
              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Features</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setFeatures, features)}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => updateField(setFeatures, features, index, e.target.value)}
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(setFeatures, features, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Exterior */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Exterior</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setExterior, exterior)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setExterior, exterior, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Interior */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Interior</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setInterior, interior)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setInterior, interior, index)}
                        className="text-red-500 hover:text-red-600"
                      >
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
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setEntertainment, entertainment)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setEntertainment, entertainment, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Mechanical */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Mechanical</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setMechanical, mechanical)}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {mechanical.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                      placeholder={`Mechanical detail ${index + 1}`}
                      value={item}
                      onChange={(e) => updateField(setMechanical, mechanical, index, e.target.value)}
                    />
                    {mechanical.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(setMechanical, mechanical, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Safety */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Safety</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setSafety, safety)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setSafety, safety, index)}
                        className="text-red-500 hover:text-red-600"
                      >
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
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setTechspecs, techspecs)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setTechspecs, techspecs, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Metadata - Optional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                SEO Metadata <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                  placeholder="SEO title"
                  {...register("title")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="SEO description"
                  {...register("meta_description")}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Meta Keywords</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addField(setMetaKeywords, metaKeywords)}
                  >
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
                      <button
                        type="button"
                        onClick={() => removeField(setMetaKeywords, metaKeywords, index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Open Graph description"
                  {...register("og_description")}
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