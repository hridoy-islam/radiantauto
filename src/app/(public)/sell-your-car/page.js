"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "../../components/PageTitle";
import { useToast } from "../../../components/ui/use-toast";
import axiosInstance from "../../../lib/axios";
import {
  User,
  Phone,
  Mail,
  Car,
  Settings,
  Calendar,
  Gauge,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileText,
  Camera,
  Loader2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function SellYourCar() {
  // state holds array of objects: { name: string, url: string }
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef(null);
  const formTopRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      brand: "",
      model: "",
      year: "",
      mileage: "",
      transmissiontype: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Since images are already uploaded, we can post normal JSON or FormData.
      // If your backend still accepts standard JSON for the form data, you can match its needs here:
      const payload = {
        ...data,
        images: images.map((img) => img.url), // passes an array of uploaded image URLs
      };

      const response = await axiosInstance.post("/sell-car", payload);

      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      reset();
      setImages([]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Immediate upload to API backend handler
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length + images.length > 10) {
      toast({
        title: "Too many images",
        description: "Maximum 10 images allowed",
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
        formData.append("entityId", "");
        formData.append("file_type", "document");
        formData.append("file", file);

        const res = await axiosInstance.post("/documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return {
          name: file.name,
          url: res.data?.data?.fileUrl || res.data?.fileUrl || "",
        };
      });

      const uploadedResults = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedResults]);

      // toast({
      //   title: "Images Uploaded",
      //   description: `Successfully uploaded ${uploadedResults.length} image(s).`,
      // });
    } catch (err) {
      setUploadError("Failed to upload one or more images.");
      toast({
        title: "Upload Failed",
        description: "Failed to upload one or more images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input element
    }
  };

  const handleDeleteImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  // Success State
  if (isSubmitted) {
    return (
      <>
        <PageTitle
          slogan="Request Submitted!"
          text="We will review your car details and get back to you with an offer soon."
          title="Thank You!"
        />
        <div className="container my-10">
          <div className="px-4 lg:w-8/12 xl:w-7/12 mx-auto">
            <div className="rounded-lg bg-white p-8 shadow-lg sm:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Submission Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                We have received your car details. Our team will review your
                submission and contact you within 24-48 hours with a competitive
                offer.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Submit Another Car
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle
        slogan={"Sell Your Car"}
        text={
          "Get a competitive offer and quick payment with our hassle-free process. We handle all the paperwork, ensuring a smooth and easy transaction."
        }
        title={"Sell Your Car?"}
      />

      <div className="container my-10" ref={formTopRef}>
        <div className="px-4 lg:w-8/12 xl:w-7/12 mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">
                {" "}
                Tell Us About Your Car
              </h2>
            </div>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the details below to get started
            </p>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.firstname ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="Enter first name"
                      {...register("firstname", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.lastname ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="Enter last name"
                      {...register("lastname", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`w-full rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="Enter phone number"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                    placeholder="Enter email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Car Details Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  Car Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.brand ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="e.g., Toyota"
                      {...register("brand", { required: "Brand is required" })}
                    />
                    {errors.brand && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.brand.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.model ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="e.g., Camry"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-lg border ${errors.year ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="e.g., 2020"
                      {...register("year", {
                        required: "Year is required",
                        pattern: {
                          value: /^\d{4}$/,
                          message: "Please enter a valid year",
                        },
                      })}
                    />
                    {errors.year && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Gauge className="w-4 h-4 text-primary" />
                      Mileage <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className={`w-full rounded-lg border ${errors.mileage ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                      placeholder="Enter mileage"
                      {...register("mileage", {
                        required: "Mileage is required",
                        min: {
                          value: 0,
                          message: "Mileage cannot be negative",
                        },
                      })}
                    />
                    {errors.mileage && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mileage.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Settings className="w-4 h-4 text-primary" />
                    Transmission Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full rounded-lg border ${errors.transmissiontype ? "border-red-500" : "border-gray-300"} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                    {...register("transmissiontype", {
                      required: "Transmission type is required",
                    })}
                  >
                    <option value="">Select transmission type</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  {errors.transmissiontype && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.transmissiontype.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Camera className="w-4 h-4 text-primary" />
                  Upload Car Photos{" "}
                  <span className="text-xs text-gray-500">(Max 10 photos)</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-primary rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-100 transition">
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isUploading ? "Uploading..." : "Choose Photos"}
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
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {uploadError}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  {images.length}/10 photos selected
                </p>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FileText className="w-4 h-4 text-primary" />
                  Special Notes (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                  placeholder="Any damage, modifications, or special conditions you'd like to mention..."
                  {...register("comment")}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Details
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
