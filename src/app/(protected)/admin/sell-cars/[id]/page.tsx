"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Car,
  Phone, 
  Mail, 
  Settings,
  AlertCircle,
  Calendar,
  Gauge,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import axiosInstance from "../../../../../lib/axios";

// Shadcn UI Imports
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../../components/ui/card";
import { BlinkingDots } from "../../../../../components/ui/blinking-dots";
import { useToast } from "../../../../../components/ui/use-toast";
import { Badge } from "../../../../../components/ui/badge";
import { Separator } from "../../../../../components/ui/separator";

export default function SellCarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSellCarDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/sell-car/${id}`);
        const sellCarData = response?.data?.data || response?.data;
        setData(sellCarData);
      } catch (error: any) {
        console.error("Failed to fetch sell car details:", error);
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Could not retrieve sell car details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSellCarDetails();
  }, [id, toast]);

  // Handle Keyboard Arrow and Escape Key Navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null || !data?.images) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, data?.images]);

  const handlePrevImage = () => {
    if (!data?.images) return;
    setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? data.images.length - 1 : prev - 1) : null));
  };

  const handleNextImage = () => {
    if (!data?.images) return;
    setLightboxIndex((prev) => (prev !== null ? (prev === data.images.length - 1 ? 0 : prev + 1) : null));
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-gray-50 to-white">
        <BlinkingDots />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-gray-600">Sell car details could not be found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex justify-between w-full items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sell Car Request Details
              </h1>
            </div>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{data.firstname}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{data.lastname}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="text-base font-semibold text-gray-900">{data.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-base font-semibold text-gray-900">{data.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Car Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Brand</label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{data.brand}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Model</label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{data.model}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Year</label>
                      <p className="text-base font-semibold text-gray-900">{data.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Gauge className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Mileage</label>
                      <p className="text-base font-semibold text-gray-900">{data.mileage?.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Settings className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Transmission</label>
                      <Badge variant="outline" className="mt-1">
                        {data.transmissiontype}
                      </Badge>
                    </div>
                  </div>
                </div>

                {data.comment && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1 mb-2">
                      <FileText className="w-4 h-4" />
                      Special Notes
                    </label>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                      {data.comment}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Interactive Photo Gallery Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Request Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Customer</span>
                  <span className="text-sm font-medium">
                    {data.firstname} {data.lastname}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Car</span>
                  <span className="text-sm font-medium">
                    {data.brand} {data.model}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Year</span>
                  <span className="text-sm font-medium">{data.year}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Mileage</span>
                  <span className="text-sm font-medium">{data.mileage?.toLocaleString()} km</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Photos</span>
                  <Badge variant="outline">{data.images?.length || 0} photos</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Submitted</span>
                  <span className="text-sm font-medium">
                    {data.createdAt ? formatDateTime(data.createdAt) : 'N/A'}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-sm font-medium">
                    {data.updatedAt ? formatDateTime(data.updatedAt) : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Relocated Gallery Media Grid Showcase */}
            {data.images && data.images.length > 0 && (
              <Card className="border-slate-200/80 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    <ImageIcon className="w-4 h-4 text-black" /> Car Photos
                  </CardTitle>
                  <CardDescription>
                    {data.images.length} item{data.images.length > 1 ? 's' : ''} uploaded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {data.images.map((image: string, index: number) => (
                      <div 
                        key={index} 
                        className="relative group overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-slate-50 aspect-[4/3] cursor-pointer"
                        onClick={() => setLightboxIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`Vehicle representation perspective ${index + 1}`}
                          className="w-full h-full object-cover transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-200 flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-semibold text-white tracking-wider">
                          #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Overlay Component */}
      {lightboxIndex !== null && data?.images && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between items-center select-none animate-in fade-in duration-200">
          
          {/* Top Metadata Header Panel */}
          <div className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-sm font-medium text-slate-300">
              Photo {lightboxIndex + 1} of {data.images.length}
            </span>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative w-full flex-1 flex items-center justify-center px-4 md:px-12">
            {/* Left Button */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Display Target Image */}
            <div className="max-w-5xl max-h-[75vh] flex items-center justify-center overflow-hidden">
              <img 
                src={data.images[lightboxIndex]} 
                alt={`Expanded car visualization perspective ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Right Button */}
            <button 
              onClick={handleNextImage}
              className="absolute right-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicator Dot Navigation Bar */}
          <div className="w-full pb-8 flex justify-center gap-2 overflow-x-auto px-4 bg-gradient-to-t from-black/40 to-transparent">
            {data.images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === lightboxIndex ? "w-8 bg-blue-600" : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}