"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Car, User, Phone, Mail, Settings, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import axiosInstance from "../../../lib/axios";
import { useToast } from "../../../components/ui/use-toast";
import PageTitle from "../../components/PageTitle";

// Zod Schema for validation
const tradeCarSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  
  current_car_brand: z.string().min(1, "Brand is required"),
  current_car_model: z.string().min(1, "Model is required"),
  current_car_year: z.string().min(1, "Year is required"),
  current_car_mileage: z.string().min(1, "Mileage is required"),
  current_car_transmission_type: z.string().min(1, "Transmission type is required"),
  current_car_special_notes: z.string().optional(),
  
  expected_car_model: z.string().min(1, "Expected model is required"),
  expected_car_year: z.string().min(1, "Expected year is required"),
  expected_car_mileage: z.string().optional(),
  expected_car_transmission_type: z.string().min(1, "Expected transmission type is required"),
  expected_car_special_notes: z.string().optional(),
});

export default function TradeIn() {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const formTopRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tradeCarSchema),
  });

  // Handle the 10-second visibility countdown for the thank you message
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

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
          url: res.data?.data?.fileUrl || res.data?.fileUrl || "" 
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

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Append uploaded image URLs
      images.forEach((image) => {
        formData.append("current_car_photos", image.url);
      });

      const response = await axiosInstance.post("/trade-car", formData);

      if (response.data.success) {
        if (formTopRef.current) {
          formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        reset();
        setImages([]);
        setIsSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to submit trade-in request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle
        slogan="Trade In Your Car"
        text="Get top value for your trade-in and apply it toward your new vehicle. Our seamless process ensures you drive away in the car you want without any hassle."
        title="Want to Trade In Your Car?"
      />
      
      <div ref={formTopRef} className="container mx-auto my-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Conditional Rendering: Show Thank You Screen or Form */}
            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 my-8 animate-in fade-in zoom-in duration-300">
                <div className="bg-green-50 p-4 rounded-full text-green-500 mb-2">
                  <CheckCircle className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
                <p className="text-gray-600 max-w-md">
                  Your trade-in request has been received. Our team will review your vehicle details and get back to you within 24–48 hours with an estimate.
                </p>
                <div className="pt-4 text-xs text-gray-400">
                  This message will close shortly, or you can wait to submit another request.
                </div>
              </div>
            ) : (
              <>
                {/* Form Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
                  <div className="flex items-center gap-3">
                    <Car className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">Trade-In Request Form</h2>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">Fill in the details below to get started</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
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
                          className={`w-full rounded-lg border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="Enter first name"
                          {...register("first_name")}
                        />
                        {errors.first_name && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.first_name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full rounded-lg border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="Enter last name"
                          {...register("last_name")}
                        />
                        {errors.last_name && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.last_name.message}
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
                        className={`w-full rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                        placeholder="Enter phone number"
                        {...register("phone_number")}
                      />
                      {errors.phone_number && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone_number.message}
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
                        className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                        placeholder="Enter email address"
                        {...register("email")}
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

                  {/* Current Car Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Car className="w-4 h-4 text-primary" />
                      Current Car Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full rounded-lg border ${errors.current_car_brand ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="e.g., Toyota"
                          {...register("current_car_brand")}
                        />
                        {errors.current_car_brand && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.current_car_brand.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full rounded-lg border ${errors.current_car_model ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="e.g., Camry"
                          {...register("current_car_model")}
                        />
                        {errors.current_car_model && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.current_car_model.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className={`w-full rounded-lg border ${errors.current_car_year ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="e.g., 2020"
                          {...register("current_car_year")}
                        />
                        {errors.current_car_year && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.current_car_year.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mileage <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className={`w-full rounded-lg border ${errors.current_car_mileage ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="Enter mileage"
                          {...register("current_car_mileage")}
                        />
                        {errors.current_car_mileage && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.current_car_mileage.message}
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
                        className={`w-full rounded-lg border ${errors.current_car_transmission_type ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                        {...register("current_car_transmission_type")}
                      >
                        <option value="">Select transmission type</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                      {errors.current_car_transmission_type && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.current_car_transmission_type.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                        placeholder="Any damage, modifications, or special conditions you'd like to mention..."
                        {...register("current_car_special_notes")}
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Upload className="w-4 h-4 text-primary" />
                      Upload Car Photos <span className="text-xs text-gray-500">(Max 10 photos)</span>
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

                  <hr className="border-gray-200" />

                  {/* Expected Car Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Car className="w-4 h-4 text-green-600" />
                      Expected Car Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full rounded-lg border ${errors.expected_car_model ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="e.g., RAV4"
                          {...register("expected_car_model")}
                        />
                        {errors.expected_car_model && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.expected_car_model.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className={`w-full rounded-lg border ${errors.expected_car_year ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition`}
                          placeholder="e.g., 2023"
                          {...register("expected_car_year")}
                        />
                        {errors.expected_car_year && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.expected_car_year.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mileage (Optional)
                        </label>
                        <input
                          type="number"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition"
                          placeholder="Enter expected mileage"
                          {...register("expected_car_mileage")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                          <Settings className="w-4 h-4 text-primary" />
                          Transmission Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          className={`w-full rounded-lg border ${errors.expected_car_transmission_type ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition bg-white`}
                          {...register("expected_car_transmission_type")}
                        >
                          <option value="">Select transmission type</option>
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                        {errors.expected_car_transmission_type && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.expected_car_transmission_type.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent transition resize-none"
                        placeholder="Any preferences or requirements for your expected car..."
                        {...register("expected_car_special_notes")}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary/80 hover:to-primary transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Trade-In Request"
                    )}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}